import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

// ====== Optional: SHA-256 hash validation ======
// async function validateSuitPayHash(body: Record<string, unknown>, clientSecret: string): Promise<boolean> {
//   try {
//     const { hash, ...rest } = body;
//     const values = Object.values(rest).join('');
//     const toHash = clientSecret + values;
//     const encoder = new TextEncoder();
//     const data = encoder.encode(toHash);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     return computedHash === hash;
//   } catch {
//     return false;
//   }
// }

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawText = await req.text();
    let body: Record<string, unknown>;

    try {
      body = JSON.parse(rawText);
    } catch {
      console.error('[SuitPay Webhook] Invalid JSON:', rawText);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log raw webhook for debugging
    await supabase.from('webhook_logs').insert({ gateway: 'suitpay', payload: body });

    console.log('[SuitPay Webhook] Received:', JSON.stringify(body));

    // SuitPay webhook fields (PIX Cash-in):
    // idTransaction, typeTransaction, statusTransaction, value, payerName,
    // payerTaxId, paymentDate, paymentCode, requestNumber, hash
    const statusTransaction = (body.statusTransaction as string | undefined)?.toUpperCase();
    const requestNumber = body.requestNumber as string | undefined; // this is our external_id
    const idTransaction = body.idTransaction as string | undefined;

    // Only handle confirmed payments
    if (statusTransaction !== 'PAID_OUT') {
      console.log(`[SuitPay Webhook] Status ignored: ${statusTransaction}`);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!requestNumber && !idTransaction) {
      console.error('[SuitPay Webhook] No requestNumber or idTransaction in payload:', body);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Find payment: requestNumber = our external_id, idTransaction = transaction_id
    let query = supabase.from('payments').select('*');
    if (requestNumber) {
      query = query.eq('external_id', requestNumber);
    } else {
      query = query.eq('transaction_id', idTransaction);
    }

    const { data: payment, error: payError } = await query.maybeSingle();

    if (payError || !payment) {
      console.error(`[SuitPay Webhook] Payment not found. requestNumber: ${requestNumber}, idTransaction: ${idTransaction}`);
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const wasAlreadyPaid = payment.status === 'paid';

    if (!wasAlreadyPaid) {
      console.log(`[SuitPay Webhook] Updating payment ${payment.id} to paid.`);

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
        const { data: withdrawal } = await supabase
          .from('withdrawals')
          .select('amount')
          .eq('payment_id', payment.id)
          .maybeSingle();

        if (withdrawal) {
          const withdrawAmount = Number(withdrawal.amount);
          const { data: profile } = await supabase
            .from('profiles')
            .select('real_balance')
            .eq('id', payment.user_id)
            .single();

          if (profile) {
            const currentBalance = Number(profile.real_balance || 0);
            const newBalance = currentBalance - withdrawAmount;

            await supabase
              .from('profiles')
              .update({ real_balance: newBalance })
              .eq('id', payment.user_id);

            console.log(`[SuitPay Webhook] Deducted ${withdrawAmount} from user ${payment.user_id}. New balance: ${newBalance}`);
          }
        } else {
          console.error(`[SuitPay Webhook] Withdrawal record not found for payment_id ${payment.id}`);
        }
      }
    } else {
      console.log(`[SuitPay Webhook] Payment ${payment.id} already paid. Checking UTMify.`);
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

    // Send UTMify event (same logic as other webhooks)
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
      console.error('[SuitPay Webhook] Failed to verify previous UTMify paid event:', paidEventError);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    if (existingPaidEvent) {
      console.log('[SuitPay Webhook] UTMify paid already registered for order', orderId);
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
          console.error('[SuitPay Webhook] UTMify event (paid) failed:', utmifyRes.status, errText);
        } else {
          console.log('[SuitPay Webhook] UTMify event (paid) sent for payment', payment.id);
        }
      } catch (utmifyErr) {
        console.error('[SuitPay Webhook] UTMify event (paid) error:', utmifyErr);
      }
    } else {
      console.error('[SuitPay Webhook] SUPABASE_URL not found for utmify-event.');
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[SuitPay Webhook] Processing error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
