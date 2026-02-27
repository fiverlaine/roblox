import { supabase } from '../_shared/supabase.ts';

// Lightweight edge function - saves tracking data with CAPI-ready fields
// Captures: UTMs, fbclid, fbc, fbp, ip_address, user_agent
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

    const insertPromise = supabase
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

    // Respond immediately
    const response = new Response(
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

    const { error } = await insertPromise;
    if (error) {
      console.error('Failed to save tracking data:', error);
    } else {
      console.log(`[tracking-save] Lead saved: ${startParam} | fbc: ${data.fbc ? 'YES' : 'NO'} | fbp: ${data.fbp ? 'YES' : 'NO'}`);
    }

    return response;
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
