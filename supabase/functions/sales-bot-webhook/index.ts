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
}

// Admin Telegram IDs para comandos /admin
const ADMIN_IDS = [687206188];

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
  customData?: { content_name?: string },
  logMeta?: { lead_id?: number; start_param?: string },
) {
  const capiUserData: Record<string, unknown> = {};
  if (userData.fbc && String(userData.fbc).trim()) capiUserData.fbc = String(userData.fbc).trim();
  if (userData.fbp && String(userData.fbp).trim()) capiUserData.fbp = String(userData.fbp).trim();
  if (userData.user_agent) capiUserData.client_user_agent = userData.user_agent;
  if (userData.ip_address && userData.ip_address !== '0.0.0.0') capiUserData.client_ip_address = userData.ip_address;
  if (userData.external_id) capiUserData.external_id = await hashSHA256(userData.external_id);

  const capiCustomData: Record<string, unknown> = {};
  if (customData?.content_name) capiCustomData.content_name = customData.content_name;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const eventId = `${eventName.toLowerCase()}_${currentTimestamp}_${logMeta?.start_param || 'unknown'}`;

  const eventPayload = {
    data: [{
      event_name: eventName,
      event_time: currentTimestamp,
      event_id: eventId,
      action_source: 'website',
      user_data: capiUserData,
      ...(Object.keys(capiCustomData).length > 0 && { custom_data: capiCustomData }),
    }],
  };

  const url = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`;
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
    console.error(`[CAPI] ❌ Erro:`, err);
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
async function getBotToken(): Promise<string | null> {
  const { data } = await supabase
    .from('bot_configs')
    .select('token')
    .eq('bot_type', 'sales')
    .eq('is_active', true)
    .single();
  return data?.token || null;
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
  if (replyMarkup) body.reply_markup = replyMarkup;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendVideo(token: string, chatId: number, fileId: string, caption?: string): Promise<void> {
  const body: Record<string, unknown> = { chat_id: chatId, video: fileId };
  if (caption) { body.caption = caption; body.parse_mode = 'HTML'; }
  await fetch(`https://api.telegram.org/bot${token}/sendVideo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendChatAction(token: string, chatId: number, action: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, action }),
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ==================== FUNNEL STATE MANAGEMENT ====================
// Uses admin_settings table with key 'sales_funnel_{telegram_id}'
// Value: { state: 'waiting_reply' | 'completed', start_param: string }

async function getFunnelState(telegramId: number): Promise<{ state: string; start_param: string } | null> {
  const { data } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', `sales_funnel_${telegramId}`)
    .maybeSingle();
  return data?.value as { state: string; start_param: string } | null;
}

async function setFunnelState(telegramId: number, state: string, startParam: string): Promise<void> {
  await supabase
    .from('admin_settings')
    .upsert({
      key: `sales_funnel_${telegramId}`,
      value: { state, start_param: startParam },
    }, { onConflict: 'key' });
}

// ==================== VIDEO FILE_ID MANAGEMENT ====================
// Stored in admin_settings with key 'sales_bot_video_file_id'
async function getVideoFileId(): Promise<string | null> {
  const { data } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'sales_bot_video_file_id')
    .maybeSingle();
  if (data?.value && typeof data.value === 'object' && 'file_id' in (data.value as object)) {
    return (data.value as { file_id: string }).file_id;
  }
  return null;
}

async function setVideoFileId(fileId: string): Promise<void> {
  await supabase
    .from('admin_settings')
    .upsert({
      key: 'sales_bot_video_file_id',
      value: { file_id: fileId },
    }, { onConflict: 'key' });
}

// ==================== HANDLE ADMIN ====================
async function handleAdmin(
  token: string,
  chatId: number,
  telegramId: number,
  message: NonNullable<TelegramUpdate['message']>,
): Promise<boolean> {
  if (!ADMIN_IDS.includes(telegramId)) return false;

  // Capturar file_id de vídeo
  if (message.video) {
    const fileId = message.video.file_id;
    await setVideoFileId(fileId);
    await sendMessage(token, chatId,
      `🎬 <b>Video file_id capturado e salvo!</b>\n\n<code>${fileId}</code>\n\nDuração: ${message.video.duration}s\n\n✅ Este vídeo será usado no funil de vendas automaticamente.`
    );
    return true;
  }

  // Capturar qualquer outra mídia
  if (message.voice) {
    await sendMessage(token, chatId, `🎤 <b>Voice file_id:</b>\n<code>${message.voice.file_id}</code>`);
    return true;
  }
  if (message.photo) {
    const best = message.photo[message.photo.length - 1];
    await sendMessage(token, chatId, `📸 <b>Photo file_id:</b>\n<code>${best.file_id}</code>`);
    return true;
  }
  if (message.document) {
    await sendMessage(token, chatId, `📄 <b>Document file_id:</b>\n<code>${message.document.file_id}</code>`);
    return true;
  }
  if (message.sticker) {
    await sendMessage(token, chatId, `🏷️ <b>Sticker file_id:</b>\n<code>${message.sticker.file_id}</code>`);
    return true;
  }

  if (message.text === '/admin') {
    const videoId = await getVideoFileId();
    let status = '⚙️ <b>Sales Bot Status:</b>\n\n';
    status += `📹 Vídeo configurado: ${videoId ? '✅' : '❌ Envie um vídeo aqui para configurar'}\n\n`;
    status += `<b>Funil:</b>\n`;
    status += `1. Texto de introdução\n`;
    status += `2. Vídeo (file_id salvo)\n`;
    status += `3. Espera resposta do usuário\n`;
    status += `4. Envia links (bot de cartão + plataforma)\n`;
    status += `5. Mensagem final (grupo + suporte)\n\n`;
    status += `💡 Para trocar o vídeo: envie um novo vídeo aqui.\n`;
    status += `💡 Para setar manualmente: <code>/setvideo FILE_ID</code>`;
    await sendMessage(token, chatId, status);
    return true;
  }

  if (message.text?.startsWith('/setvideo')) {
    const parts = message.text.split(' ');
    if (parts.length < 2) {
      await sendMessage(token, chatId, '❌ Uso: <code>/setvideo FILE_ID</code>');
      return true;
    }
    const fileId = parts.slice(1).join(' ');
    await setVideoFileId(fileId);
    await sendMessage(token, chatId, `✅ Vídeo do funil atualizado!`);
    return true;
  }

  return false;
}

// ==================== HANDLE START ====================
async function handleStart(
  token: string,
  chatId: number,
  telegramId: number,
  telegramUsername: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  startParam: string,
): Promise<void> {
  const telegramName = [firstName, lastName].filter(Boolean).join(' ');
  console.log(`[SalesBot] handleStart for User ${telegramId} (${telegramName}) param: ${startParam}`);

  // Update lead with telegram info (same pattern as funnel bot)
  if (startParam) {
    const { error } = await supabase
      .from('telegram_leads')
      .update({
        telegram_id: telegramId,
        telegram_username: telegramUsername || null,
        telegram_name: telegramName || null,
        status: 'registered',
        funnel_state: 'new',
      })
      .eq('start_param', startParam)
      .select();

    if (error) {
      console.error(`[SalesBot] ❌ Error updating lead: ${startParam}:`, error);
    }
  }

  // Determine effective start_param (for CAPI later)
  let effectiveParam = startParam;
  if (!effectiveParam) {
    const { data: existingLead } = await supabase
      .from('telegram_leads')
      .select('start_param')
      .eq('telegram_id', telegramId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    effectiveParam = existingLead?.start_param || '';
  }

  // ==================== FIRE CAPI Lead EVENT ====================
  // Send Lead event when user starts the sales bot
  if (effectiveParam) {
    const { data: lead } = await supabase
      .from('telegram_leads')
      .select('*')
      .eq('start_param', effectiveParam)
      .maybeSingle();

    if (lead) {
      // Update to qualified since they engaged with the sales bot
      await supabase
        .from('telegram_leads')
        .update({
          status: 'qualified',
          qualified_at: new Date().toISOString(),
        })
        .eq('id', lead.id);

      // Route CAPI to correct pixel (affiliate vs global)
      let pixels: { pixel_id: string; access_token: string }[] = [];

      if (lead.affiliate_ref) {
        const { data: affProfile } = await supabase.from('profiles').select('id').eq('affiliate_ref', lead.affiliate_ref).single();
        if (affProfile) {
          const { data: affConfig } = await supabase
            .from('affiliate_tracking_configs')
            .select('pixel_id, pixel_access_token')
            .eq('user_id', affProfile.id)
            .eq('is_active', true)
            .maybeSingle();
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
            content_name: 'Roblox Vault - Sales Bot Funnel',
          }, {
            lead_id: lead.id,
            start_param: lead.start_param,
          });
        }
      }
    }
  }

  // ==================== SEND FUNNEL ====================
  // Step 1: Texto de introdução
  await sendChatAction(token, chatId, 'typing');
  await delay(1500);
  await sendMessage(token, chatId,
    `📣Assista o vídeo para colocar R$1.100,90 agora no BOLSO🍀 e qualquer dúvida me chama no numero de suporte @pedrozutti`
  );

  // Step 2: Vídeo
  const videoFileId = await getVideoFileId();
  if (videoFileId) {
    await sendChatAction(token, chatId, 'upload_video');
    await delay(2000);
    await sendVideo(token, chatId, videoFileId);
  } else {
    console.warn('[SalesBot] ⚠️ Vídeo não configurado! Use /admin ou envie um vídeo para o bot.');
  }

  // Step 3: Texto + esperar resposta
  await sendChatAction(token, chatId, 'typing');
  await delay(3000);
  await sendMessage(token, chatId,
    `Quando acabar de ver o vídeo me fala aqui que te envio o bot de cartão e a plataforma.`
  );

  // Set state to waiting_reply
  await setFunnelState(telegramId, 'waiting_reply', effectiveParam);
}

// ==================== HANDLE REPLY (after waiting) ====================
async function handleReply(
  token: string,
  chatId: number,
  telegramId: number,
): Promise<void> {
  console.log(`[SalesBot] handleReply for User ${telegramId}`);

  // Step 4: Links do bot de cartão + plataforma
  await sendChatAction(token, chatId, 'typing');
  await delay(1500);
  await sendMessage(token, chatId,
    `🤖💳 Link do bot pra pegar os cartões: @S7venncsssbot\n\n🔗 Link do site pra virar saldo: https://robloxvault.site/registro \n\n👆 Copia o link e cola no seu navegador!`
  );

  // Step 5: Mensagem final
  await sendChatAction(token, chatId, 'typing');
  await delay(3000);
  await sendMessage(token, chatId,
    `Faz o trampo e me manda o resultado no meu contato de suporte @pedrozutti que vou te colocar no meu grupo de métodos, onde tem a galera que sempre faz os métodos comigo, qualquer trampo novo eu atualizo la tambem`
  );

  // Mark funnel as completed
  await setFunnelState(telegramId, 'completed', '');

  // Update lead funnel_state
  await supabase
    .from('telegram_leads')
    .update({ funnel_state: 'completed' })
    .eq('telegram_id', telegramId);
}

// ==================== MAIN SERVE ====================
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const update: TelegramUpdate = await req.json();
    console.log(`[SalesBot] Received update:`, JSON.stringify(update));

    const token = await getBotToken();
    if (!token) {
      console.error('[SalesBot] ❌ Bot token not found or bot inactive');
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Handle messages
    if (update.message) {
      const { chat, from } = update.message;

      // Admin commands first (media capture + /admin + /setvideo)
      if (ADMIN_IDS.includes(from.id)) {
        const handled = await handleAdmin(token, chat.id, from.id, update.message);
        if (handled) {
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      }

      if (update.message.text) {
        const { text } = update.message;

        if (text.startsWith('/start')) {
          const startParam = text.split(' ')[1] || '';
          await handleStart(
            token, chat.id, from.id,
            from.username, from.first_name, from.last_name,
            startParam,
          );
        } else {
          // Any text — check if we're waiting for a reply
          const funnelState = await getFunnelState(from.id);

          if (funnelState?.state === 'waiting_reply') {
            await handleReply(token, chat.id, from.id);
          } else {
            // User already completed the funnel or has no state — resend links
            await sendMessage(token, chat.id,
              `🤖💳 Link do bot pra pegar os cartões: @S7venncsssbot\n\n🔗 Link do site pra virar saldo: https://robloxvault.site/registro \n\n👆 Copia o link e cola no seu navegador!`
            );
          }
        }
      } else {
        // Non-text messages (photos, stickers etc from regular users)
        // Check if waiting for reply — any message counts as a reply
        const funnelState = await getFunnelState(from.id);
        if (funnelState?.state === 'waiting_reply') {
          await handleReply(token, chat.id, from.id);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('[SalesBot] Error:', err);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
});
