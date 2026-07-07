const token = "EAALsC4QBTG0BRZCktQKCCeMQZANZCIlBHbRYdlRcjMB2WsaGReJb5B0bxRXfevcos3CZA1xXkWVcrlRbSa3a4mA0bLPKgCdHY2nrebUUXwyHRnLhJaHwqI10jYbP7yEcAL2SZBZCjSfMUZB6mQbVE0SxUjqCWrFCVFaQvWZCJpdCYZBGdRkQasrki8nQqcH0iberb0QZDZD";
const pixelId = "1045762675040479";

async function hash(str) {
  const { createHash } = await import('crypto');
  return createHash('sha256').update(str.toLowerCase().trim()).digest('hex');
}

async function sendCAPIEvent(eventName, eventId, userData, customData) {
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: eventId,
        user_data: userData,
        custom_data: customData,
      }
    ]
  };

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`;
  
  console.log(`Sending ${eventName} to CAPI:`, JSON.stringify(payload, null, 2));

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    console.log("CAPI Result:", result);
  } catch (err) {
    console.error("CAPI Error:", err);
  }
}

async function run() {
  // Lukas
  const lukasEmail = await hash("silvalukassilva328@gmail.com");
  const lukasPhone = await hash("11999999999");
  await sendCAPIEvent("Purchase", "77166723-6910-401e-9c3a-b41ed464581b", {
    em: [lukasEmail],
    fbc: "fb.1.1776791573785.PAZXh0bgNhZW0BMABhZGlkAasw922lE3xzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAacxxwWnxPrnt7idc30MAmEVmWIE0uzmU37bxTF8o5pRUvQxwo-0tqs2BEOd5A_aem_huZxuWYNe5DNASIkQYaN-w",
    fbp: "fb.1.1776791573786.1883354465",
    client_ip_address: "45.232.59.161",
    client_user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22H340 Instagram 425.0.0.32.59 (iPhone11,6; iOS 18_7_7; pt_BR; pt; scale=3.00; 1125x2436; IABMV/1; 936842409) NW/9 Safari/604.1"
  }, {
    currency: "BRL",
    value: 34.90,
    content_name: "Roblox Seller Pass"
  });

  // Monica Payment 1
  const monicaEmail = await hash("moniicasbaebosa244@gmail.com");
  const monicaPhone = await hash("11999999999");
  await sendCAPIEvent("Purchase", "5978b7c6-d53b-43d4-a102-d7f9978fc857", {
    em: [monicaEmail],
    fbc: "fb.1.1774271147578.PAZXh0bgNhZW0BMABhZGlkAasvrjKayyxzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacR8T6WDLXR6g54aGUf91pJdkAsVLoHBPxQWxlk0bvqzzWiLMZUErl1i83Uow_aem_pwmKnB82cIBBJPcxQ1zrDA",
    fbp: "fb.1.1774271147584.6516202113",
    client_ip_address: "138.118.122.210",
    client_user_agent: "Mozilla/5.0 (Linux; Android 15; moto g35 5G Build/VUOAS35.116-100-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.146 Mobile Safari/537.36 Instagram 421.0.0.51.66 Android (35/15; 298dpi; 1080x2400; motorola; moto g35 5G; manila; ums9620_2h10; pt_BR; 909555821; IABMV/1)"
  }, {
    currency: "BRL",
    value: 34.90,
    content_name: "Roblox Seller Pass"
  });

  // Monica Payment 2
  await sendCAPIEvent("Purchase", "355564e3-27d3-4415-b9b2-f6b45abe2ec0", {
    em: [monicaEmail],
    fbc: "fb.1.1774271147578.PAZXh0bgNhZW0BMABhZGlkAasvrjKayyxzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacR8T6WDLXR6g54aGUf91pJdkAsVLoHBPxQWxlk0bvqzzWiLMZUErl1i83Uow_aem_pwmKnB82cIBBJPcxQ1zrDA",
    fbp: "fb.1.1774271147584.6516202113",
    client_ip_address: "138.118.122.210",
    client_user_agent: "Mozilla/5.0 (Linux; Android 15; moto g35 5G Build/VUOAS35.116-100-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.146 Mobile Safari/537.36 Instagram 421.0.0.51.66 Android (35/15; 298dpi; 1080x2400; motorola; moto g35 5G; manila; ums9620_2h10; pt_BR; 909555821; IABMV/1)"
  }, {
    currency: "BRL",
    value: 22.31,
    content_name: "Taxa de Saque"
  });
}

run();
