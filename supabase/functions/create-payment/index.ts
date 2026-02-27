import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

// ====== CPF Generator (lightweight, no imports) ======
function generateValidCPF(): string {
  const mod = (dividendo: number, divisor: number) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
  const n = 9;
  const n1 = Math.floor(Math.random() * n);
  const n2 = Math.floor(Math.random() * n);
  const n3 = Math.floor(Math.random() * n);
  const n4 = Math.floor(Math.random() * n);
  const n5 = Math.floor(Math.random() * n);
  const n6 = Math.floor(Math.random() * n);
  const n7 = Math.floor(Math.random() * n);
  const n8 = Math.floor(Math.random() * n);
  const n9 = Math.floor(Math.random() * n);
  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;
  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (mod(d2, 11));
  if (d2 >= 10) d2 = 0;
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

// ====== In-memory OAuth token cache ======
let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getAccessToken(gateway: {
  client_id: string;
  client_secret: string;
  api_url: string;
}): Promise<string> {
  // Return cached token if still valid (with 30s safety margin)
  if (cachedToken && Date.now() < cachedToken.expires_at - 30_000) {
    return cachedToken.access_token;
  }

  const credentials = btoa(`${gateway.client_id}:${gateway.client_secret}`);
  const tokenRes = await fetch(`${gateway.api_url}/oauth/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!tokenRes.ok) {
    const detail = await tokenRes.text();
    throw new Error(`Gateway auth failed: ${detail}`);
  }

  const data = await tokenRes.json();
  // BSPay tokens typically expire in 3600s; default to 5 min if not specified
  const expiresIn = (data.expires_in ?? 300) * 1000;
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + expiresIn,
  };

  return data.access_token;
}

// ====== Pre-cache gateway config to avoid DB hit on every request ======
let cachedGateway: {
  data: Record<string, unknown>;
  expires_at: number;
} | null = null;

async function getGateway() {
  // Cache gateway config for 5 minutes
  if (cachedGateway && Date.now() < cachedGateway.expires_at) {
    return cachedGateway.data;
  }

  const { data, error } = await supabase
    .from('gateway_configs')
    .select('*')
    .eq('gateway_name', 'bspay')
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  cachedGateway = {
    data,
    expires_at: Date.now() + 5 * 60 * 1000,
  };

  return data;
}

Deno.serve(async (req: Request) => {
  // Fast CORS response — no DB, no processing
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { user_id, type, amount } = await req.json();

    if (!user_id || !type || !amount) {
      return new Response(
        JSON.stringify({ error: 'user_id, type, and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 1. Fetch profile AND gateway IN PARALLEL (gateway is cached)
    const [profileResult, gateway] = await Promise.all([
      supabase.from('profiles').select('full_name, email, cpf').eq('id', user_id).single(),
      getGateway(),
    ]);

    const profile = profileResult.data;

    if (!gateway) {
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const payerName = profile?.full_name || profile?.email || 'Usuario Roblox Vault';
    const payerDocument = profile?.cpf || generateValidCPF();

    // 2. Get OAuth token (cached — usually instant after first call)
    const access_token = await getAccessToken(gateway as {
      client_id: string;
      client_secret: string;
      api_url: string;
    });

    // Use native crypto.randomUUID() — no Node.js polyfill needed
    const externalId = crypto.randomUUID();

    // 3. Generate PIX — this is the only mandatory remote call
    const pixRes = await fetch(`${(gateway as { api_url: string }).api_url}/pix/qrcode`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount),
        external_id: externalId,
        postbackUrl: (gateway as { webhook_url: string }).webhook_url,
        payer: {
          name: payerName,
          document: payerDocument,
        },
      }),
    });

    if (!pixRes.ok) {
      const detail = await pixRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to generate PIX QR code', detail }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const pixData = await pixRes.json();
    const expiration = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const transactionId = pixData.transactionId ?? pixData.transaction_id ?? null;

    // 4. Save payment — use insert (faster than upsert)
    const { data: payment, error: payError } = await supabase
      .from('payments')
      .insert({
        user_id,
        type,
        amount: Number(amount),
        status: 'pending',
        gateway: 'bspay',
        transaction_id: transactionId,
        pix_qrcode: pixData.qrcode ?? pixData.pix_qrcode ?? pixData.emv ?? null,
        pix_expiration: expiration,
        external_id: externalId,
      })
      .select()
      .single();

    if (payError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save payment', detail: payError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 5. Return IMMEDIATELY — trigger UTMify fully in background
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Fire and forget — do NOT await
    fetch(`${supabaseUrl}/functions/v1/utmify-event`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_id: payment.id }),
    }).catch((err) => console.error('utmify-event fire-and-forget failed:', err));

    return new Response(JSON.stringify({ payment }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
