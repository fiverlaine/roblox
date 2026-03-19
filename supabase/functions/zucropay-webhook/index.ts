import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawText = await req.text();
    let body;
    try {
      body = JSON.parse(rawText);
    } catch (e) {
      console.error('[ZucroPay Webhook] Invalid JSON:', rawText);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log the raw webhook for debugging
    await supabase.from('webhook_logs').insert({ gateway: 'zucropay', payload: body });

    // ZucroPay webhook format can be:
    // 1. { event: "payment.received", data: { ... } }
    // 2. { event: "charge.paid", charge: { ... } } (Seen in production logs)
    const event = body.event;
    const data = body.data || body.charge || body;

    // Determine if payment is confirmed
    const isPaymentReceived = 
      event === 'payment.received' || 
      event === 'charge.paid' || 
      (data.status && (data.status.toUpperCase() === 'RECEIVED' || data.status.toUpperCase() === 'PAID' || data.status.toUpperCase() === 'APPROVED' || data.status.toUpperCase() === 'APROVADO'));

    if (!isPaymentReceived) {
      console.log(`[ZucroPay Webhook] Event/status ignored: event=${event}, status=${data.status}`, body);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try to locate the payment using multiple identifiers
    const zucroPaymentId = data.payment_id || data.id || null;
    const externalRef = data.external_reference || data.external_id || null;
    const transactionId = data.transaction_id || data.transactionId || zucroPaymentId;

    if (!externalRef && !transactionId) {
      console.error('[ZucroPay Webhook] No external_reference or transaction_id in payload:', body);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Find the payment in our database
    let query = supabase.from('payments').select('*');
    if (externalRef) {
      query = query.eq('external_id', externalRef);
    } else {
      query = query.eq('transaction_id', transactionId);
    }

    const { data: payment, error: payError } = await query.maybeSingle();

    if (payError || !payment) {
      console.error(`[ZucroPay Webhook] Payment not found. external_ref: ${externalRef}, tx: ${transactionId}`);
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const wasAlreadyPaid = payment.status === 'paid';

    if (!wasAlreadyPaid) {
      console.log(`[ZucroPay Webhook] Updating payment ${payment.id} to paid.`);

      await supabase
        .from('payments')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', payment.id);

      if (payment.type === 'license') {
        await supabase
          .from('profiles')
          .update({ has_seller_pass: true })
          .eq('id', payment.user_id);
      }

      if (payment.type === 'withdrawal_fee') {
        await supabase
          .from('user_items')
          .update({ status: 'sold', sold_at: new Date().toISOString() })
          .eq('user_id', payment.user_id)
          .eq('status', 'selling');
      }
    } else {
      console.log(`[ZucroPay Webhook] Payment ${payment.id} already paid. Checking UTMify.`);
    }

    // Update telegram lead if exists
    const { data: lead } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('user_id', payment.user_id)
      .maybeSingle();

    if (lead && !wasAlreadyPaid) {
      const newTotalPaid = Number(lead.total_paid || 0) + Number(payment.amount);
      const updates: Record<string, unknown> = { total_paid: newTotalPaid };

      if (lead.status === 'new' || lead.status === 'registered') {
        updates.status = 'qualified';
        updates.qualified_at = new Date().toISOString();
      }

      await supabase
        .from('telegram_leads')
        .update(updates)
        .eq('id', lead.id);
    }

    // Send UTMify event (same logic as bspay-webhook)
    const orderId = payment.external_id || String(payment.id);
    const { data: existingPaidEvent, error: paidEventError } = await supabase
      .from('capi_logs')
      .select('id')
      .eq('event_name', 'UTMify_paid')
      .eq('status', 'success')
      .contains('request_payload', { orderId })
      .limit(1)
      .maybeSingle();

    if (paidEventError) {
      console.error('[ZucroPay Webhook] Failed to verify previous UTMify paid event:', paidEventError);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    if (existingPaidEvent) {
      console.log('[ZucroPay Webhook] UTMify paid already registered for order', orderId);
    } else if (supabaseUrl) {
      try {
        const utmifyUrl = `${supabaseUrl}/functions/v1/utmify-event`;
        const utmifyRes = await fetch(utmifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_id: payment.id }),
        });
        if (!utmifyRes.ok) {
          const errText = await utmifyRes.text();
          console.error('[ZucroPay Webhook] UTMify event (paid) failed:', utmifyRes.status, errText);
        } else {
          console.log('[ZucroPay Webhook] UTMify event (paid) sent for payment', payment.id);
        }
      } catch (utmifyErr) {
        console.error('[ZucroPay Webhook] UTMify event (paid) error:', utmifyErr);
      }
    } else {
      console.error('[ZucroPay Webhook] SUPABASE_URL not found for utmify-event.');
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[ZucroPay Webhook] Processing error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
