import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { card_number, holder_name, expiry, cvv, robux_amount } = await req.json();

    if (!card_number || !holder_name || !expiry || !cvv || !robux_amount) {
      return new Response(JSON.stringify({ error: 'Dados incompletos' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Procura o cartão na base
    const { data: card } = await supabase
      .from('generated_cards')
      .select('*')
      .eq('card_number', card_number)
      .eq('cvv', cvv)
      .eq('expiry', expiry)
      .single();

    if (!card) {
      return new Response(JSON.stringify({ error: 'Cartão inválido ou não encontrado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (card.is_used) {
      return new Response(JSON.stringify({ error: 'Este cartão já foi utilizado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Marca o cartão como usado
    await supabase
      .from('generated_cards')
      .update({
        is_used: true,
        used_by: user.id,
        used_at: new Date().toISOString()
      })
      .eq('id', card.id);

    // Obtém o perfil para atualizar saldo
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      // Adiciona robux ao saldo do usuário
      const newRobuxBalance = (profile.robux_balance || 0) + Number(robux_amount);
      
      await supabase
        .from('profiles')
        .update({ robux_balance: newRobuxBalance })
        .eq('id', user.id);
    }

    // Integração MÁGICA: Vincula o lead do telegram ao usuário atual!
    // Como o cartão foi gerado via telegram_id, sabemos exatamente quem é este usuário.
    if (card.telegram_id) {
      await supabase
        .from('telegram_leads')
        .update({ 
          user_id: user.id,
          status: 'registered' // ou qualified, se já estiver, não cai a qualificação
        })
        .eq('telegram_id', card.telegram_id)
        .is('user_id', null);
    }

    // Log the transaction in a hypotetical internal table (optional), for now just return success
    return new Response(JSON.stringify({ 
      success: true, 
      message: `${robux_amount} Robux adicionados com sucesso!` 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('validate-card-purchase error:', err);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor', detail: err?.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
