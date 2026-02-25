import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { status, external_id } = body;

    if (status !== 'PAID') {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: payment, error: payError } = await supabase
      .from('payments')
      .select('*')
      .eq('external_id', external_id)
      .single();

    if (payError || !payment) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

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
      const newTotalPaid = Number(lead.total_paid) + Number(payment.amount);
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
      await fetch(`${supabaseUrl}/functions/v1/utmify-event`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_id: payment.id }),
      });
    } catch (_) {
      console.error('Failed to call utmify-event function');
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
