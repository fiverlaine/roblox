import { supabase } from '../_shared/supabase.ts';
import { randomBytes } from 'node:crypto';

function generateStartParam(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

Deno.serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmTerm = params.get('utm_term');
    const utmContent = params.get('utm_content');
    const fbclid = params.get('fbclid');
    const fbp = params.get('fbp');

    const startParam = generateStartParam();

    const { error: insertError } = await supabase
      .from('telegram_leads')
      .insert({
        start_param: startParam,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        fbclid,
        fbp,
        status: 'new',
      });

    if (insertError) {
      console.error('Failed to insert telegram lead:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create tracking record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { data: botConfig } = await supabase
      .from('bot_configs')
      .select('token')
      .eq('bot_type', 'funnel')
      .eq('is_active', true)
      .single();

    let botUsername = 'RobloxVaultBot';

    if (botConfig?.token) {
      try {
        const meRes = await fetch(
          `https://api.telegram.org/bot${botConfig.token}/getMe`,
        );
        const meData = await meRes.json();
        if (meData.ok && meData.result?.username) {
          botUsername = meData.result.username;
        }
      } catch (_) {
        console.error('Failed to fetch bot username, using default');
      }
    }

    const redirectUrl = `https://t.me/${botUsername}?start=${startParam}`;

    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  } catch (err) {
    console.error('tracking-redirect error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
