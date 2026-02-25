import { corsHeaders } from '../_shared/cors.ts';
import { supabase } from '../_shared/supabase.ts';
import { randomBytes, randomInt } from 'node:crypto';

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    from: { id: number; username?: string; first_name?: string };
    text?: string;
  };
  callback_query?: {
    id: string;
    from: { id: number; username?: string; first_name?: string };
    message: { chat: { id: number }; message_id: number };
    data: string;
  };
}

const CARD_TYPES = [
  'INFINITE',
  'PLATINUM',
  'GOLD',
  'CLASSIC',
  'STANDARD',
  'BLACK',
  'BUSINESS',
  'SIGNATURE',
] as const;

const BRAZILIAN_BANKS = [
  'Banco do Brasil',
  'Bradesco',
  'Itaú Unibanco',
  'Santander Brasil',
  'Caixa Econômica Federal',
  'Nubank',
  'Inter',
  'BTG Pactual',
  'Safra',
  'Sicoob',
  'C6 Bank',
  'PagBank',
  'Original',
  'Banrisul',
  'Votorantim',
];

const FIRST_NAMES = [
  'Ana', 'Maria', 'João', 'Pedro', 'Lucas', 'Carlos', 'Fernanda',
  'Juliana', 'Rafael', 'Gabriel', 'Marcos', 'Paulo', 'Beatriz',
  'Amanda', 'Rodrigo', 'Bruno', 'Larissa', 'Thiago', 'Camila', 'Felipe',
  'Matheus', 'Isabela', 'Gustavo', 'Letícia', 'Daniel', 'Mariana',
  'Leonardo', 'Aline', 'Vinícius', 'Natália',
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira',
  'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Melo', 'Barbosa',
  'Ribeiro', 'Martins', 'Carvalho', 'Gomes', 'Rocha', 'Pereira',
  'Costa', 'Lopes', 'Moreira', 'Dias', 'Monteiro', 'Teixeira',
  'Mendes', 'Correia', 'Nunes', 'Vieira', 'Cardoso', 'Pinto',
];

async function getBotConfig() {
  const { data } = await supabase
    .from('bot_configs')
    .select('*')
    .eq('bot_type', 'card')
    .eq('is_active', true)
    .single();
  return data;
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

async function editMessage(
  token: string,
  chatId: number,
  messageId: number,
  text: string,
  replyMarkup?: Record<string, unknown>,
): Promise<void> {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: 'HTML',
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function answerCallbackQuery(
  token: string,
  callbackQueryId: string,
  text?: string,
): Promise<void> {
  const body: Record<string, unknown> = { callback_query_id: callbackQueryId };
  if (text) body.text = text;
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function randomDigits(n: number): string {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += String(randomInt(0, 10));
  }
  return result;
}

function generateCardNumber(): string {
  const prefixes = ['4', '5'];
  const prefix = prefixes[randomInt(0, prefixes.length)];
  const remaining = randomDigits(15);
  const full = prefix + remaining;
  return `${full.slice(0, 4)} ${full.slice(4, 8)} ${full.slice(8, 12)} ${full.slice(12, 16)}`;
}

function generateExpiry(): string {
  const month = randomInt(1, 13);
  const currentYear = new Date().getFullYear() % 100;
  const year = currentYear + randomInt(1, 6);
  return `${String(month).padStart(2, '0')}/${String(year).padStart(2, '0')}`;
}

function generateCVV(): string {
  return randomDigits(3);
}

function generateName(): string {
  const first = FIRST_NAMES[randomInt(0, FIRST_NAMES.length)];
  const last = LAST_NAMES[randomInt(0, LAST_NAMES.length)];
  return `${first} ${last}`;
}

function generateCPF(): string {
  return `${randomDigits(3)}.${randomDigits(3)}.${randomDigits(3)}-${randomDigits(2)}`;
}

function generateDOB(): string {
  const year = randomInt(1960, 2004);
  const month = randomInt(1, 13);
  const day = randomInt(1, 29);
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function getBrand(cardNumber: string): string {
  const first = cardNumber[0];
  if (first === '4') return 'VISA';
  if (first === '5') return 'MASTERCARD';
  return 'OUTROS';
}

async function getFreePurchasesRemaining(
  telegramId: number,
  maxFree: number,
): Promise<number> {
  const key = `card_purchases_${telegramId}`;
  const { data } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  const used = data?.value?.count ?? 0;
  return Math.max(0, maxFree - used);
}

async function incrementPurchaseCount(telegramId: number): Promise<void> {
  const key = `card_purchases_${telegramId}`;
  const { data } = await supabase
    .from('admin_settings')
    .select('*')
    .eq('key', key)
    .maybeSingle();

  if (data) {
    const currentCount = data.value?.count ?? 0;
    await supabase
      .from('admin_settings')
      .update({ value: { count: currentCount + 1 } })
      .eq('key', key);
  } else {
    await supabase
      .from('admin_settings')
      .insert({ key, value: { count: 1 } });
  }
}

function showMainMenu(token: string, chatId: number): Promise<void> {
  return sendMessage(
    token,
    chatId,
    '<b>Seja bem-vindo a maior base de ccs do Brasil!</b>\n\nEscolha uma opção abaixo:',
    {
      inline_keyboard: [
        [{ text: '💳 Compre Aqui', callback_data: 'buy_cards' }],
        [{ text: '💎 Adicione Saldo', callback_data: 'add_balance' }],
        [{ text: '📁 Carteira', callback_data: 'wallet' }],
      ],
    },
  );
}

function showCardTypes(
  token: string,
  chatId: number,
  messageId: number,
): Promise<void> {
  const keyboard = CARD_TYPES.map((type) => [
    { text: `💳 ${type}`, callback_data: `level_${type}` },
  ]);
  keyboard.push([{ text: '🔙 Voltar', callback_data: 'main_menu' }]);

  return editMessage(
    token,
    chatId,
    messageId,
    '<b>Escolha o tipo de cartão:</b>',
    { inline_keyboard: keyboard },
  );
}

function showPurchaseConfirmation(
  token: string,
  chatId: number,
  messageId: number,
  cardType: string,
): Promise<void> {
  return editMessage(
    token,
    chatId,
    messageId,
    `<b>Cartão ${cardType}</b>\n\n⚠️ Compra gratuita — a cc gerada é apenas para fins educacionais.\n\nDeseja confirmar?`,
    {
      inline_keyboard: [
        [
          { text: '✅ Confirmar', callback_data: `confirm_buy_${cardType}` },
          { text: '❌ Cancelar', callback_data: 'buy_cards' },
        ],
      ],
    },
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const update: TelegramUpdate = await req.json();
    const config = await getBotConfig();

    if (!config?.token) {
      console.error('Card bot token not configured');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = config.token;

    if (update.message?.text) {
      const text = update.message.text;
      const chatId = update.message.chat.id;

      if (text.startsWith('/start')) {
        await showMainMenu(token, chatId);
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (update.callback_query) {
      const cbq = update.callback_query;
      const chatId = cbq.message.chat.id;
      const messageId = cbq.message.message_id;
      const data = cbq.data;

      await answerCallbackQuery(token, cbq.id);

      if (data === 'main_menu') {
        await editMessage(
          token,
          chatId,
          messageId,
          '<b>Seja bem-vindo a maior base de ccs do Brasil!</b>\n\nEscolha uma opção abaixo:',
          {
            inline_keyboard: [
              [{ text: '💳 Compre Aqui', callback_data: 'buy_cards' }],
              [{ text: '💎 Adicione Saldo', callback_data: 'add_balance' }],
              [{ text: '📁 Carteira', callback_data: 'wallet' }],
            ],
          },
        );
      } else if (data === 'buy_cards') {
        await showCardTypes(token, chatId, messageId);
      } else if (data === 'add_balance') {
        await editMessage(
          token,
          chatId,
          messageId,
          '<b>💎 Adicionar Saldo</b>\n\nEm breve essa função estará disponível!',
          {
            inline_keyboard: [
              [{ text: '🏠 Menu Principal', callback_data: 'main_menu' }],
            ],
          },
        );
      } else if (data === 'wallet') {
        const remaining = await getFreePurchasesRemaining(
          cbq.from.id,
          config.free_purchases,
        );
        await editMessage(
          token,
          chatId,
          messageId,
          `<b>📁 Carteira</b>\n\nCompras gratuitas restantes: <b>${remaining}</b>\nSaldo: <b>R$ 0,00</b>`,
          {
            inline_keyboard: [
              [{ text: '🏠 Menu Principal', callback_data: 'main_menu' }],
            ],
          },
        );
      } else if (data.startsWith('level_')) {
        const cardType = data.replace('level_', '');
        await showPurchaseConfirmation(token, chatId, messageId, cardType);
      } else if (data.startsWith('confirm_buy_')) {
        const cardType = data.replace('confirm_buy_', '');
        const remaining = await getFreePurchasesRemaining(
          cbq.from.id,
          config.free_purchases,
        );

        const isFree = remaining > 0;

        const cardNumber = generateCardNumber();
        const holderName = generateName();
        const expiry = generateExpiry();
        const cvv = generateCVV();
        const bank = BRAZILIAN_BANKS[randomInt(0, BRAZILIAN_BANKS.length)];
        const brand = getBrand(cardNumber);
        const bin = cardNumber.replace(/\s/g, '').slice(0, 6);

        const cpf = isFree ? '███.███.███-██' : generateCPF();
        const dob = isFree ? '██/██/████' : generateDOB();
        const address = isFree
          ? '███████████████'
          : `Rua ${LAST_NAMES[randomInt(0, LAST_NAMES.length)]}, ${randomInt(1, 9999)}`;

        await incrementPurchaseCount(cbq.from.id);

        const message = [
          `<b>💳 Cartão ${cardType}</b>`,
          '',
          `<b>Número:</b> <code>${cardNumber}</code>`,
          `<b>Titular:</b> ${holderName}`,
          `<b>Validade:</b> ${expiry}`,
          `<b>CVV:</b> ${cvv}`,
          `<b>Banco:</b> ${bank}`,
          `<b>Bandeira:</b> ${brand}`,
          `<b>BIN:</b> ${bin}`,
          '',
          `<b>CPF:</b> ${cpf}`,
          `<b>Nascimento:</b> ${dob}`,
          `<b>Endereço:</b> ${address}`,
          '',
          isFree
            ? `🆓 Compra gratuita (restam ${remaining - 1})`
            : '💰 Compra paga',
        ].join('\n');

        await editMessage(token, chatId, messageId, message, {
          inline_keyboard: [
            [
              { text: '🔄 Comprar Outro', callback_data: 'buy_cards' },
              { text: '🏠 Menu Principal', callback_data: 'main_menu' },
            ],
          ],
        });
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('card-bot-webhook error:', err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
