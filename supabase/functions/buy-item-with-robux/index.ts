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

    const { item_id } = await req.json();

    if (!item_id) {
      return new Response(JSON.stringify({ error: 'item_id obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get item
    const { data: item } = await supabase
      .from('items')
      .select('*')
      .eq('id', item_id)
      .single();

    if (!item) {
      return new Response(JSON.stringify({ error: 'Item não encontrado' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user profile to check balance
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile || profile.robux_balance < item.price_robux) {
      return new Response(JSON.stringify({ error: 'Saldo de Robux insuficiente para a compra' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Deduct balance
    const newBalance = profile.robux_balance - item.price_robux;
    await supabase
      .from('profiles')
      .update({ robux_balance: newBalance })
      .eq('id', user.id);

    // Insert user item
    await supabase
      .from('user_items')
      .insert({
        user_id: user.id,
        item_id: item.id,
        status: 'active'
      });

    // Register purchase
    await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        item_id: item.id,
        price_robux: item.price_robux,
        payment_method: 'robux_balance',
        status: 'completed'
      });

    return new Response(JSON.stringify({ success: true, message: 'Item comprado com sucesso!' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('buy-item-with-robux error:', err);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor', detail: err?.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
