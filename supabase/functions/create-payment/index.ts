import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';
import { randomBytes } from 'node:crypto';

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

    const { data: payment, error: payError } = await supabase
      .from('payments')
      .upsert(
        {
          user_id,
          type,
          amount: Number(amount),
          status: 'pending',
          gateway: 'bspay',
          transaction_id: pixData.transactionId ?? pixData.transaction_id ?? null,
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
