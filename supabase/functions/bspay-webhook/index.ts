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
      console.error('[Webhook] Invalid JSON:', rawText);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handles both direct object and nested in requestBody
    const payload = body.requestBody || body;
    const status = payload?.status?.toUpperCase();
    const external_id = payload?.external_id;
    const transaction_id = payload?.transactionId || payload?.transaction_id;

    if (!status || (status !== 'PAID' && status !== 'APPROVED' && status !== 'APROVADO')) {
      console.log(`[Webhook] Status ignorado: ${status}`, payload);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!external_id && !transaction_id) {
      console.error('[Webhook] Sem external_id ou transaction_id no payload:', payload);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Busca o pagamento
    let query = supabase.from('payments').select('*');
    if (external_id) {
      query = query.eq('external_id', external_id);
    } else {
      query = query.eq('transaction_id', transaction_id);
    }

    const { data: payment, error: payError } = await query.maybeSingle();

    if (payError || !payment) {
      console.error(`[Webhook] Pagamento não encontado. external_id: ${external_id}, tx: ${transaction_id}`);
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (payment.status === 'paid') {
      console.log(`[Webhook] Pagamento ${payment.id} já consta como pago.`);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[Webhook] Atualizando pagamento ${payment.id} para pago.`);

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

    const { data: lead } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('user_id', payment.user_id)
      .maybeSingle();

    if (lead) {
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

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    try {
      console.log(`[Webhook] Disparando utmify-event para payment ${payment.id}`);
      // Aguarda a promessa para garantir a execução no Edge Runtime
      await fetch(`${supabaseUrl}/functions/v1/utmify-event`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_id: payment.id }),
      });
      console.log(`[Webhook] utmify-event disparado com sucesso.`);
    } catch (err) {
      console.error('[Webhook] Erro ao chamar utmify-event:', err);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Webhook] Webhook processing error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
