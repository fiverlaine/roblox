import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

// ====== SHA-256 Hashing (for CAPI user_data) ======
async function hashSHA256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

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

// ====== CAPI InitiateCheckout (fire-and-forget, background) ======
async function fireInitiateCheckout(userId: string, paymentType: string, amount: number): Promise<void> {
  try {
    // 1. Find lead linked to this user
    const { data: lead } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!lead) {
      console.log(`[CAPI] No lead found for user ${userId}, skipping InitiateCheckout`);
      return;
    }

    // 2. Deduplication: check if InitiateCheckout was already sent for this lead + payment type
    const eventKey = `InitiateCheckout_${paymentType}`;
    const { data: existingLog } = await supabase
      .from('capi_logs')
      .select('id')
      .eq('lead_id', lead.id)
      .eq('event_name', eventKey)
      .eq('status', 'success')
      .limit(1)
      .maybeSingle();

    if (existingLog) {
      console.log(`[CAPI] InitiateCheckout_${paymentType} already sent for lead ${lead.id}, skipping (dedup)`);
      return;
    }

    // 3. Get profile data for maximum EMQ (email, phone, name, city, state, zip)
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email, phone, city, state, cpf')
      .eq('id', userId)
      .single();

    // 4. Route to correct pixels (affiliate vs global)
    let pixels: { pixel_id: string; access_token: string }[] = [];

    if (lead.affiliate_ref) {
      const { data: affProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('affiliate_ref', lead.affiliate_ref)
        .single();
      if (affProfile) {
        const { data: affConfig } = await supabase
          .from('affiliate_tracking_configs')
          .select('pixel_id, pixel_access_token')
          .eq('user_id', affProfile.id)
          .eq('is_active', true)
          .maybeSingle();
        if (affConfig?.pixel_id && affConfig?.pixel_access_token) {
          pixels = [{ pixel_id: affConfig.pixel_id, access_token: affConfig.pixel_access_token }];
        }
      }
    } else {
      const { data: globalPixels } = await supabase
        .from('pixel_configs')
        .select('pixel_id, access_token')
        .eq('is_active', true);
      pixels = globalPixels || [];
    }

    if (pixels.length === 0) {
      console.log(`[CAPI] No pixels configured for lead ${lead.id}, skipping`);
      return;
    }

    // 5. Build user_data with MAXIMUM fields for highest EMQ score
    // Per Meta docs: em, ph, fn, ln, ct, st, zp, country, fbc, fbp, external_id, client_ip_address, client_user_agent
    const userData: Record<string, unknown> = {};

    // High-confidence identifiers (hashed)
    if (profile?.email) userData.em = await hashSHA256(profile.email);
    if (profile?.phone) {
      // Normalize BR phone: remove non-digits, ensure +55 prefix
      const cleanPhone = profile.phone.replace(/\D/g, '');
      const normalizedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
      userData.ph = await hashSHA256(normalizedPhone);
    }

    // Name fields (hashed separately: fn = first name, ln = last name)
    if (profile?.full_name) {
      const nameParts = profile.full_name.trim().split(/\s+/);
      if (nameParts.length > 0) userData.fn = await hashSHA256(nameParts[0]);
      if (nameParts.length > 1) userData.ln = await hashSHA256(nameParts[nameParts.length - 1]);
    }

    // Location fields (hashed)
    const city = profile?.city || lead.city;
    const state = profile?.state || lead.state;
    const zipCode = lead.zip_code;
    const country = lead.country || 'br';

    if (city) userData.ct = await hashSHA256(city);
    if (state) userData.st = await hashSHA256(state);
    if (zipCode) userData.zp = await hashSHA256(zipCode.replace(/\D/g, ''));
    userData.country = await hashSHA256(country);

    // Browser/session identifiers (NOT hashed per Meta spec)
    if (lead.fbc && String(lead.fbc).trim()) userData.fbc = String(lead.fbc).trim();
    if (lead.fbp && String(lead.fbp).trim()) userData.fbp = String(lead.fbp).trim();
    if (lead.user_agent) userData.client_user_agent = lead.user_agent;
    if (lead.ip_address && lead.ip_address !== '0.0.0.0') userData.client_ip_address = lead.ip_address;

    // External ID (hashed)
    userData.external_id = await hashSHA256(lead.start_param);

    // 6. Build custom_data
    const contentName = paymentType === 'license' ? 'Seller Pass' : 'Taxa de Saque';
    const customData = {
      value: amount,
      currency: 'BRL',
      content_name: contentName,
      content_category: 'Roblox Vault',
      contents: [{ id: paymentType, quantity: 1, item_price: amount }],
      content_type: 'product',
    };

    // 7. Send to all pixels
    const currentTimestamp = Math.floor(Date.now() / 1000);

    for (const pixel of pixels) {
      const eventId = `initiatecheckout_${paymentType}_${currentTimestamp}_${lead.start_param}`;

      const eventPayload = {
        data: [{
          event_name: 'InitiateCheckout',
          event_time: currentTimestamp,
          event_id: eventId,
          action_source: 'website',
          event_source_url: 'https://robloxvault.site/dashboard',
          user_data: userData,
          custom_data: customData,
        }],
      };

      const url = `https://graph.facebook.com/v18.0/${pixel.pixel_id}/events?access_token=${pixel.access_token}`;
      console.log(`[CAPI] Sending InitiateCheckout_${paymentType} to Pixel ${pixel.pixel_id} for lead ${lead.id}...`);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload),
        });
        const result = await response.json();
        const logStatus = result.events_received && result.events_received > 0 ? 'success' : 'error';
        const logError = result.error ? (result.error.message || JSON.stringify(result.error)) : null;

        await supabase.from('capi_logs').insert({
          lead_id: lead.id,
          start_param: lead.start_param,
          event_name: eventKey,
          pixel_id: pixel.pixel_id,
          status: logStatus,
          request_payload: eventPayload,
          response_payload: result,
          error_message: logError,
        });

        console.log(`[CAPI] InitiateCheckout_${paymentType} → Pixel ${pixel.pixel_id}: ${logStatus}`);
      } catch (err) {
        console.error(`[CAPI] InitiateCheckout error for pixel ${pixel.pixel_id}:`, err);
        await supabase.from('capi_logs').insert({
          lead_id: lead.id,
          start_param: lead.start_param,
          event_name: eventKey,
          pixel_id: pixel.pixel_id,
          status: 'error',
          request_payload: {},
          error_message: String(err),
        });
      }
    }

    console.log(`[CAPI] ✅ InitiateCheckout_${paymentType} completed for lead ${lead.id}`);
  } catch (err) {
    console.error(`[CAPI] ⚠️ InitiateCheckout background error (non-blocking):`, err);
  }
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

    // 5. Fire InitiateCheckout CAPI event in background (non-blocking)
    fireInitiateCheckout(user_id, type, Number(amount)).catch(() => {});

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
