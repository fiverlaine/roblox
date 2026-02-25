import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

const UTMIFY_API_URL = 'https://api.utmify.com.br/api-credentials/orders';

function mapPaymentStatus(status: string): string {
  switch (status) {
    case 'paid':
      return 'approved';
    case 'pending':
      return 'waiting_payment';
    case 'refunded':
      return 'refunded';
    case 'failed':
      return 'refused';
    default:
      return 'waiting_payment';
  }
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

    const productName = payment.type === 'license' ? 'Seller Pass License' : 'Withdrawal Fee';

    const orderPayload = {
      orderId: String(payment.id),
      platform: utmifyConfig.platform_name || 'RobloxVault',
      paymentMethod: 'pix',
      status: mapPaymentStatus(payment.status),
      createdAt: payment.created_at,
      approvedDate: payment.paid_at || null,
      customer: {
        name: profile?.full_name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        document: profile?.cpf || '',
      },
      products: [
        {
          name: productName,
          price: Number(payment.amount),
          quantity: 1,
        },
      ],
      trackingParameters: {
        src: lead?.utm_source || null,
        sck: lead?.utm_campaign || null,
        utm_source: lead?.utm_source || null,
        utm_medium: lead?.utm_medium || null,
        utm_campaign: lead?.utm_campaign || null,
        utm_term: lead?.utm_term || null,
        utm_content: lead?.utm_content || null,
        fbclid: lead?.fbclid || null,
        fbp: lead?.fbp || null,
      },
      commission: {
        totalPrice: Number(payment.amount),
        gatewayFee: 0,
        affiliateCommission: 0,
        producerCommission: Number(payment.amount),
      },
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
