const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const BOT_TOKEN = '8167305720:AAEGQIfxk2mEfDpGl5ycqebr6C8sw6gTqao';
const MESSAGE_TEXT = `NOVO Trampo do UNO FUNCIONANDO🤑 \nSaque agora mais de de $ 1.300,00 no PIX com o NOVO Trampo! (03/06)\n\n🎥Clica no botão abaixo e Veja o VÍDEO FIXADO E APROVEITE`;
const REPLY_MARKUP = {
  inline_keyboard: [
    [
      {
        text: 'CLIQUE AQUI PARA ENTRAR',
        url: 'https://t.me/+unDFdWqL5ck5ZmFh'
      }
    ]
  ]
};

// Test users
const TEST_USERS = [
  { telegram_id: 8154927441, username: 'pedrozutti', name: 'Pedro Zutti' },
  { telegram_id: 687206188, username: 'ryanpazevedo', name: 'Ryan' }
];

// File paths
const RAW_OUTPUT_PATH = 'C:\\Users\\ryanc\\.gemini\\antigravity-ide\\brain\\67e76f77-dd82-45ab-8398-f0cc59e89462\\.system_generated\\steps\\61\\output.txt';
const USERS_JSON_PATH = path.join(__dirname, 'users.json');
const REPORT_PATH = path.join(__dirname, 'broadcast_report.json');
const SQL_LOGS_PATH = path.join(__dirname, 'insert_broadcast_logs.sql');

// Helper to wait
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to send message via Telegram Bot API
function sendTelegramMessage(chatId, text, replyMarkup) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, ok: json.ok, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, ok: false, error: e.message, raw: data });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 500, ok: false, error: err.message });
    });

    // Timeout of 10s
    req.setTimeout(10000, () => {
      req.destroy(new Error('Timeout'));
    });

    req.write(payload);
    req.end();
  });
}

// Function to extract users from raw output.txt
function extractUsers() {
  console.log('🔍 Tentando ler e extrair usuários do arquivo de output...');
  if (!fs.existsSync(RAW_OUTPUT_PATH)) {
    if (fs.existsSync(USERS_JSON_PATH)) {
      console.log('✅ Arquivo users.json já existe. Usando ele.');
      return JSON.parse(fs.readFileSync(USERS_JSON_PATH, 'utf8'));
    }
    console.error(`❌ Arquivo raw output não encontrado em: ${RAW_OUTPUT_PATH}`);
    process.exit(1);
  }

  try {
    const rawContent = fs.readFileSync(RAW_OUTPUT_PATH, 'utf8');
    let parsedContent;
    try {
      const parsedJson = JSON.parse(rawContent);
      parsedContent = parsedJson.result || rawContent;
    } catch (_) {
      parsedContent = rawContent;
    }

    const startIndex = parsedContent.indexOf('[');
    const endIndex = parsedContent.lastIndexOf(']');
    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
      throw new Error('Não foi possível encontrar o array JSON de usuários na resposta.');
    }
    const jsonArrayStr = parsedContent.substring(startIndex, endIndex + 1);
    const users = JSON.parse(jsonArrayStr);
    console.log(`✅ Extraídos ${users.length} usuários únicos.`);
    fs.writeFileSync(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf8');
    console.log(`✅ Salvo em: ${USERS_JSON_PATH}`);
    return users;
  } catch (error) {
    console.error('❌ Erro ao extrair usuários:', error.message);
    process.exit(1);
  }
}

// Main execution function
async function run() {
  const mode = process.argv[2];
  if (!mode || (mode !== 'test' && mode !== 'live')) {
    console.log('❌ Modo inválido ou não especificado!');
    console.log('Uso:');
    console.log('  node scripts/broadcast.cjs test   -> Envia mensagens para os usuários de teste');
    console.log('  node scripts/broadcast.cjs live   -> Envia mensagens para TODOS os usuários');
    process.exit(1);
  }

  let targetUsers = [];

  if (mode === 'test') {
    console.log('🧪 Executando em MODO DE TESTE...');
    targetUsers = TEST_USERS;
  } else {
    console.log('🚀 Executando em MODO LIVE (PRODUÇÃO)...');
    targetUsers = extractUsers();
  }

  const total = targetUsers.length;
  console.log(`Total de envios personalizados planejado: ${total}`);

  const report = {
    started_at: new Date().toISOString(),
    mode: mode,
    total_targeted: total,
    successful: 0,
    failed: 0,
    results: []
  };

  const sqlStatements = [];
  sqlStatements.push('-- Script de inserção dos logs de envio do broadcast');
  sqlStatements.push('BEGIN;');

  for (let i = 0; i < total; i++) {
    const user = targetUsers[i];
    const chatId = user.telegram_id;
    const name = user.name || null;
    const username = user.username || null;

    console.log(`[${i + 1}/${total}] Enviando para ${chatId} (${name || 'Sem Nome'} / @${username || 'sem_user'})...`);

    const result = await sendTelegramMessage(chatId, MESSAGE_TEXT, REPLY_MARKUP);

    if (result.ok && result.data && result.data.ok) {
      report.successful++;
      const messageId = result.data.result.message_id;
      
      report.results.push({
        telegram_id: chatId,
        username: username,
        name: name,
        status: 'success',
        message_id: messageId
      });

      // Escape text content for SQL
      const escapedText = MESSAGE_TEXT.replace(/'/g, "''");
      const escapedName = name ? name.replace(/'/g, "''") : null;
      const sqlNameVal = escapedName ? `'${escapedName}'` : 'NULL';
      const sqlUserVal = username ? `'${username}'` : 'NULL';

      sqlStatements.push(
        `INSERT INTO bot_messages (bot_type, telegram_chat_id, telegram_user_id, telegram_username, telegram_name, direction, message_type, text_content, telegram_message_id) ` +
        `VALUES ('funnel', ${chatId}, ${chatId}, ${sqlUserVal}, ${sqlNameVal}, 'outgoing', 'text', '${escapedText}', ${messageId});`
      );
    } else {
      report.failed++;
      const errMsg = result.error || (result.data ? result.data.description : 'Erro desconhecido');
      console.error(`❌ Falha no chat ${chatId}: ${errMsg}`);
      
      report.results.push({
        telegram_id: chatId,
        username: username,
        name: name,
        status: 'failed',
        error: errMsg
      });
    }

    // Rate limiting delay (80ms in live mode, 1000ms in test mode)
    if (mode === 'live') {
      await delay(80);
    } else {
      await delay(1000);
    }
  }

  sqlStatements.push('COMMIT;');
  report.completed_at = new Date().toISOString();

  // Write files
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  fs.writeFileSync(SQL_LOGS_PATH, sqlStatements.join('\n'), 'utf8');

  console.log('\n=============================================');
  console.log(`🎉 BROADCAST CONCLUÍDO em modo: ${mode.toUpperCase()}`);
  console.log(`✅ Sucessos: ${report.successful}`);
  console.log(`❌ Falhas: ${report.failed}`);
  console.log(`📊 Total: ${report.successful + report.failed}/${report.total_targeted}`);
  console.log(`📝 Relatório salvo em: ${REPORT_PATH}`);
  console.log(`💾 Logs SQL salvos em: ${SQL_LOGS_PATH}`);
  console.log('=============================================\n');
}

run().catch((err) => {
  console.error('Fatal error running broadcast script:', err);
});
