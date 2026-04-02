# PRD — Roblox Vault

> **Versão:** 1.0  
> **Data:** 01/04/2026  
> **Autor:** Gerado automaticamente via análise completa do código-fonte

---

## 1. Visão Geral do Produto

**Roblox Vault** é uma plataforma web completa de marketplace de itens Roblox com sistema integrado de:
- Compra e venda de itens/skins Roblox
- Compra de Robux
- Sistema financeiro com carteira (saldo em R$) e saques via PIX
- Funil de vendas via Telegram Bot com rastreamento avançado de leads
- Integração com Facebook CAPI (Conversions API) para otimização de campanhas
- Integração com UTMify para atribuição de marketing
- Sistema de afiliados com tracking independente (Pixel + UTMify por afiliado)
- Notificações push via Pushcut para afiliados
- Painel administrativo completo

**Tagline:** "Compre, Venda e Ganhe"  
**Descrição:** "Compre Robux, adquira skins exclusivas e revenda para ganhar dinheiro real"

---

## 2. Stack Tecnológico

### 2.1 Frontend
| Tecnologia | Versão | Propósito |
|---|---|---|
| **React** | 19.x | Framework UI |
| **Vite** | 7.x | Build tool e dev server |
| **TypeScript** | ~5.9 | Tipagem estática |
| **TailwindCSS** | 4.x | Estilização |
| **React Router DOM** | 7.x | Roteamento SPA |
| **Zustand** | 5.x | Gerenciamento de estado global |
| **Framer Motion** | 12.x | Animações |
| **Recharts** | 3.x | Gráficos no painel admin |
| **Lucide React** | 0.575+ | Ícones |
| **React Hot Toast** | 2.x | Notificações toast |
| **Axios** | 1.x | Requisições HTTP (referência) |

### 2.2 Backend (Supabase)
| Componente | Propósito |
|---|---|
| **Supabase Auth** | Autenticação (email/password) |
| **Supabase Database (PostgreSQL)** | Armazenamento de dados |
| **Supabase Edge Functions (Deno)** | Lógica server-side (webhooks, pagamentos, tracking) |
| **Row Level Security (RLS)** | Controle de acesso no nível de linha |

### 2.3 Serviços Externos
| Serviço | Propósito |
|---|---|
| **ZucroPay** | Gateway de pagamento PIX (principal) |
| **BSPay** | Gateway de pagamento PIX (legado) |
| **Telegram Bot API** | Bot de funil + grupo de vendas |
| **Facebook CAPI** | Envio de eventos de conversão server-side |
| **UTMify** | Plataforma de atribuição de marketing |
| **Pushcut** | Notificações push para iOS |
| **ip-api.com** | Geolocalização por IP |
| **Vercel** | Hospedagem do frontend |

---

## 3. Arquitetura do Sistema

### 3.1 Diagrama de Fluxo Principal

```
Anúncio (Meta/TikTok)
       |
       v
[redirect.html] -- salva UTMs, fbclid, fbc, fbp, IP --> [tracking-save] --> telegram_leads
       |
       v
[Telegram Bot] --> [telegram-bot-webhook] --> Funil de mensagens
       |                                        |
       v                                        v
[Grupo Telegram] --> [group-webhook] --> Facebook CAPI (Lead)
       |
       v
[Plataforma Web] --> Registro --> Compra de Licença/Item
       |                              |
       v                              v
[Pagamento PIX] <-- [create-payment] --> ZucroPay API
       |
       v
[Webhook] --> [zucropay-webhook/bspay-webhook] --> UTMify + Update status
```

### 3.2 Fluxo de Deploy
- **Frontend:** Vite build → Vercel (rewrites configurados no `vercel.json`)
- **Backend:** Edge Functions deployadas no Supabase
- **Banco de dados:** Migrations SQL aplicadas via Supabase CLI/MCP

---

## 4. Banco de Dados — Schema Completo

### 4.1 Tabelas Principais

#### `profiles`
Estende `auth.users` com dados da aplicação.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID (PK → auth.users) | ID do usuário |
| `full_name` | text | Nome completo |
| `email` | text | Email |
| `phone` | text | Telefone |
| `cpf` | text | CPF |
| `robux_balance` | integer | Saldo em Robux |
| `real_balance` | numeric(10,2) | Saldo em R$ |
| `has_seller_pass` | boolean | Se tem licença de vendedor |
| `telegram_username` | text | Username do Telegram |
| `telegram_id` | bigint | ID numérico do Telegram |
| `avatar_url` | text | URL do avatar |
| `role` | text ('user' / 'admin') | Papel do usuário |
| `city` | text | Cidade |
| `state` | text | Estado |
| `is_affiliate` | boolean | Se é afiliado |
| `affiliate_utms` | text[] | UTMs do afiliado (legado) |
| `affiliate_ref` | text | Código único de referência do afiliado |
| `created_at` / `updated_at` | timestamptz | Timestamps |

#### `items`
Catálogo de itens Roblox.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint (PK) | ID do item |
| `name` | text | Nome do item |
| `description` | text | Descrição |
| `image_url` | text | URL da imagem |
| `price_robux` | integer | Preço em Robux |
| `category` | text | Categoria (Hat, Avatar, BackAccessory, FaceAccessory, Gear) |
| `rarity` | text | Raridade (Regular, Rare, Epic, Legendary, Mythic, Limited) |
| `is_featured` | boolean | Se é destaque |
| `is_active` | boolean | Se está ativo |
| `creator` | text | Criador do item |
| `catalog_url` | text | URL do catálogo Roblox |

#### `user_items`
Itens que cada usuário possui.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint (PK) | ID do registro |
| `user_id` | UUID (FK → profiles) | Dono do item |
| `item_id` | bigint (FK → items) | Item referenciado |
| `status` | text ('active' / 'selling' / 'sold') | Status do item |
| `acquired_at` | timestamptz | Data de aquisição |
| `sold_at` | timestamptz | Data de venda |

#### `purchases`
Log de compras de itens.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint (PK) | ID da compra |
| `user_id` | UUID (FK → profiles) | Comprador |
| `item_id` | bigint (FK → items) | Item comprado |
| `price_robux` | integer | Preço pago |
| `payment_method` | text | Método (default: 'card') |
| `card_data` | jsonb | Dados do cartão |
| `status` | text | Status da compra |

#### `payments`
Pagamentos em dinheiro real (PIX).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint (PK) | ID do pagamento |
| `user_id` | UUID (FK → profiles) | Pagador |
| `type` | text ('license' / 'withdrawal_fee') | Tipo do pagamento |
| `amount` | numeric(10,2) | Valor em R$ |
| `status` | text ('pending' / 'paid' / 'failed' / 'refunded') | Status |
| `gateway` | text | Gateway utilizado |
| `transaction_id` | text | TX ID do gateway |
| `pix_qrcode` | text | Código copia-e-cola PIX |
| `pix_expiration` | timestamptz | Expiração do QR Code |
| `external_id` | text (UNIQUE) | ID externo para reconciliação |
| `paid_at` | timestamptz | Data do pagamento |

#### `telegram_leads`
Rastreamento de leads vindos do Telegram.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint (PK) | ID do lead |
| `telegram_id` | bigint | ID do Telegram |
| `telegram_username` | text | Username do Telegram |
| `telegram_name` | text | Nome no Telegram |
| `start_param` | text (UNIQUE) | Parâmetro único de rastreamento |
| `utm_source/medium/campaign/term/content` | text | Parâmetros UTM |
| `affiliate_ref` | text | Referência do afiliado (se houver) |
| `fbclid` | text | Facebook Click ID |
| `fbc` | text | Cookie _fbc do Facebook |
| `fbp` | text | Cookie _fbp do Facebook |
| `ip_address` | text | IP do visitante |
| `user_agent` | text | User-Agent do navegador |
| `city/state/zip_code/country` | text | Dados de geolocalização |
| `user_id` | UUID (FK → profiles) | Usuário vinculado |
| `status` | text ('new' / 'registered' / 'qualified') | Status do lead |
| `funnel_state` | text | Estado no funil do bot |
| `total_paid` | numeric(10,2) | Total pago pelo lead |

#### `gateway_configs`
Configurações de gateways de pagamento.

| Coluna | Tipo | Descrição |
|---|---|---|
| `gateway_name` | text (UNIQUE) | Nome do gateway (zucropay, bspay) |
| `client_id` | text | Client ID / API Key |
| `client_secret` | text | Client Secret / API Secret |
| `api_url` | text | URL base da API |
| `webhook_url` | text | URL do webhook configurado |
| `is_active` | boolean | Se está ativo |

#### `bot_configs`
Configurações do Telegram Bot.

| Coluna | Tipo | Descrição |
|---|---|---|
| `bot_type` | text ('funnel' / 'card') | Tipo do bot |
| `token` | text | Token do bot |
| `welcome_message` | text | Mensagem de boas-vindas |
| `price_per_card` | numeric(10,2) | Preço por cartão (bot card) |
| `free_purchases` | integer | Compras grátis |
| `card_limit` | numeric(10,2) | Limite de cartão |
| `group_link` | text | Link do grupo |
| `group_chat_id` | text | Chat ID do grupo (para invite links) |
| `channel_link` | text | Link do canal |
| `is_active` | boolean | Se está ativo |

#### `funnel_steps`
Steps do funil do bot do Telegram.

| Coluna | Tipo | Descrição |
|---|---|---|
| `step_order` | integer | Ordem do step |
| `message_type` | text ('text' / 'voice' / 'photo' / 'video' / 'sticker') | Tipo de mídia |
| `text_content` | text | Conteúdo textual |
| `file_id` | text | File ID do Telegram |
| `delay_before_ms` | integer | Delay antes de enviar (ms) |
| `wait_for_reply` | boolean | Se espera resposta do usuário |
| `is_active` | boolean | Se está ativo |

#### `pixel_configs`
Configurações do Facebook Pixel (global/owner).

| Coluna | Tipo | Descrição |
|---|---|---|
| `pixel_id` | text | ID do Pixel Meta |
| `access_token` | text | Token de acesso CAPI |
| `is_active` | boolean | Se está ativo |

#### `capi_logs`
Logs de eventos Facebook CAPI e UTMify.

| Coluna | Tipo | Descrição |
|---|---|---|
| `lead_id` | bigint (FK → telegram_leads) | Lead associado |
| `start_param` | text | Start param |
| `event_name` | text | Nome do evento |
| `pixel_id` | text | Pixel utilizado |
| `status` | text ('success' / 'error' / 'skipped') | Status |
| `request_payload` | jsonb | Payload enviado |
| `response_payload` | jsonb | Resposta recebida |
| `error_message` | text | Mensagem de erro |

#### `utmify_configs`
Configurações globais do UTMify.

| Coluna | Tipo | Descrição |
|---|---|---|
| `api_token` | text | Token da API UTMify |
| `platform_name` | text | Nome da plataforma |
| `is_active` | boolean | Se está ativo |

#### `affiliate_tracking_configs`
Configurações de tracking por afiliado (Pixel + UTMify independentes).

| Coluna | Tipo | Descrição |
|---|---|---|
| `user_id` | UUID (FK → profiles) | Afiliado |
| `utmify_api_token` | text | Token UTMify do afiliado |
| `utmify_platform_name` | text | Nome da plataforma no UTMify |
| `pixel_id` | text | Pixel ID do afiliado |
| `pixel_access_token` | text | Token CAPI do afiliado |
| `is_active` | boolean | Se está ativo |

#### `affiliate_notification_configs`
Configurações de notificações Pushcut por afiliado.

| Coluna | Tipo | Descrição |
|---|---|---|
| `user_id` | UUID | Afiliado |
| `pushcut_api_key` | text | API Key do Pushcut |
| `pushcut_notification_name` | text | Nome da notificação |
| `notify_new_lead` | boolean | Notificar novos leads |
| `notify_sale_pending` | boolean | Notificar vendas pendentes |
| `notify_sale_approved` | boolean | Notificar vendas aprovadas |
| `custom_title_*` / `custom_text_*` | text | Títulos/textos personalizados |
| `is_active` | boolean | Se está ativo |

#### `withdrawals`
Registros de saques.

| Coluna | Tipo | Descrição |
|---|---|---|
| `user_id` | UUID | Usuário |
| `amount` | numeric | Valor do saque |
| `fee_amount` | numeric | Valor da taxa |
| `fee_method` | text | Método da taxa ('pix') |
| `pix_key_type` | text | Tipo de chave PIX |
| `pix_key` | text | Chave PIX |
| `status` | text | Status do saque |
| `payment_id` | bigint | Pagamento da taxa associado |

#### `webhook_logs`
Logs brutos de webhooks recebidos.

| Coluna | Tipo | Descrição |
|---|---|---|
| `gateway` | text | Nome do gateway |
| `payload` | jsonb | Payload completo |

#### `admin_settings`
Configurações administrativas key-value.

| Coluna | Tipo | Descrição |
|---|---|---|
| `key` | text (UNIQUE) | Chave da configuração |
| `value` | jsonb | Valor |

### 4.2 Functions SQL

| Função | Propósito |
|---|---|
| `is_admin()` | Verifica se o usuário autenticado é admin |
| `handle_new_user()` | Trigger: cria perfil ao criar auth user |
| `handle_updated_at()` | Trigger: atualiza `updated_at` em modificações |

### 4.3 Row Level Security (RLS)

Todas as tabelas têm RLS habilitado:
- **profiles**: Usuários veem/editam apenas seu próprio perfil; Admin vê todos
- **items**: Todos autenticados veem ativos; Admin gerencia (CRUD)
- **user_items**: Usuários veem seus próprios; Admin vê todos
- **purchases**: Usuários veem suas próprias; Admin vê todas
- **payments**: Usuários veem seus próprios; Admin vê todos
- **telegram_leads**: Somente Admin (+ service role para edge functions)
- **gateway_configs / bot_configs / utmify_configs / admin_settings**: Somente Admin
- **pixel_configs / capi_logs**: Somente Admin

---

## 5. Edge Functions (Supabase)

### 5.1 `tracking-save`
**Propósito:** Salva dados de rastreamento do visitante no banco de dados.

**Fluxo:**
1. Recebe via POST (ou query params): UTMs, fbclid, fbc, fbp, user_agent, IP, ref (afiliado)
2. Gera um `start_param` único de 12 caracteres
3. Insere registro na tabela `telegram_leads` com status `new`
4. Faz geolocalização do IP via ip-api.com (fire-and-forget)
5. Retorna `{ ok: true, start_param }`

### 5.2 `tracking-redirect`
**Propósito:** Alternativa server-side ao tracking-save — captura UTMs via query params e redireciona para o bot do Telegram.

**Fluxo:**
1. Extrai UTMs e fbclid/fbp da URL
2. Insere lead no banco
3. Busca o username do bot via `getMe` da API do Telegram
4. Redireciona (302) para `https://t.me/{botUsername}?start={startParam}`

### 5.3 `telegram-bot-webhook`
**Propósito:** Processa atualizações do Telegram Bot (funil de vendas).

**Funcionalidades:**
- **`/start {param}`**: Inicia o funil de mensagens para o lead
  - Atualiza lead com `telegram_id`, `telegram_username`
  - Busca steps do funil do DB (`funnel_steps`)
  - Envia mensagens sequenciais com delays e ações de chat (typing, recording voice, etc.)
  - Gera link de convite único para o grupo (`createChatInviteLink` com `member_limit: 1`)
  - Suporta `wait_for_reply` para pausar o funil e retomar quando o usuário responde
- **Admin commands** (`/admin`, `/setmedia`, `/settext`): Permitem configurar o funil
- **Tratamento de respostas**: Retoma o funil quando o usuário responde
- **chat_member events**: Detecta entrada no grupo e dispara evento CAPI `Lead`
  - **Roteamento de pixel**: Se lead tem `affiliate_ref`, usa pixel do afiliado; caso contrário, usa pixel global

### 5.4 `group-webhook`
**Propósito:** Processa eventos de entrada/saída do grupo Telegram (webhook separado do bot).

**Fluxo de JOIN:**
1. Extrai `start_param` do `invite_link.name` (prefixo `v_`)
2. Busca lead por `start_param` ou fallback por `telegram_id`
3. Atualiza lead para status `qualified`
4. **Roteamento de pixel CAPI:**
   - Se `affiliate_ref`: usa pixel do afiliado (`affiliate_tracking_configs`)
   - Sem `affiliate_ref`: usa pixels globais (`pixel_configs`)
5. Envia evento `Lead` para Facebook CAPI

**Fluxo de LEAVE:**
- Detecta saída do grupo e envia evento `SaidaDeCanal` (custom event) para CAPI

### 5.5 `create-payment`
**Propósito:** Gera cobranças PIX via ZucroPay.

**Fluxo:**
1. Recebe `user_id`, `type` (license ou withdrawal_fee), `amount`
2. Busca perfil, auth user e gateway config **em paralelo** (gateway com cache de 5 min)
3. Gera CPF válido se o usuário não tem CPF cadastrado
4. Cria cobrança PIX na API ZucroPay
5. Salva pagamento no banco com status `pending`
6. Retorna QR Code (copy-paste + image base64) e dados do pagamento

### 5.6 `zucropay-webhook`
**Propósito:** Processa notificações de pagamento do ZucroPay.

**Fluxo:**
1. Valida o evento recebido (payment.received, charge.paid, etc.)
2. Localiza pagamento por `external_reference` ou `transaction_id`
3. Se não estava pago:
   - Atualiza status para `paid`
   - Se tipo `license`: ativa `has_seller_pass` no perfil
   - Se tipo `withdrawal_fee`: busca withdrawal associado e deduz saldo
4. Atualiza `total_paid` do lead
5. Dispara evento para UTMify via `utmify-event`

### 5.7 `bspay-webhook`
**Propósito:** Processa notificações de pagamento do BSPay (gateway legado).

**Fluxo:** Similar ao `zucropay-webhook`, mas com formato de payload diferente.

### 5.8 `utmify-event`
**Propósito:** Envia eventos de conversão para a plataforma UTMify.

**Fluxo:**
1. Recebe `payment_id`
2. Busca pagamento, perfil e lead
3. **Roteamento de UTMify:**
   - Se lead tem `affiliate_ref`: usa token UTMify do afiliado
   - Sem `affiliate_ref`: usa configuração global
4. Monta payload com: orderId, status, customer data, products, tracking parameters, commission
5. Envia para `https://api.utmify.com.br/api-credentials/orders`
6. Loga resultado na tabela `capi_logs`

### 5.9 `card-bot-webhook`
**Propósito:** Bot de cartões separado (funcionalidade secundária).

### 5.10 `buy-item-with-robux`
**Propósito:** Processa compra de itens usando saldo de Robux server-side.

### 5.11 `_shared/`
Código compartilhado entre Edge Functions:
- **`cors.ts`**: Headers CORS padrão
- **`supabase.ts`**: Cliente Supabase inicializado com service role key

---

## 6. Frontend — Páginas e Componentes

### 6.1 Rotas da Aplicação

#### Rotas Públicas (sem autenticação)
| Rota | Componente | Descrição |
|---|---|---|
| `/login` | `Login.tsx` | Tela de login |
| `/registro` | `Register.tsx` | Tela de cadastro |

#### Rotas Protegidas (requer autenticação)
| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Home.tsx` | Página inicial com itens em destaque |
| `/loja` | `Store.tsx` | Loja completa de itens Roblox |
| `/itens` | `Items.tsx` | Meus itens (inventário) |
| `/perfil` | `Profile.tsx` | Edição de perfil |
| `/comprar-robux` | `BuyRobux.tsx` | Compra de Robux |
| `/licenca` | `SellerPass.tsx` | Compra da licença de vendedor (R$ 34,90) |
| `/carteira` | `Wallet.tsx` | Saldo, saques via PIX |
| `/conta-roblox` | `RobloxAccount.tsx` | Configurações da conta Roblox |
| `/suporte` | `Support.tsx` | Página de suporte |
| `/affiliate` | `Affiliate.tsx` | Painel do afiliado |

#### Rotas Admin (requer role = 'admin')
| Rota | Componente | Descrição |
|---|---|---|
| `/admin` | `Dashboard.tsx` | Dashboard com métricas e gráficos |
| `/admin/gateways` | `Gateways.tsx` | Gerenciar gateways de pagamento |
| `/admin/usuarios` | `Users.tsx` | Gerenciar usuários |
| `/admin/bot-telegram` | `TelegramBot.tsx` | Configurar bots do Telegram |
| `/admin/utmify` | `UtmifyIntegration.tsx` | Configurar UTMify |
| `/admin/analytics-telegram` | `TelegramAnalytics.tsx` | Analytics de leads |
| `/admin/webhooks` | `Webhooks.tsx` | Logs de webhooks |
| `/admin/conversao-gateway` | `ConversionGateway.tsx` | Conversão entre gateways |

### 6.2 Stores (Zustand)

| Store | Arquivo | Responsabilidade |
|---|---|---|
| `useAuthStore` | `authStore.ts` | Autenticação, perfil, saldo |
| `useItemStore` | `itemStore.ts` | Itens da loja, inventário, compra/venda |
| `useWalletStore` | `walletStore.ts` | Pagamentos, licença, taxa de saque |
| `useAdminStore` | `adminStore.ts` | Dashboard, leads, users, configs (admin) |
| `useAffiliateStore` | `affiliateStore.ts` | Leads do afiliado, stats por UTM |
| `useUIStore` | `uiStore.ts` | Estado da UI (menu, mensagens) |

### 6.3 Layout

| Componente | Descrição |
|---|---|
| `AppLayout.tsx` | Layout principal com header + sidebar + bottom nav |
| `AdminLayout.tsx` | Layout do painel admin |
| `Header.tsx` | Cabeçalho da aplicação |
| `SideMenu.tsx` | Menu lateral (sidebar) |
| `BottomNav.tsx` | Navegação inferior (mobile) |
| `MessagesPanel.tsx` | Painel de mensagens/notificações |

### 6.4 Componentes Especiais

| Componente | Descrição |
|---|---|
| `AffiliateNotifications.tsx` | Configuração completa de notificações Pushcut para afiliados |

---

## 7. Funcionalidades Detalhadas

### 7.1 Sistema de Compra de Itens
1. Usuário navega pela loja (paginação de 20 itens, filtro por categoria e busca)
2. Seleciona item e informa dados de "cartão" (simulação)
3. Sistema verifica saldo de Robux
4. Deduz Robux do saldo e cria registros em `purchases` e `user_items`

### 7.2 Sistema de Venda de Itens
1. Usuário marca item como "selling" (status = selling)
2. Valor calculado: `price_robux * 0.046037` (conversão Robux para R$)
3. Saldo em R$ é creditado no perfil
4. Item marcado como "sold"

### 7.3 Licença de Vendedor (Seller Pass)
- **Preço:** R$ 34,90
- **Obrigatória** para realizar saques
- Pagamento via PIX (ZucroPay)
- Ativada automaticamente via webhook ao confirmar pagamento

### 7.4 Sistema de Saques (Carteira)
1. Requer licença de vendedor ativa
2. Valor mínimo: R$ 10,00
3. Usuário informa valor, tipo de chave PIX e chave PIX
4. **Taxa de saque:** R$ 22,00 + centavos aleatórios (1-95)
5. Método: Pagar taxa via PIX separado
6. Fluxo:
   - Gera PIX da taxa via `create-payment`
   - Cria registro em `withdrawals` com `status: pending`
   - Polling a cada 5 segundos para verificar pagamento
   - Quando taxa é paga: deduz saldo e mostra sucesso

### 7.5 Funil do Telegram Bot
1. **Redirect Page** (`redirect.html`):
   - Carrega pixel UTMify
   - Captura UTMs, fbclid, gera fbc/fbp cookies
   - Gera `start_param` único
   - Salva tracking via `tracking-save`
   - Redireciona para o bot (deep link para Android/iOS, web URL fallback)
   - Tratamento especial para TikTok in-app browser

2. **Bot Webhook** recebe `/start {param}`:
   - Vincula lead ao telegram_id
   - Executa steps do funil (configuráveis via DB):
     - Suporta: texto, áudio, foto, vídeo, sticker
     - Delays configuráveis para simular digitação
     - `wait_for_reply` para pausar e esperar resposta
   - Último step envia botão "ENTRAR NO GRUPO" com link de convite único

3. **Entrada no Grupo** (via `group-webhook` ou `telegram-bot-webhook`):
   - Lead marcado como `qualified`
   - Evento `Lead` enviado para Facebook CAPI

### 7.6 Sistema de Afiliados
1. **Habilitação:** Admin marca `is_affiliate = true` e define `affiliate_ref` no perfil
2. **Tracking independente:**
   - Cada afiliado configura seu próprio Pixel Meta e token UTMify
   - Dados salvos em `affiliate_tracking_configs`
3. **Atribuição de leads:**
   - Links de anúncio incluem `?ref={affiliate_ref}`
   - `tracking-save` salva `affiliate_ref` no lead
   - Quando lead converte, eventos são direcionados para o pixel/UTMify do afiliado
4. **Painel do Afiliado:**
   - Métricas: Bot Starters, Group Joiners, Cadastros, Pagantes, Receita Total
   - Tabela detalhada de leads com dados pessoais, pagamentos e status
   - Filtros por data, tipo de pagamento, qualificação e UTM source
   - Exportação CSV
   - Estatísticas por UTM source
5. **Notificações Pushcut:**
   - Alertas em tempo real no celular do afiliado
   - Tipos: Novo Lead, Venda Pendente, Venda Aprovada
   - Mensagens personalizáveis com variáveis ({valor}, {nome}, {utm})
   - Preview em tempo real no painel

### 7.7 Integração Facebook CAPI
- **Evento `Lead`:** Disparado quando usuário entra no grupo Telegram
- **Evento `SaidaDeCanal`:** Disparado quando usuário sai do grupo (custom event)
- **Dados enviados:** fbc, fbp, user_agent, ip_address, external_id (hashed), geolocalização
- **Roteamento:** 
  - Lead com `affiliate_ref` → Pixel do afiliado
  - Lead sem `affiliate_ref` → Pixel(s) global(is)
- **Logging:** Todos os eventos são logados em `capi_logs`

### 7.8 Integração UTMify
- **Evento `paid`:** Disparado quando pagamento PIX é confirmado
- **Dados enviados:** orderId, plataforma, status, customer data, produtos, tracking parameters, commission
- **Roteamento:**
  - Lead com `affiliate_ref` → Token UTMify do afiliado
  - Lead sem `affiliate_ref` → Token UTMify global
- **Deduplicação:** Verifica em `capi_logs` se já existe evento `UTMify_paid` antes de enviar

### 7.9 Painel Administrativo
- **Dashboard:** Total de usuários, leads, pagamentos, receita total, gráfico de receita por dia
- **Gateways:** CRUD de configurações de gateway de pagamento
- **Usuários:** Lista/busca de usuários, edição de perfil (saldos, licença, role, afiliado)
- **Bot Telegram:** Configuração do bot de funil e bot de cartões
- **UTMify:** Configuração da integração UTMify global
- **Analytics Telegram:** Visualização detalhada de leads com filtros
- **Webhooks:** Logs de webhooks recebidos
- **Conversão Gateway:** Ferramenta para converter entre gateways

---

## 8. Preços e Valores

| Item | Valor |
|---|---|
| Licença de Vendedor (Seller Pass) | R$ 34,90 |
| Taxa de saque (base) | R$ 22,00 + centavos aleatórios |
| Conversão Robux para R$ | 1 Robux = R$ 0.046037 |
| Valor mínimo de saque | R$ 10,00 |

---

## 9. Páginas Estáticas

### 9.1 `redirect.html`
Página de redirecionamento para o Telegram bot. Hospedada no frontend (Vercel).
- Captura UTMs + Facebook cookies
- Integra pixel UTMify
- Detecta ambiente (TikTok, in-app browser, Android, iOS)
- Redireciona via deep link ou web URL
- Instruções visuais para usuários do TikTok

### 9.2 `white.html`
Página auxiliar (23KB).

### 9.3 `index.html`
Entry point do SPA React.

---

## 10. Configurações de Deploy

### 10.1 Vercel (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/((?!landing|assets|api).*)", "destination": "/index.html" }
  ]
}
```
Todas as rotas (exceto /landing, /assets, /api) são redirecionadas para index.html (SPA).

### 10.2 Vite (`vite.config.ts`)
- Porta: 3000
- Alias: `@` para `/src`
- Code splitting manual: vendor, ui, charts, supabase

### 10.3 Variáveis de Ambiente
```
VITE_SUPABASE_URL=<URL do projeto Supabase>
VITE_SUPABASE_ANON_KEY=<Anon key do Supabase>
```

---

## 11. Scripts Auxiliares

| Script | Propósito |
|---|---|
| `scripts/seed-products-gen.mjs` | Gerador de seed de produtos |
| `scripts/upload_voice.cjs` | Upload de áudios para o bot |

---

## 12. Documentação Existente

| Arquivo | Conteúdo |
|---|---|
| `documentation/docs_zucropay.md` | Documentação da API ZucroPay |
| `documentation/Doc bspay.md` | Documentação BSPay |
| `documentation/Documentacao API - UTMify.md` | Documentação da API UTMify |
| `documentation/Fluxo BSPay UTMify.md` | Fluxo de integração BSPay + UTMify |
| `documentation/Meta vs API de Conversoes (CAPI).md` | Guia técnico Meta CAPI |
| `documentation/Telegram Bot API Documentacao.md` | Documentação da API do Telegram Bot |
| `documentation/Pushcut.json` | Configuração/documentação Pushcut |

---

## 13. Segurança

- **Autenticação:** Supabase Auth (email/password)
- **Autorização:** RLS em todas as tabelas + verificação `is_admin()` em SQL
- **Rotas protegidas:** `ProtectedRoute` e `AdminRoute` no frontend
- **Edge Functions:** Executam com `service_role` key (bypass RLS quando necessário)
- **Webhooks:** Validam payload e identificam pagamentos por `external_id`
- **Dados sensíveis:** Tokens de API armazenados no banco, acessíveis apenas por admin
- **CAPI:** External IDs são hasheados com SHA-256 antes de envio

---

## 14. Considerações Arquiteturais

### Pontos Fortes
- Separação clara entre frontend (SPA) e backend (Edge Functions)
- RLS robusto em todas as tabelas
- Sistema de afiliados com tracking completamente independente
- Deduplicação de eventos UTMify
- Geolocalização fire-and-forget (não bloqueia o fluxo)
- Cache de configuração de gateway nas Edge Functions
- Código splitting otimizado no build

### Pontos de Atenção
- Lógica de saldo faz update direto no perfil (sem transações atômicas no nível do banco)
- Funções de venda (`sellItem`) fazem deduções de saldo via `update` direto (risco de race condition)
- BSPay e ZucroPay webhooks possuem lógica duplicada — poderiam ser consolidados
- `card-bot-webhook` é uma funcionalidade mais complexa (17KB) com escopo separado
- Uso de `generateValidCPF()` em múltiplos locais para gerar CPFs fake quando ausentes
