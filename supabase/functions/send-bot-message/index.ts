import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

interface SendMessageRequest {
  bot_type: 'funnel' | 'sales';
  telegram_chat_id: number;
  text: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify the request has valid auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body: SendMessageRequest = await req.json();
    const { bot_type, telegram_chat_id, text } = body;

    if (!bot_type || !telegram_chat_id || !text) {
      return new Response(JSON.stringify({ error: 'Missing required fields: bot_type, telegram_chat_id, text' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['funnel', 'sales'].includes(bot_type)) {
      return new Response(JSON.stringify({ error: 'Invalid bot_type. Must be "funnel" or "sales"' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get bot token
    const { data: botConfig } = await supabase
      .from('bot_configs')
      .select('token')
      .eq('bot_type', bot_type)
      .eq('is_active', true)
      .single();

    if (!botConfig?.token) {
      return new Response(JSON.stringify({ error: `Bot ${bot_type} not configured or inactive` }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send message via Telegram API
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botConfig.token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegram_chat_id,
          text,
          parse_mode: 'HTML',
        }),
      },
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      console.error('[SendBotMessage] Telegram error:', telegramResult);
      return new Response(JSON.stringify({ error: telegramResult.description || 'Telegram API error' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save outgoing message to bot_messages
    await supabase.from('bot_messages').insert({
      bot_type,
      telegram_chat_id,
      direction: 'outgoing',
      message_type: 'text',
      text_content: text,
      telegram_message_id: telegramResult.result?.message_id || null,
    });

    return new Response(JSON.stringify({ ok: true, message_id: telegramResult.result?.message_id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[SendBotMessage] Error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
