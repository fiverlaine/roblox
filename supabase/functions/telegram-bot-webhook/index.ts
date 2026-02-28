import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

// ==================== TYPES ====================
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
  chat_member?: {
    chat: { id: number; title?: string };
    from: { id: number; username?: string; first_name?: string };
    old_chat_member: { status: string };
    new_chat_member: {
      status: string;
      user?: { id: number; username?: string; first_name?: string };
    };
    invite_link?: { name?: string; invite_link: string };
  };
}

// ==================== SHA256 HASHING ====================
async function hashSHA256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ==================== FACEBOOK CAPI ====================
async function sendCAPIEvent(
  accessToken: string,
  pixelId: string,
  eventName: string,
  userData: {
    fbc?: string | null;
    fbp?: string | null;
    user_agent?: string | null;
    ip_address?: string | null;
    external_id?: string | null;
  },
  customData?: {
    content_name?: string;
  },
  logMeta?: {
    lead_id?: number;
    start_param?: string;
  },
) {
  const capiUserData: Record<string, unknown> = {};

  if (userData.fbc && String(userData.fbc).trim()) {
    capiUserData.fbc = String(userData.fbc).trim();
  }
  if (userData.fbp && String(userData.fbp).trim()) {
    capiUserData.fbp = String(userData.fbp).trim();
  }
  if (userData.user_agent) {
    capiUserData.client_user_agent = userData.user_agent;
  }
  if (userData.ip_address && userData.ip_address !== '0.0.0.0') {
    capiUserData.client_ip_address = userData.ip_address;
  }
  if (userData.external_id) {
    capiUserData.external_id = await hashSHA256(userData.external_id);
  }

  const capiCustomData: Record<string, unknown> = {};
  if (customData?.content_name) {
    capiCustomData.content_name = customData.content_name;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const eventId = `${eventName.toLowerCase()}_${currentTimestamp}_${logMeta?.start_param || 'unknown'}`;

  const eventPayload = {
    data: [
      {
        event_name: eventName,
        event_time: currentTimestamp,
        event_id: eventId,
        action_source: 'website',
        user_data: capiUserData,
        ...(Object.keys(capiCustomData).length > 0 && { custom_data: capiCustomData }),
      },
    ],
  };

  const apiVersion = 'v18.0';
  const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

  console.log(`[CAPI] Enviando ${eventName} para Pixel ${pixelId}...`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    });

    const result = await response.json();
    const logStatus = result.events_received && result.events_received > 0 ? 'success' : 'error';
    const logError = result.error ? (result.error.message || JSON.stringify(result.error)) : null;

    await supabase.from('capi_logs').insert({
      lead_id: logMeta?.lead_id || null,
      start_param: logMeta?.start_param || null,
      event_name: eventName,
      pixel_id: pixelId,
      status: logStatus,
      request_payload: eventPayload,
      response_payload: result,
      error_message: logError,
    });

    return result;
  } catch (err) {
    console.error(`[CAPI] ❌ Erro de rede:`, err);
    await supabase.from('capi_logs').insert({
      lead_id: logMeta?.lead_id || null,
      start_param: logMeta?.start_param || null,
      event_name: eventName,
      pixel_id: pixelId,
      status: 'error',
      request_payload: eventPayload,
      error_message: String(err),
    });
    return null;
  }
}

// ==================== BOT UTILITIES ====================
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

async function answerCallbackQuery(token: string, callbackQueryId: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId }),
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateUniqueInviteLink(
  token: string,
  groupChatId: string,
  startParam: string,
): Promise<string | null> {
  try {
    const linkName = `v_${startParam}`.substring(0, 32);
    const response = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupChatId,
        name: linkName,
        member_limit: 1,
        creates_join_request: false,
      }),
    });

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

// ==================== HANDLERS ====================
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
  await sendMessage(token, chatId, 'Você quer entrar e aprender a sacar mais de R$ 1.000 na sua conta ainda hj?');
  await delay(2000);
  await sendMessage(token, chatId, `Showw então ${name}, vou te explicar aqui rapidinho...`);
  await delay(2000);
  await sendMessage(token, chatId, 'Nossa equipe descobriu esse trampo novo, numa plataforma do roblox!');
  await delay(2000);
  await sendMessage(token, chatId, 'Enquanto muitos ai perdem tempo com joguinho de roblox, a gente fatura alto 🤑🔥');
  await delay(2000);
  await sendMessage(token, chatId, 'Mas deixa de enrolação, vou te mandar o link do grupo pra vc entrar!');
  await delay(1000);

  let finalGroupLink = groupLink;
  if (groupChatId && startParam) {
    const uniqueLink = await generateUniqueInviteLink(token, groupChatId, startParam);
    if (uniqueLink) {
      finalGroupLink = uniqueLink;
    }
  }

  await sendMessage(token, chatId, 'Clica no botão abaixo 👇', {
    inline_keyboard: [[{ text: '💸 ENTRAR NO GRUPO', url: finalGroupLink }]],
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
    await sendMessage(token, chatId, `Showw então ${name}, vou te explicar aqui rapidinho...`);
    await delay(2000);
    await sendMessage(token, chatId, 'Nossa equipe descobriu esse trampo novo, numa plataforma do roblox!');
    await delay(2000);
    await sendMessage(token, chatId, 'Enquanto muitos ai perdem tempo com joguinho de roblox, a gente fatura alto 🤑🔥');
    await delay(2000);
    await sendMessage(token, chatId, 'Mas deixa de enrolação, vou te mandar o link do grupo pra vc entrar!');
    await delay(1000);
    await sendMessage(token, chatId, 'Clica no botão abaixo 👇', {
      inline_keyboard: [[{ text: '💸 ENTRAR NO GRUPO', url: groupLink }]],
    });
  } else {
    await sendMessage(token, chatId, 'Você quer entrar e aprender a sacar mais de R$ 1.000 na sua conta ainda hj? Responde "sim" 👇');
  }
}

async function handleChatMember(chatMember: NonNullable<TelegramUpdate['chat_member']>) {
  const newStatus = chatMember.new_chat_member?.status;
  const oldStatus = chatMember.old_chat_member?.status;
  const telegramUserId = chatMember.new_chat_member?.user?.id || chatMember.from?.id;
  const telegramUsername = chatMember.new_chat_member?.user?.username || chatMember.from?.username;
  const inviteLink = chatMember.invite_link;
  const inviteName = inviteLink?.name;

  const isJoin =
    ['member', 'creator', 'administrator'].includes(newStatus) &&
    !['member', 'creator', 'administrator'].includes(oldStatus);

  if (isJoin) {
    console.log(`[Bot] 🟢 User ${telegramUserId} JOINED group! invite_name: ${inviteName || 'N/A'}`);

    let startParam: string | null = null;
    if (inviteName && inviteName.startsWith('v_')) {
      startParam = inviteName.substring(2);
    }

    let lead: any = null;
    if (startParam) {
      const { data } = await supabase.from('telegram_leads').select('*').eq('start_param', startParam).maybeSingle();
      lead = data;
    }

    if (!lead && telegramUserId) {
      const { data } = await supabase
        .from('telegram_leads')
        .select('*')
        .eq('telegram_id', telegramUserId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      lead = data;
    }

    if (lead) {
      // Update lead to "qualified"
      await supabase
        .from('telegram_leads')
        .update({
          status: 'qualified',
          qualified_at: new Date().toISOString(),
          telegram_id: telegramUserId,
          telegram_username: telegramUsername || lead.telegram_username,
        })
        .eq('id', lead.id);

      // Send CAPI "Lead"
      const { data: pixels } = await supabase.from('pixel_configs').select('pixel_id, access_token').eq('is_active', true);
      if (pixels && pixels.length > 0) {
        for (const pixel of pixels) {
          await sendCAPIEvent(pixel.access_token, pixel.pixel_id, 'Lead', {
            fbc: lead.fbc,
            fbp: lead.fbp,
            user_agent: lead.user_agent,
            ip_address: lead.ip_address,
            external_id: lead.start_param,
          }, {
            content_name: 'Roblox Vault - Entrada no Grupo',
          }, {
            lead_id: lead.id,
            start_param: lead.start_param,
          });
        }
      }
    }
  }
}

// ==================== MAIN SERVE ====================
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const update: TelegramUpdate = await req.json();
    const config = await getBotConfig();
    if (!config) return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    const { token, group_link, group_chat_id } = config;

    // Handle chat_member updates (joins)
    if (update.chat_member) {
      await handleChatMember(update.chat_member);
    }

    // Handle callback queries
    if (update.callback_query) {
      await answerCallbackQuery(token, update.callback_query.id);
    }

    // Handle text messages
    if (update.message?.text) {
      const { text, chat, from } = update.message;
      if (text.startsWith('/start')) {
        const startParam = text.split(' ')[1] || '';
        await handleStart(token, chat.id, from.id, from.username, from.first_name, startParam, group_link, group_chat_id);
      } else {
        await handleTextMessage(token, chat.id, from.first_name, from.username, text, group_link);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('telegram-bot-webhook error:', err);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
});
