import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';
import { randomBytes } from 'node:crypto';

// ====== CPF Generator ======
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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id, type, amount } = await req.json();

    if (!user_id || !type || !amount) {
      return new Response(
        JSON.stringify({ error: 'user_id, type, and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 1. Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user_id)
      .single();
      
    const payerName = profile?.full_name || profile?.email || "Usuario Roblox Vault";
    const payerDocument = profile?.cpf || generateValidCPF();

    // 2. Fetch Gateway Config
    const { data: gateway, error: gwError } = await supabase
      .from('gateway_configs')
      .select('*')
      .eq('gateway_name', 'bspay')
      .eq('is_active', true)
      .single();

    if (gwError || !gateway) {
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 3. Authenticate Gateway
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
      return new Response(
        JSON.stringify({ error: 'Gateway authentication failed', detail }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { access_token } = await tokenRes.json();
    const externalId = randomBytes(16).toString('hex');

    // 4. Generate PIX
    const pixRes = await fetch(`${gateway.api_url}/pix/qrcode`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount),
        external_id: externalId,
        postbackUrl: gateway.webhook_url,
        payer: {
          name: payerName,
          document: payerDocument
        }
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

    // 5. Save payment
    const { data: payment, error: payError } = await supabase
      .from('payments')
      .upsert(
        {
          user_id,
          type,
          amount: Number(amount),
          status: 'pending',
          gateway: 'bspay',
          transaction_id: transactionId,
          pix_qrcode: pixData.qrcode ?? pixData.pix_qrcode ?? pixData.emv ?? null,
          pix_expiration: expiration,
          external_id: externalId,
        },
        { onConflict: 'external_id' },
      )
      .select()
      .single();

    if (payError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save payment', detail: payError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 6. 🔥 Send Pending/waiting_payment Event to UTMIFY asynchronously
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const triggerUtmify = async () => {
      try {
        const res = await fetch(`${supabaseUrl}/functions/v1/utmify-event`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ payment_id: payment.id }),
        });
        const resText = await res.text();
        
        // Log to capi_logs for debugging UTMify
        await supabase.from('capi_logs').insert({
          event_name: 'utmify_trigger',
          status: res.ok ? 'success' : 'error',
          request_payload: { payment_id: payment.id },
          response_payload: { status: res.status, body: resText },
          error_message: res.ok ? null : `Utmify failed: ${resText}`,
        });
      } catch (err) {
        console.error('Failed to trigger utmify-event:', err);
      }
    };

    if (typeof (globalThis as any).EdgeRuntime !== 'undefined' && typeof (globalThis as any).EdgeRuntime.waitUntil === 'function') {
      (globalThis as any).EdgeRuntime.waitUntil(triggerUtmify());
    } else {
      triggerUtmify(); // Fire and forget fallback
    }

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
