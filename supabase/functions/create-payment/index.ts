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

// ====== Pre-cache gateway config to avoid DB hit on every request ======
let cachedGateway: {
  data: Record<string, unknown>;
  expires_at: number;
} | null = null;

async function getGateway() {
  if (cachedGateway && Date.now() < cachedGateway.expires_at) {
    return cachedGateway.data;
  }

  const { data, error } = await supabase
    .from('gateway_configs')
    .select('*')
    .eq('gateway_name', 'zucropay')
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('[create-payment] Error fetching gateway config:', error);
    return null;
  }
  
  if (!data) {
    console.error('[create-payment] Gateway config "zucropay" not found or inactive');
    return null;
  }

  cachedGateway = {
    data,
    expires_at: Date.now() + 5 * 60 * 1000,
  };

  return data;
}

Deno.serve(async (req: Request) => {
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

    // 1. Fetch profile, auth user AND gateway IN PARALLEL (gateway is cached)
    const [profileResult, authResult, gateway] = await Promise.all([
      supabase.from('profiles').select('full_name, email, cpf').eq('id', user_id).single(),
      supabase.auth.admin.getUserById(user_id),
      getGateway(),
    ]);

    const profile = profileResult.data;
    const authUser = authResult.data?.user;

    if (!gateway) {
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Use auth user data as fallback for name and email
    const authEmail = authUser?.email || null;
    const authName = authUser?.user_metadata?.full_name || authUser?.user_metadata?.name || null;

    const payerName = profile?.full_name || authName || profile?.email || authEmail || 'Usuario Roblox Vault';
    const payerEmail = profile?.email || authEmail || null;
    const payerDocument = profile?.cpf || generateValidCPF();

    const externalId = crypto.randomUUID();

    // 2. Get API key from gateway config (stored in client_secret field)
    const apiKey = (gateway as { client_secret: string }).client_secret;
    const apiUrl = (gateway as { api_url: string }).api_url;
    const webhookUrl = (gateway as { webhook_url: string }).webhook_url;

    // 3. Generate PIX via ZucroPay - single API call, no OAuth needed
    const customerData: Record<string, unknown> = {
      name: payerName,
      cpf_cnpj: payerDocument,
    };
    if (payerEmail) {
      customerData.email = payerEmail;
    }

    const chargeRes = await fetch(`${apiUrl}/api/v1/charges`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billing_type: 'PIX',
        value: Number(amount),
        description: type === 'license' ? 'Roblox Vault - Seller Pass' : 'Roblox Vault - Taxa de Saque',
        customer: customerData,
        external_reference: externalId,
        postback_url: webhookUrl,
      }),
    });

    if (!chargeRes.ok) {
      const detail = await chargeRes.text();
      console.error('[create-payment] ZucroPay charge failed:', chargeRes.status, detail);
      return new Response(
        JSON.stringify({ error: 'Failed to generate PIX QR code', detail }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const chargeData = await chargeRes.json();
    console.log('[create-payment] ZucroPay response:', JSON.stringify(chargeData));

    const expiration = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const transactionId = chargeData.id ?? null;

    // ZucroPay returns pix.copy_paste (EMV code) and pix.qr_code (base64 image)
    const pixCopyPaste = chargeData.pix?.copy_paste ?? null;
    const pixQrCodeImage = chargeData.pix?.qr_code ?? null;

    // 4. Save payment
    const { data: payment, error: payError } = await supabase
      .from('payments')
      .insert({
        user_id,
        type,
        amount: Number(amount),
        status: 'pending',
        gateway: 'zucropay',
        transaction_id: transactionId,
        pix_qrcode: pixCopyPaste,
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

    return new Response(JSON.stringify({ 
      success: true,
      payment: {
        id: payment.id,
        external_id: payment.external_id,
        status: payment.status,
        pix_qrcode: payment.pix_qrcode,
        pix_qrcode_image: pixQrCodeImage,
        pix_expiration: payment.pix_expiration,
        amount: payment.amount
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[create-payment] Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
