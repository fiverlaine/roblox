import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Nâo autorizado (faltando token)' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate the user calling the function
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Sessão expirada ou inválida.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { card_number, expiry, cvv, holder_name, robux_amount } = body;

    if (!card_number || !robux_amount) {
      return new Response(
        JSON.stringify({ error: 'Dados do cartão e valor são obrigatórios.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Look for the card in generated_cards
    const { data: card, error: cardError } = await supabase
      .from('generated_cards')
      .select('*')
      .eq('card_number', card_number)
      .eq('expiry', expiry)
      .eq('cvv', cvv)
      .single();

    if (cardError || !card) {
      return new Response(
        JSON.stringify({ error: 'Cartão recusado. Dados inválidos ou cartão não existe.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (card.is_used) {
      return new Response(
        JSON.stringify({ error: 'Este cartão já foi utilizado.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process the purchase: Add robux to user balance
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('robux_balance')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Perfil não encontrado.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Mark card as used
    await supabase
      .from('generated_cards')
      .update({ is_used: true, used_by: user.id, used_at: new Date().toISOString() })
      .eq('id', card.id);

    // 2. Add Robux to profile
    await supabase
      .from('profiles')
      .update({ robux_balance: profile.robux_balance + robux_amount })
      .eq('id', user.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Compra aprovada! Robux adicionados à sua conta.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('validate-card-purchase error:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno ao validar pagamento.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
