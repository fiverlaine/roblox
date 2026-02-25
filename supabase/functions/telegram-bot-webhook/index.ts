import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    from: { id: number; username?: string; first_name?: string };
    text?: string;
  };
  callback_query?: {
    id: string;
    from: { id: number; username?: string; first_name?: string };
    message: { chat: { id: number } };
    data: string;
  };
}

async function getBotToken(): Promise<string | null> {
  const { data } = await supabase
    .from('bot_configs')
    .select('token')
    .eq('bot_type', 'funnel')
    .eq('is_active', true)
    .single();

  return data?.token ?? null;
}

async function getGroupLink(): Promise<string> {
  const { data } = await supabase
    .from('bot_configs')
    .select('group_link')
    .eq('bot_type', 'funnel')
    .eq('is_active', true)
    .single();

  return data?.group_link ?? 'https://t.me/+default';
}

async function sendMessage(
  token: string,
  chatId: number,
  text: string,
  replyMarkup?: Record<string, unknown>,
): Promise<void> {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function answerCallbackQuery(
  token: string,
  callbackQueryId: string,
): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId }),
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleStart(
  token: string,
  chatId: number,
  telegramId: number,
  telegramUsername: string | undefined,
  firstName: string | undefined,
  startParam: string,
): Promise<void> {
  if (startParam) {
    await supabase
      .from('telegram_leads')
      .update({
        telegram_id: telegramId,
        telegram_username: telegramUsername || null,
        status: 'registered',
      })
      .eq('start_param', startParam);
  }

  const name = firstName || telegramUsername || 'amigo';

  await sendMessage(
    token,
    chatId,
    'Você quer entrar e aprender a sacar mais de R$ 1.000 na sua conta ainda hj?',
  );

  await delay(2000);

  await sendMessage(
    token,
    chatId,
    `Showw então ${name}, vou te explicar aqui rapidinho...`,
  );

  await delay(2000);

  await sendMessage(
    token,
    chatId,
    'Nossa equipe descobriu esse trampo novo, numa plataforma do roblox!',
  );

  await delay(2000);

  await sendMessage(
    token,
    chatId,
    'Enquanto muitos ai perdem tempo com joguinho de roblox, a gente fatura alto 🤑🔥',
  );

  await delay(2000);

  await sendMessage(
    token,
    chatId,
    'Mas deixa de enrolação, vou te mandar o link do grupo pra vc entrar!',
  );

  await delay(1000);

  const groupLink = await getGroupLink();

  await sendMessage(token, chatId, 'Clica no botão abaixo 👇', {
    inline_keyboard: [
      [
        {
          text: '💸 ENTRAR NO GRUPO',
          url: groupLink,
        },
      ],
    ],
  });
}

async function handleTextMessage(
  token: string,
  chatId: number,
  firstName: string | undefined,
  telegramUsername: string | undefined,
  text: string,
): Promise<void> {
  const lower = text.toLowerCase().trim();

  if (lower === 'sim' || lower === 's') {
    const name = firstName || telegramUsername || 'amigo';

    await sendMessage(
      token,
      chatId,
      `Showw então ${name}, vou te explicar aqui rapidinho...`,
    );

    await delay(2000);

    await sendMessage(
      token,
      chatId,
      'Nossa equipe descobriu esse trampo novo, numa plataforma do roblox!',
    );

    await delay(2000);

    await sendMessage(
      token,
      chatId,
      'Enquanto muitos ai perdem tempo com joguinho de roblox, a gente fatura alto 🤑🔥',
    );

    await delay(2000);

    await sendMessage(
      token,
      chatId,
      'Mas deixa de enrolação, vou te mandar o link do grupo pra vc entrar!',
    );

    await delay(1000);

    const groupLink = await getGroupLink();

    await sendMessage(token, chatId, 'Clica no botão abaixo 👇', {
      inline_keyboard: [
        [
          {
            text: '💸 ENTRAR NO GRUPO',
            url: groupLink,
          },
        ],
      ],
    });
  } else {
    await sendMessage(
      token,
      chatId,
      'Você quer entrar e aprender a sacar mais de R$ 1.000 na sua conta ainda hj? Responde "sim" 👇',
    );
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const update: TelegramUpdate = await req.json();
    const token = await getBotToken();

    if (!token) {
      console.error('Funnel bot token not configured');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (update.callback_query) {
      await answerCallbackQuery(token, update.callback_query.id);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (update.message?.text) {
      const text = update.message.text;
      const chatId = update.message.chat.id;
      const from = update.message.from;

      if (text.startsWith('/start')) {
        const parts = text.split(' ');
        const startParam = parts.length > 1 ? parts[1] : '';
        await handleStart(
          token,
          chatId,
          from.id,
          from.username,
          from.first_name,
          startParam,
        );
      } else {
        await handleTextMessage(
          token,
          chatId,
          from.first_name,
          from.username,
          text,
        );
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('telegram-bot-webhook error:', err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
