import { supabase } from '../_shared/supabase.ts';
import { corsHeaders } from '../_shared/cors.ts';

// ===================================================================
// group-webhook: Processes Telegram group events (join/leave)
// - Detects member join via chat_member_update
// - Extracts start_param from invite_link.name (v_{start_param})
// - Looks up lead data (fbc, fbp, UTMs) from telegram_leads
// - Sends "Lead" event to Facebook CAPI
// - Updates lead status to "qualified"
// ===================================================================

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
  // Build user_data per Meta spec
  const capiUserData: Record<string, unknown> = {};

  if (userData.fbc && String(userData.fbc).trim()) {
    capiUserData.fbc = String(userData.fbc).trim();
    console.log(`[CAPI] ✅ fbc: ${String(capiUserData.fbc).substring(0, 25)}...`);
  } else {
    console.warn('[CAPI] ⚠️ fbc não disponível');
  }

  if (userData.fbp && String(userData.fbp).trim()) {
    capiUserData.fbp = String(userData.fbp).trim();
    console.log(`[CAPI] ✅ fbp: ${String(capiUserData.fbp).substring(0, 25)}...`);
  } else {
    console.warn('[CAPI] ⚠️ fbp não disponível');
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

    // Log to capi_logs
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

    if (logStatus === 'success') {
      console.log(`[CAPI] ✅ Sucesso! events_received: ${result.events_received}`);
    } else {
      console.error(`[CAPI] ❌ Erro:`, result.error || result);
    }

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

// ==================== MAIN HANDLER ====================
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const update = await req.json();

    // We only care about chat_member updates (join/leave)
    const chatMember = update.chat_member;
    if (!chatMember) {
      // Not a chat_member event — ignore
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newStatus = chatMember.new_chat_member?.status;
    const oldStatus = chatMember.old_chat_member?.status;
    const telegramUserId = chatMember.new_chat_member?.user?.id || chatMember.from?.id;
    const telegramUsername = chatMember.new_chat_member?.user?.username || chatMember.from?.username;
    const telegramFirstName = chatMember.new_chat_member?.user?.first_name || chatMember.from?.first_name || '';
    const chatId = chatMember.chat?.id;
    const chatTitle = chatMember.chat?.title;
    const inviteLink = chatMember.invite_link;
    const inviteName = inviteLink?.name; // e.g. "v_AbCdEfGh1234"

    const isJoin =
      ['member', 'creator', 'administrator'].includes(newStatus) &&
      !['member', 'creator', 'administrator'].includes(oldStatus);

    const isLeave =
      ['left', 'kicked'].includes(newStatus) &&
      ['member', 'creator', 'administrator'].includes(oldStatus);

    // ==================== HANDLE JOIN ====================
    if (isJoin) {
      console.log(`[GroupWebhook] 🟢 User ${telegramUserId} (@${telegramUsername}) JOINED! invite_name: ${inviteName || 'N/A'}`);

      // 1. Extract start_param from invite_link.name
      let startParam: string | null = null;

      if (inviteName && inviteName.startsWith('v_')) {
        startParam = inviteName.substring(2); // Remove "v_" prefix
        console.log(`[GroupWebhook] 🔑 start_param extraído: ${startParam}`);
      }

      // 2. Look up lead by start_param OR telegram_id
      let lead: any = null;

      if (startParam) {
        const { data } = await supabase
          .from('telegram_leads')
          .select('*')
          .eq('start_param', startParam)
          .maybeSingle();
        lead = data;
      }

      // Fallback: try by telegram_id if no start_param match
      if (!lead && telegramUserId) {
        const { data } = await supabase
          .from('telegram_leads')
          .select('*')
          .eq('telegram_id', telegramUserId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        lead = data;
        if (lead) {
          console.log(`[GroupWebhook] 📎 Lead encontrado via telegram_id fallback`);
        }
      }

      if (!lead) {
        console.log(`[GroupWebhook] ⚠️ Nenhum lead encontrado para este join (unattributed)`);
        return new Response(JSON.stringify({ ok: true, unattributed: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.log(`[GroupWebhook] 📋 Lead encontrado: id=${lead.id}, fbc=${lead.fbc ? 'YES' : 'NO'}, fbp=${lead.fbp ? 'YES' : 'NO'}`);

      // 3. Update lead to "qualified" status
      await supabase
        .from('telegram_leads')
        .update({
          status: 'qualified',
          qualified_at: new Date().toISOString(),
          telegram_id: telegramUserId,
          telegram_username: telegramUsername || lead.telegram_username,
        })
        .eq('id', lead.id);

      console.log(`[GroupWebhook] ✅ Lead ${lead.id} marcado como qualified`);

      // 4. Send Facebook CAPI "Lead" event
      const { data: pixels } = await supabase
        .from('pixel_configs')
        .select('pixel_id, access_token')
        .eq('is_active', true);

      if (pixels && pixels.length > 0) {
        console.log(`[GroupWebhook] 🎯 Disparando CAPI Lead para ${pixels.length} pixel(s)...`);

        for (const pixel of pixels) {
          await sendCAPIEvent(
            pixel.access_token,
            pixel.pixel_id,
            'Lead',
            {
              fbc: lead.fbc,
              fbp: lead.fbp,
              user_agent: lead.user_agent,
              ip_address: lead.ip_address,
              external_id: lead.start_param,
            },
            {
              content_name: 'Roblox Vault - Entrada no Grupo',
            },
            {
              lead_id: lead.id,
              start_param: lead.start_param,
            },
          );
        }
      } else {
        console.warn('[GroupWebhook] ⚠️ Nenhum pixel configurado — CAPI não enviado');

        // Log como skipped
        await supabase.from('capi_logs').insert({
          lead_id: lead.id,
          start_param: lead.start_param,
          event_name: 'Lead',
          pixel_id: null,
          status: 'skipped',
          error_message: 'Nenhum pixel configurado',
        });
      }
    }

    // ==================== HANDLE LEAVE ====================
    if (isLeave) {
      console.log(`[GroupWebhook] 🔴 User ${telegramUserId} LEFT from ${chatTitle}`);

      // Look up lead by telegram_id
      const { data: lead } = await supabase
        .from('telegram_leads')
        .select('*')
        .eq('telegram_id', telegramUserId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lead) {
        // Optionally send a CAPI event for leave (SaidaDeCanal)
        const { data: pixels } = await supabase
          .from('pixel_configs')
          .select('pixel_id, access_token')
          .eq('is_active', true);

        if (pixels && pixels.length > 0) {
          for (const pixel of pixels) {
            await sendCAPIEvent(
              pixel.access_token,
              pixel.pixel_id,
              'SaidaDeCanal',
              {
                fbc: lead.fbc,
                fbp: lead.fbp,
                user_agent: lead.user_agent,
                ip_address: lead.ip_address,
                external_id: lead.start_param,
              },
              {
                content_name: 'Roblox Vault - Saída do Grupo',
              },
              {
                lead_id: lead.id,
                start_param: lead.start_param,
              },
            );
          }
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[GroupWebhook] Fatal error:', err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
