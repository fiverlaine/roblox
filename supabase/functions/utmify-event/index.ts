import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

const UTMIFY_API_URL = 'https://api.utmify.com.br/api-credentials/orders';

function mapPaymentStatus(status: string): string {
  switch (status) {
    case 'paid':
      return 'paid';
    case 'pending':
      return 'waiting_payment';
    case 'refunded':
      return 'refunded';
    case 'failed':
      return 'refused';
    case 'chargeback':
      return 'chargedback';
    default:
      return 'waiting_payment';
  }
}

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
    const { payment_id } = await req.json();

    if (!payment_id) {
      return new Response(
        JSON.stringify({ error: 'payment_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { data: payment, error: payErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', payment_id)
      .single();

    if (payErr || !payment) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', payment.user_id)
      .single();

    const { data: lead } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('user_id', payment.user_id)
      .maybeSingle();

    const { data: utmifyConfig } = await supabase
      .from('utmify_configs')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .single();

    if (!utmifyConfig?.api_token) {
      return new Response(
        JSON.stringify({ error: 'Utmify not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const productName = payment.type === 'license' ? 'Roblox Seller Pass' : 'Taxa de Saque';
    const amountInCents = Math.round(Number(payment.amount) * 100);

    // UTMify dates need to be "YYYY-MM-DD HH:MM:SS" (UTC)
    const formatUTMifyDate = (isoString: string) => {
      const d = new Date(isoString);
      return d.toISOString().replace('T', ' ').substring(0, 19);
    };

    const createdAtStr = formatUTMifyDate(payment.created_at);
    const approvedStr = payment.paid_at ? formatUTMifyDate(payment.paid_at) : null;
    
    const customerDocument = profile?.cpf || generateValidCPF();
    const customerName = profile?.full_name || 'Usuário Roblox Vault';
    const customerPhone = profile?.phone || '11999999999';

    const orderPayload = {
      orderId: String(payment.id),
      platform: utmifyConfig.platform_name || 'RobloxVault',
      paymentMethod: 'pix',
      status: mapPaymentStatus(payment.status),
      createdAt: createdAtStr,
      approvedDate: approvedStr,
      refundedAt: null,
      customer: {
        name: customerName,
        email: profile?.email || 'contato@robloxvault.com',
        phone: customerPhone,
        document: customerDocument,
        ip: lead?.ip_address || null
      },
      products: [
        {
          id: payment.type,
          name: productName,
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: amountInCents,
        },
      ],
      trackingParameters: {
        src: lead?.utm_source || null, // Optional mapping
        sck: lead?.utm_campaign || null,
        utm_source: lead?.utm_source || null,
        utm_medium: lead?.utm_medium || null,
        utm_campaign: lead?.utm_campaign || null,
        utm_term: lead?.utm_term || null,
        utm_content: lead?.utm_content || null
      },
      commission: {
        totalPriceInCents: amountInCents,
        gatewayFeeInCents: 0, 
        userCommissionInCents: amountInCents,
      },
      isTest: false
    };

    const utmifyRes = await fetch(UTMIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': utmifyConfig.api_token,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!utmifyRes.ok) {
      const detail = await utmifyRes.text();
      console.error('Utmify API error:', detail);
      return new Response(
        JSON.stringify({ error: 'Utmify API request failed', detail }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const result = await utmifyRes.json();
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('utmify-event error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
