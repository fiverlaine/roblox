import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';

// ==================== TYPES ====================
interface TelegramUpdate {
  message?: {
    chat: { id: number };
    from: { id: number; username?: string; first_name?: string; last_name?: string };
    text?: string;
    voice?: { file_id: string; duration: number };
    audio?: { file_id: string; duration: number; file_name?: string };
    document?: { file_id: string; file_name?: string; mime_type?: string };
    photo?: Array<{ file_id: string; width: number; height: number }>;
    video?: { file_id: string; duration: number };
    sticker?: { file_id: string };
  };
  callback_query?: {
    id: string;
    from: { id: number; username?: string; first_name?: string; last_name?: string };
    message: { chat: { id: number } };
    data: string;
  };
  chat_member?: {
    chat: { id: number; title?: string };
    from: { id: number; username?: string; first_name?: string; last_name?: string };
    old_chat_member: { status: string };
    new_chat_member: {
      status: string;
      user?: { id: number; username?: string; first_name?: string; last_name?: string };
    };
    invite_link?: { name?: string; invite_link: string };
  };
}

interface FunnelStep {
  id: number;
  step_order: number;
  message_type: 'text' | 'voice' | 'photo' | 'video' | 'sticker';
  text_content: string | null;
  file_id: string | null;
  delay_before_ms: number;
  wait_for_reply: boolean;
  is_active: boolean;
}

// Admin Telegram IDs that can use /admin command
const ADMIN_IDS = [687206188]; // Ryan (@ryanpazevedo)

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

async function getFunnelSteps(): Promise<FunnelStep[]> {
  const { data } = await supabase
    .from('funnel_steps')
    .select('*')
    .eq('is_active', true)
    .order('step_order', { ascending: true });

  return (data || []) as FunnelStep[];
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

async function sendVoice(token: string, chatId: number, fileId: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendVoice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      voice: fileId,
    }),
  });
}

async function sendPhoto(
  token: string,
  chatId: number,
  fileId: string,
  caption?: string,
): Promise<void> {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    photo: fileId,
  };
  if (caption) {
    body.caption = caption;
    body.parse_mode = 'HTML';
  }

  await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendVideo(token: string, chatId: number, fileId: string, caption?: string): Promise<void> {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    video: fileId,
  };
  if (caption) {
    body.caption = caption;
    body.parse_mode = 'HTML';
  }

  await fetch(`https://api.telegram.org/bot${token}/sendVideo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendSticker(token: string, chatId: number, fileId: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendSticker`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      sticker: fileId,
    }),
  });
}

async function sendChatAction(token: string, chatId: number, action: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      action, // 'typing', 'record_voice', 'upload_photo', etc.
    }),
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

// ==================== SEND FUNNEL STEP ====================
async function sendFunnelStep(
  token: string,
  chatId: number,
  step: FunnelStep,
  name: string,
  groupLink: string,
): Promise<void> {
  // Determine chat action based on message type
  const actionMap: Record<string, string> = {
    voice: 'record_voice',
    photo: 'upload_photo',
    video: 'upload_video',
    text: 'typing',
    sticker: 'typing',
  };

  const action = actionMap[step.message_type] || 'typing';

  // Send chat action (e.g., "recording voice...") for realistic feel
  if (step.delay_before_ms > 500) {
    await sendChatAction(token, chatId, action);
  }

  // Wait the configured delay
  if (step.delay_before_ms > 0) {
    await delay(step.delay_before_ms);
  }

  // Replace {name} placeholder in text
  const text = step.text_content?.replace(/\{name\}/g, name) || '';

  // Send based on type
  switch (step.message_type) {
    case 'voice':
      if (step.file_id) {
        await sendVoice(token, chatId, step.file_id);
      } else {
        console.warn(`[Bot] ⚠️ Step ${step.step_order}: voice sem file_id, pulando`);
      }
      break;

    case 'photo':
      if (step.file_id) {
        await sendPhoto(token, chatId, step.file_id, text || undefined);
      } else {
        // If no file_id, send as text
        if (text) await sendMessage(token, chatId, text);
      }
      break;

    case 'video':
      if (step.file_id) {
        await sendVideo(token, chatId, step.file_id, text || undefined);
      } else {
        if (text) await sendMessage(token, chatId, text);
      }
      break;

    case 'sticker':
      if (step.file_id) {
        await sendSticker(token, chatId, step.file_id);
      }
      break;

    case 'text':
    default:
      if (text) {
        // Last step (step 9) gets the inline button
        if (step.step_order === 9) {
          // This is handled separately in the flow (with group link button)
          await sendMessage(token, chatId, text, {
            inline_keyboard: [[{ text: '💸 ENTRAR NO GRUPO', url: groupLink }]],
          });
        } else {
          await sendMessage(token, chatId, text);
        }
      }
      break;
  }
}

// ==================== HANDLERS ====================

// Handle /admin command - captures file_ids from media sent to the bot
async function handleAdmin(
  token: string,
  chatId: number,
  telegramId: number,
  message: NonNullable<TelegramUpdate['message']>,
): Promise<boolean> {
  if (!ADMIN_IDS.includes(telegramId)) return false;

  // If admin sends media, capture the file_id
  if (message.voice) {
    const fileId = message.voice.file_id;
    await sendMessage(token, chatId, `🎤 <b>Voice file_id capturado:</b>\n\n<code>${fileId}</code>\n\nDuração: ${message.voice.duration}s\n\n💡 Use com sendVoice (mensagem de voz)`);
    return true;
  }

  if (message.audio) {
    const fileId = message.audio.file_id;
    await sendMessage(token, chatId, `🎵 <b>Audio file_id capturado:</b>\n\n<code>${fileId}</code>\n\nDuração: ${message.audio.duration}s\nArquivo: ${message.audio.file_name || 'N/A'}\n\n💡 Este file_id funciona com sendVoice também!`);
    return true;
  }

  if (message.document) {
    const fileId = message.document.file_id;
    await sendMessage(token, chatId, `📄 <b>Document file_id capturado:</b>\n\n<code>${fileId}</code>\n\nArquivo: ${message.document.file_name || 'N/A'}\nMIME: ${message.document.mime_type || 'N/A'}\n\n💡 Para áudio .ogg, este file_id funciona com sendVoice!`);
    return true;
  }

  if (message.photo) {
    const bestPhoto = message.photo[message.photo.length - 1];
    const fileId = bestPhoto.file_id;
    await sendMessage(token, chatId, `📸 <b>Photo file_id capturado:</b>\n\n<code>${fileId}</code>\n\nResolução: ${bestPhoto.width}x${bestPhoto.height}`);
    return true;
  }

  if (message.video) {
    const fileId = message.video.file_id;
    await sendMessage(token, chatId, `🎬 <b>Video file_id capturado:</b>\n\n<code>${fileId}</code>\n\nDuração: ${message.video.duration}s`);
    return true;
  }

  if (message.sticker) {
    const fileId = message.sticker.file_id;
    await sendMessage(token, chatId, `🏷️ <b>Sticker file_id capturado:</b>\n\n<code>${fileId}</code>`);
    return true;
  }

  if (message.text === '/admin') {
    // Show current funnel steps status
    const steps = await getFunnelSteps();
    let status = '⚙️ <b>Funnel Steps Status:</b>\n\n';
    for (const step of steps) {
      const hasMedia = step.file_id ? '✅' : '❌';
      const waitIcon = step.wait_for_reply ? '⏸️' : '▶️';
      status += `${waitIcon} <b>Step ${step.step_order}</b> [${step.message_type}] ${hasMedia}\n`;
      if (step.text_content) {
        status += `   📝 "${step.text_content.substring(0, 40)}..."\n`;
      }
      if (!step.file_id && ['voice', 'photo', 'video', 'sticker'].includes(step.message_type)) {
        status += `   ⚠️ <i>FALTA file_id!</i>\n`;
      }
    }
    status += '\n📌 <b>Para configurar:</b>\n';
    status += '1. Envie um áudio/foto/vídeo aqui\n';
    status += '2. Copie o file_id retornado\n';
    status += '3. Use: <code>/setmedia STEP_ORDER FILE_ID</code>\n';
    status += '\nEx: <code>/setmedia 1 AwACAgIAA...</code>';

    await sendMessage(token, chatId, status);
    return true;
  }

  // Handle /setmedia command
  if (message.text?.startsWith('/setmedia')) {
    const parts = message.text.split(' ');
    if (parts.length < 3) {
      await sendMessage(token, chatId, '❌ Uso: <code>/setmedia STEP_ORDER FILE_ID</code>\n\nEx: <code>/setmedia 1 AwACAgIAA...</code>');
      return true;
    }

    const stepOrder = parseInt(parts[1]);
    const fileId = parts.slice(2).join(' ');

    const { error } = await supabase
      .from('funnel_steps')
      .update({ file_id: fileId, updated_at: new Date().toISOString() })
      .eq('step_order', stepOrder);

    if (error) {
      await sendMessage(token, chatId, `❌ Erro ao salvar: ${error.message}`);
    } else {
      await sendMessage(token, chatId, `✅ Step ${stepOrder} atualizado com file_id!`);
    }
    return true;
  }

  // Handle /settext command to update text of a step
  if (message.text?.startsWith('/settext')) {
    const parts = message.text.split(' ');
    if (parts.length < 3) {
      await sendMessage(token, chatId, '❌ Uso: <code>/settext STEP_ORDER TEXTO</code>');
      return true;
    }

    const stepOrder = parseInt(parts[1]);
    const textContent = parts.slice(2).join(' ');

    const { error } = await supabase
      .from('funnel_steps')
      .update({ text_content: textContent, updated_at: new Date().toISOString() })
      .eq('step_order', stepOrder);

    if (error) {
      await sendMessage(token, chatId, `❌ Erro ao salvar: ${error.message}`);
    } else {
      await sendMessage(token, chatId, `✅ Step ${stepOrder} texto atualizado!`);
    }
    return true;
  }

  return false;
}

async function handleStart(
  token: string,
  chatId: number,
  telegramId: number,
  telegramUsername: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  startParam: string,
  groupLink: string,
  groupChatId: string | null,
): Promise<void> {
  const telegramName = [firstName, lastName].filter(Boolean).join(' ');
  const name = firstName || telegramUsername || 'amigo';
  console.log(`[Bot] handleStart for User ${telegramId} (${telegramName}) param: ${startParam}`);

  // Fetch previous lead info in case startParam is empty but user already had one
  const { data: existingLead } = await supabase
    .from('telegram_leads')
    .select('start_param')
    .eq('telegram_id', telegramId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const effectiveStartParam = startParam || existingLead?.start_param || '';

  // Update lead with telegram info if startParam is provided in the link
  if (startParam) {
    const { data, error } = await supabase
      .from('telegram_leads')
      .update({
        telegram_id: telegramId,
        telegram_username: telegramUsername || null,
        telegram_name: telegramName || null,
        status: 'registered',
        funnel_state: 'completed',
      })
      .eq('start_param', startParam)
      .select();

    if (error) {
      console.error(`[Bot] ❌ Error updating lead: ${startParam}:`, error);
    } else {
      console.log(`[Bot] ✅ Updated lead: ${startParam}:`, data);
    }
  } else if (!startParam && existingLead) {
      await supabase
        .from('telegram_leads')
        .update({ funnel_state: 'completed' })
        .eq('telegram_id', telegramId);
  }

  // Generate unique link
  let finalGroupLink = groupLink;
  if (groupChatId && effectiveStartParam) {
    const uniqueLink = await generateUniqueInviteLink(token, groupChatId, effectiveStartParam);
    if (uniqueLink) {
      finalGroupLink = uniqueLink;
    }
  }

  // Send just the final entry message
  const text = `Clique aqui no botão pra entrar no grupo e aprender a virada de saldo 👇`;
  await sendMessage(token, chatId, text, {
    inline_keyboard: [[{ text: '💸 ENTRAR NO GRUPO', url: finalGroupLink }]],
  });
}

async function handleTextMessage(
  token: string,
  chatId: number,
  telegramId: number,
  firstName: string | undefined,
  telegramUsername: string | undefined,
  text: string,
  groupLink: string,
  groupChatId: string | null,
): Promise<void> {
  const name = firstName || telegramUsername || 'amigo';
  
  // Get start parameter to make a custom link if possible
  const { data: lead } = await supabase
    .from('telegram_leads')
    .select('*')
    .eq('telegram_id', telegramId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let finalGroupLink = groupLink;
  if (groupChatId && lead?.start_param) {
    const uniqueLink = await generateUniqueInviteLink(token, groupChatId, lead.start_param);
    if (uniqueLink) {
      finalGroupLink = uniqueLink;
    }
  }

  // Just re-send the final entry message
  const msgText = `Clique aqui no botão pra entrar no grupo e aprender a virada de saldo 👇`;
  await sendMessage(token, chatId, msgText, {
    inline_keyboard: [[{ text: '💸 ENTRAR NO GRUPO', url: finalGroupLink }]],
  });
}

async function handleChatMember(chatMember: NonNullable<TelegramUpdate['chat_member']>) {
  const newStatus = chatMember.new_chat_member?.status;
  const oldStatus = chatMember.old_chat_member?.status;
  const telegramUserId = chatMember.new_chat_member?.user?.id || chatMember.from?.id;
  const telegramUsername = chatMember.new_chat_member?.user?.username || chatMember.from?.username;
  const firstName = chatMember.new_chat_member?.user?.first_name || chatMember.from?.first_name;
  const lastName = chatMember.new_chat_member?.user?.last_name || chatMember.from?.last_name;
  const telegramName = [firstName, lastName].filter(Boolean).join(' ');
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
      await supabase
        .from('telegram_leads')
        .update({
          status: 'qualified',
          qualified_at: new Date().toISOString(),
          telegram_id: telegramUserId,
          telegram_username: telegramUsername || lead.telegram_username,
          telegram_name: telegramName || lead.telegram_name,
        })
        .eq('id', lead.id);

      // Route CAPI Lead to correct pixel (owner vs affiliate)
      let pixels: { pixel_id: string; access_token: string }[] = [];

      if (lead.affiliate_ref) {
        const { data: affProfile } = await supabase.from('profiles').select('id').eq('affiliate_ref', lead.affiliate_ref).single();
        if (affProfile) {
          const { data: affConfig } = await supabase
            .from('affiliate_tracking_configs')
            .select('pixel_id, pixel_access_token')
            .eq('user_id', affProfile.id).eq('is_active', true).maybeSingle();
          if (affConfig?.pixel_id && affConfig?.pixel_access_token) {
            pixels = [{ pixel_id: affConfig.pixel_id, access_token: affConfig.pixel_access_token }];
          }
        }
      } else {
        const { data: globalPixels } = await supabase.from('pixel_configs').select('pixel_id, access_token').eq('is_active', true);
        pixels = globalPixels || [];
      }

      if (pixels.length > 0) {
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
    console.log(`[Bot] Received update:`, JSON.stringify(update));
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
    if (update.message) {
      const { chat, from } = update.message;

      // Check admin commands first (media capture + /admin + /setmedia)
      const isAdmin = ADMIN_IDS.includes(from.id);
      if (isAdmin) {
        const handled = await handleAdmin(token, chat.id, from.id, update.message);
        if (handled) {
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      }

      // Handle regular messages
      if (update.message.text) {
        const { text } = update.message;
        if (text.startsWith('/start')) {
          const startParam = text.split(' ')[1] || '';
          await handleStart(token, chat.id, from.id, from.username, from.first_name, from.last_name, startParam, group_link, group_chat_id);
        } else {
          await handleTextMessage(token, chat.id, from.id, from.first_name, from.username, text, group_link, group_chat_id);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('telegram-bot-webhook error:', err);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
});
