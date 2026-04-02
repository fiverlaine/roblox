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

    // Incrementar saldo de robux usando RPC
    const { error: rpcError } = await supabase.rpc('increment_robux', {
      user_id: user.id,
      amount: Number(robux_amount)
    });

    if (rpcError) {
      // Se não houver RPC, fazemos update manual bypassando o erro do RPC (apenas em caso de fallback)
      console.warn('RPC increment_robux failed or missing, trying direct update', rpcError);
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        const newRobuxBalance = (profile.robux_balance || 0) + Number(robux_amount);
        await supabase
          .from('profiles')
          .update({ robux_balance: newRobuxBalance })
          .eq('id', user.id);
      }
    }

    // Integração MÁGICA: Vincula o lead do telegram ao usuário atual!
    if (card.telegram_id) {
       // Atualiza apenass leads com status 'new' para 'registered' e define o user_id
      await supabase
        .from('telegram_leads')
        .update({ 
          user_id: user.id,
          status: 'registered'
        })
        .eq('telegram_id', card.telegram_id)
        .is('user_id', null)
        .neq('status', 'qualified');

      // Atualiza os leads 'qualified' apenas setando user_id (já que não queremos perder status)
      await supabase
        .from('telegram_leads')
        .update({ 
          user_id: user.id
        })
        .eq('telegram_id', card.telegram_id)
        .is('user_id', null)
        .eq('status', 'qualified');
    }

    // Retorna o sucess
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
