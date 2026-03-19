import { supabase } from '../_shared/supabase.ts';

// ====== IP Geolocation (background, fail-safe) ======
// Uses ip-api.com (free: 45 req/min). If it fails for ANY reason, we skip silently.
async function lookupGeoAndUpdate(ipAddress: string, startParam: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout max

    const res = await fetch(
      `http://ip-api.com/json/${ipAddress}?fields=status,city,regionName,zip,country`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);

    if (!res.ok) {
      console.log(`[tracking-save] Geo lookup HTTP ${res.status} — skipped`);
      return;
    }

    const geo = await res.json();

    if (geo.status !== 'success') {
      console.log(`[tracking-save] Geo lookup failed for IP ${ipAddress} — skipped`);
      return;
    }

    const updates: Record<string, string> = {};
    if (geo.city) updates.city = geo.city;
    if (geo.regionName) updates.state = geo.regionName;
    if (geo.zip) updates.zip_code = geo.zip;
    if (geo.country) updates.country = geo.country;

    if (Object.keys(updates).length > 0) {
      await supabase
        .from('telegram_leads')
        .update(updates)
        .eq('start_param', startParam);

      console.log(`[tracking-save] Geo saved: ${geo.city}, ${geo.regionName} ${geo.zip} (${geo.country})`);
    }
  } catch (err) {
    // Completely silent — geo is optional, never blocks anything
    console.log(`[tracking-save] Geo lookup skipped: ${String(err).substring(0, 80)}`);
  }
}

// Lightweight edge function - saves tracking data with CAPI-ready fields
// Captures: UTMs, fbclid, fbc, fbp, ip_address, user_agent + geo (background)
Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    let data: Record<string, string | null> = {};

    if (req.method === 'POST') {
      try {
        data = await req.json();
      } catch {
        const url = new URL(req.url);
        data = Object.fromEntries(url.searchParams.entries());
      }
    } else {
      const url = new URL(req.url);
      data = Object.fromEntries(url.searchParams.entries());
    }

    // Generate start_param if not provided
    let startParam = data.start_param;
    if (!startParam) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      startParam = '';
      for (let i = 0; i < 12; i++) {
        startParam += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    // Extract IP from request headers (Supabase Edge Functions set these)
    const ipAddress = data.ip_address ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      null;

    const { error } = await supabase
      .from('telegram_leads')
      .insert({
        start_param: startParam,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_term: data.utm_term || null,
        utm_content: data.utm_content || null,
        fbclid: data.fbclid || null,
        fbc: data.fbc || null,
        fbp: data.fbp || null,
        ip_address: ipAddress,
        user_agent: data.user_agent || req.headers.get('user-agent') || null,
        status: 'new',
      });

    if (error) {
      console.error('Failed to save tracking data:', error);
    } else {
      console.log(`[tracking-save] Lead saved: ${startParam} | fbc: ${data.fbc ? 'YES' : 'NO'} | fbp: ${data.fbp ? 'YES' : 'NO'}`);

      // Fire-and-forget: geo lookup in background AFTER lead is saved
      // This NEVER blocks the response or affects the redirect
      if (ipAddress && ipAddress !== '0.0.0.0') {
        lookupGeoAndUpdate(ipAddress, startParam).catch(() => {});
      }
    }

    return new Response(
      JSON.stringify({ ok: true, start_param: startParam }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (err) {
    console.error('tracking-save error:', err);
    return new Response(
      JSON.stringify({ ok: false }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }
});
