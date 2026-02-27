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

async function getBotConfig(): Promise<{ token: string; group_link: string; group_chat_id: string | null } | null> {
  const { data } = await supabase
    .from('bot_configs')
    .select('token, group_link, group_chat_id')
    .eq('bot_type', 'funnel')
    .eq('is_active', true)
    .single();

  if (!data?.token) return null;
  return {
    token: data.token,
    group_link: data.group_link ?? 'https://t.me/+default',
    group_chat_id: data.group_chat_id ?? null,
  };
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

/**
 * Generates a unique invite link for the group via Telegram API.
 * The link name contains the start_param for attribution tracking.
 * If it fails, falls back to the static group link.
 */
async function generateUniqueInviteLink(
  token: string,
  groupChatId: string,
  startParam: string,
): Promise<string | null> {
  try {
    // Link name: "v_{start_param}" — max 32 chars, used for attribution
    const linkName = `v_${startParam}`.substring(0, 32);

    const response = await fetch(
      `https://api.telegram.org/bot${token}/createChatInviteLink`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: groupChatId,
          name: linkName,
          member_limit: 1, // One-time use link for precise tracking
          creates_join_request: false,
        }),
      },
    );

    const result = await response.json();

    if (result.ok && result.result?.invite_link) {
      console.log(`[Bot] ✅ Invite link gerado: ${result.result.invite_link} (name: ${linkName})`);
      return result.result.invite_link;
    } else {
      console.error('[Bot] ❌ Erro ao criar invite link:', result.description || result);
      return null;
    }
  } catch (err) {
    console.error('[Bot] ❌ Erro de rede ao criar invite link:', err);
    return null;
  }
}

async function handleStart(
  token: string,
  chatId: number,
  telegramId: number,
  telegramUsername: string | undefined,
  firstName: string | undefined,
  startParam: string,
  groupLink: string,
  groupChatId: string | null,
): Promise<void> {
  // 1. Update lead with telegram_id
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

  // 2. Send conversation messages
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

  // 3. Generate unique invite link OR use static link
  let finalGroupLink = groupLink;

  if (groupChatId && startParam) {
    const uniqueLink = await generateUniqueInviteLink(token, groupChatId, startParam);
    if (uniqueLink) {
      finalGroupLink = uniqueLink;
    } else {
      console.warn('[Bot] ⚠️ Fallback para link estático do grupo');
    }
  }

  await sendMessage(token, chatId, 'Clica no botão abaixo 👇', {
    inline_keyboard: [
      [
        {
          text: '💸 ENTRAR NO GRUPO',
          url: finalGroupLink,
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
  groupLink: string,
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

    // For text messages (no start_param), use static link
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
    const config = await getBotConfig();

    if (!config) {
      console.error('Funnel bot not configured or inactive');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { token, group_link, group_chat_id } = config;

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
          group_link,
          group_chat_id,
        );
      } else {
        await handleTextMessage(
          token,
          chatId,
          from.first_name,
          from.username,
          text,
          group_link,
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
