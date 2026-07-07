const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const MESSAGE_TEXT = `NOVO Trampo do UNO FUNCIONANDO🤑 \nSaque agora mais de de $ 1.300,00 no PIX com o NOVO Trampo! (03/06)\n\n🎥Clica no botão abaixo e Veja o VÍDEO FIXADO E APROVEITE`;

// File paths
const ENV_PATH = path.join(__dirname, '..', '.env');
const REPORT_PATH = path.join(__dirname, 'broadcast_report.json');

const cleanValue = (val) => val.replace(/['"]/g, '').trim();

async function main() {
  console.log('🔗 Conectando ao Supabase...');
  
  if (!fs.existsSync(ENV_PATH)) {
    console.error('❌ Arquivo .env não encontrado!');
    process.exit(1);
  }

  const envContent = fs.readFileSync(ENV_PATH, 'utf8');
  const supabaseUrlMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
  const supabaseKeyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);

  if (!supabaseUrlMatch || !supabaseKeyMatch) {
    console.error('❌ Não foi possível encontrar VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY no arquivo .env');
    process.exit(1);
  }

  const supabaseUrl = cleanValue(supabaseUrlMatch[1]);
  const supabaseKey = cleanValue(supabaseKeyMatch[1]);

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (!fs.existsSync(REPORT_PATH)) {
    console.error('❌ Relatório de broadcast não encontrado em:', REPORT_PATH);
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
  const successes = report.results.filter(res => res.status === 'success');

  console.log(`📊 Encontrados ${successes.length} logs de envio bem-sucedidos para inserir.`);

  if (successes.length === 0) {
    console.log('✅ Nenhum log para inserir. Concluído.');
    return;
  }

  // Map to Supabase table records
  const records = successes.map(res => ({
    bot_type: 'funnel',
    telegram_chat_id: res.telegram_id,
    telegram_user_id: res.telegram_id,
    telegram_username: res.username || null,
    telegram_name: res.name || null,
    direction: 'outgoing',
    message_type: 'text',
    text_content: MESSAGE_TEXT,
    telegram_message_id: res.message_id
  }));

  // Batch insert in chunks of 200
  const chunkSize = 200;
  let inserted = 0;

  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    console.log(`📤 Inserindo lote de logs ${i + 1} a ${Math.min(i + chunkSize, records.length)}...`);

    const { error } = await supabase
      .from('bot_messages')
      .insert(chunk);

    if (error) {
      console.error('❌ Erro ao inserir lote de logs:', error);
      process.exit(1);
    }

    inserted += chunk.length;
  }

  console.log(`\n✅ Inserção de logs concluída! Total inserido: ${inserted} registros.`);
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
});
