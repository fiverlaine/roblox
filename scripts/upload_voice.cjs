// Script to upload .ogg files as VOICE MESSAGES via Telegram Bot API
// This ensures they appear as voice notes with waveform (not as file attachments)
const fs = require("fs");
const path = require("path");
const https = require("https");

const BOT_TOKEN = "8167305720:AAEGQIfxk2mEfDpGl5ycqebr6C8sw6gTqao";
const CHAT_ID = 687206188; // Ryan's Telegram ID

const files = [
  {
    localPath: path.join(
      __dirname,
      "..",
      "ChatExport_2026-03-11",
      "voice_messages",
      "audio_1@11-03-2026_22-52-21.ogg",
    ),
    stepOrder: 1,
    label: "Audio 1 (15s)",
  },
  {
    localPath: path.join(
      __dirname,
      "..",
      "ChatExport_2026-03-11",
      "voice_messages",
      "audio_2@11-03-2026_22-52-54.ogg",
    ),
    stepOrder: 5,
    label: "Audio 2 (16s)",
  },
];

function sendVoiceUpload(botToken, chatId, filePath) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const boundary =
      "----FormBoundary" + Math.random().toString(36).substring(2);

    // Build multipart form data
    const parts = [];

    // chat_id field
    parts.push(
      `--${boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n${chatId}`,
    );

    // voice file field
    parts.push(
      `--${boundary}\r\nContent-Disposition: form-data; name="voice"; filename="${fileName}"\r\nContent-Type: audio/ogg\r\n\r\n`,
    );

    const header = Buffer.from(parts.join("\r\n") + "\r\n", "utf-8");
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8");
    const body = Buffer.concat([header, fileData, footer]);

    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${botToken}/sendVoice`,
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": body.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log("🎤 Uploading voice messages via Telegram Bot API...\n");

  for (const file of files) {
    console.log(`📤 Sending: ${file.label} (${file.localPath})`);

    if (!fs.existsSync(file.localPath)) {
      console.error(`❌ File not found: ${file.localPath}`);
      continue;
    }

    try {
      const result = await sendVoiceUpload(BOT_TOKEN, CHAT_ID, file.localPath);

      if (result.ok && result.result?.voice) {
        const voiceFileId = result.result.voice.file_id;
        console.log(`✅ ${file.label} → Voice file_id:`);
        console.log(`   ${voiceFileId}`);
        console.log(`   Duration: ${result.result.voice.duration}s`);
        console.log(`   → Use: /setmedia ${file.stepOrder} ${voiceFileId}\n`);
      } else {
        console.error(
          `❌ Error sending ${file.label}:`,
          result.description || result,
        );
      }
    } catch (err) {
      console.error(`❌ Network error for ${file.label}:`, err.message);
    }
  }

  console.log(
    "Done! Copy the file_ids above and use /setmedia in the bot chat.",
  );
}

main();
