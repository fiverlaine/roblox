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
    case 'refunded':
      return 'refunded';
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
    const body = await req.json();
    console.log('[Utmify] Received payload:', JSON.stringify(body));

    // Handle both direct {payment_id} and Supabase Webhook payload
    let paymentId = body.payment_id;
    let paymentData = null;

    if (!paymentId && body.record) {
      // It's a Supabase Webhook
      paymentId = body.record.id;
      paymentData = body.record;
    }

    if (!paymentId) {
      return new Response(
        JSON.stringify({ error: 'payment_id or webhook record is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Always fetch fresh payment data if not provided or to ensure we have everything
    const { data: payment, error: payErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (payErr || !payment) {
      console.error('[Utmify] Payment not found:', paymentId, payErr);
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Fetch profile
    const { data: profile, error: profErr } = await supabase
      .from('profiles').select('*').eq('id', payment.user_id).single();

    if (profErr) {
      console.error('[Utmify] Profile not found:', payment.user_id);
    }

    // Fetch lead with fallback: first by user_id, then by telegram_id
    let lead: any = null;
    const { data: leadByUserId } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('user_id', payment.user_id)
      .maybeSingle();
    
    lead = leadByUserId;

    if (!lead && profile?.telegram_id) {
      const { data: leadByTelegramId } = await supabase
        .from('telegram_leads')
        .select('*')
        .eq('telegram_id', profile.telegram_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      lead = leadByTelegramId;
    }

    // Determine which UTMify to use based on affiliate_ref
    let utmifyToken: string | null = null;
    let platformName = 'RobloxVault';

    if (lead?.affiliate_ref) {
      // Lead is from an affiliate — use affiliate's UTMify
      const { data: affProfile } = await supabase
        .from('profiles').select('id').eq('affiliate_ref', lead.affiliate_ref).single();
      
      if (affProfile) {
        const { data: affConfig } = await supabase
          .from('affiliate_tracking_configs')
          .select('utmify_api_token, utmify_platform_name')
          .eq('user_id', affProfile.id)
          .eq('is_active', true)
          .maybeSingle();
        
        if (affConfig?.utmify_api_token) {
          utmifyToken = affConfig.utmify_api_token;
          platformName = affConfig.utmify_platform_name || 'RobloxVault';
          console.log(`[Utmify] Using affiliate UTMify for ref=${lead.affiliate_ref}`);
        } else {
          console.log(`[Utmify] Affiliate ${lead.affiliate_ref} has no UTMify configured — skipping`);
        }
      }
    } else {
      // Lead is from the owner — use global UTMify config
      const { data: utmifyConfig } = await supabase
        .from('utmify_configs').select('*').eq('is_active', true).limit(1).single();
      
      if (utmifyConfig?.api_token) {
        utmifyToken = utmifyConfig.api_token;
        platformName = utmifyConfig.platform_name || 'RobloxVault';
      }
    }

    if (!utmifyToken) {
      console.log('[Utmify] No UTMify configured for this lead (affiliate or owner) — skipping');
      return new Response(
        JSON.stringify({ skipped: true, reason: 'No UTMify configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const productName = payment.type === 'license' ? 'Roblox Seller Pass' : 'Taxa de Saque';
    const amountInCents = Math.round(Number(payment.amount) * 100);

    // UTMify dates need to be "YYYY-MM-DD HH:MM:SS" (UTC)
    const formatUTMifyDate = (isoString: string) => {
      if (!isoString) return null;
      const d = new Date(isoString);
      return d.toISOString().replace('T', ' ').substring(0, 19);
    };

    const createdAtStr = formatUTMifyDate(payment.created_at);
    const approvedStr = payment.paid_at ? formatUTMifyDate(payment.paid_at) : null;
    
    const customerDocument = profile?.cpf || generateValidCPF();
    const customerName = profile?.full_name || 'Usuário Roblox Vault';
    const customerPhone = profile?.phone || '11999999999';

    const status = mapPaymentStatus(payment.status);

    const orderPayload = {
      orderId: payment.external_id || String(payment.id),
      platform: platformName,
      paymentMethod: 'pix',
      status: status,
      createdAt: createdAtStr,
      approvedDate: approvedStr,
      refundedAt: null,
      customer: {
        name: customerName,
        email: profile?.email || 'contato@robloxvault.com',
        phone: customerPhone,
        document: customerDocument,
        country: 'BR',
        ip: lead?.ip_address || '0.0.0.0',
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
        src: lead?.utm_source || null, 
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

    console.log(`[Utmify] Sending order ${payment.id} (Status: ${status}) to UTMify...`);

    let utmifyRes;
    let utmifyResultBody;

    try {
      utmifyRes = await fetch(UTMIFY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': utmifyToken,
        },
        body: JSON.stringify(orderPayload),
      });

      utmifyResultBody = await utmifyRes.json();
      
      console.log(`[Utmify] Response:`, JSON.stringify(utmifyResultBody));

      // Log interaction to capi_logs for debugging
      await supabase.from('capi_logs').insert({
        lead_id: lead?.id || null,
        event_name: `UTMify_${status}`,
        status: utmifyRes.ok ? 'success' : 'error',
        request_payload: orderPayload,
        response_payload: utmifyResultBody,
        error_message: utmifyRes.ok ? null : `Status ${utmifyRes.status}`,
      });

    } catch (fetchErr) {
      console.error('[Utmify] Fetch error:', fetchErr);
      await supabase.from('capi_logs').insert({
        lead_id: lead?.id || null,
        event_name: `UTMify_${status}`,
        status: 'error',
        request_payload: orderPayload,
        error_message: String(fetchErr),
      });
      throw fetchErr;
    }

    if (!utmifyRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Utmify API request failed', detail: utmifyResultBody }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true, result: utmifyResultBody }), {
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
