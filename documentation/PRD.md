# PRD — Roblox Vault

> **Versão:** 3.0
> **Data:** 06/04/2026
> **Autor:** Documento atualizado via análise completa do repositório `roblox-vault` + inspeção ao vivo do projeto Supabase **Roblox** via MCP (tabelas, migrações aplicadas, Edge Functions ativas e dados em produção).

---

## 0. Snapshot Supabase (produção — MCP)

| Campo | Valor |
|---|---|
| **Nome do projeto** | Roblox |
| **Project ref / ID** | `eopofvyigdokxatoijzt` |
| **Região** | `us-west-2` |
| **Status** | ACTIVE_HEALTHY |
| **PostgreSQL** | 17.6.1.063 (engine 17, release channel: ga) |
| **URL pública** | `https://eopofvyigdokxatoijzt.supabase.co` |

### 0.1 Volume de dados em produção (contagem real — 06/04/2026)

| Tabela | Linhas |
|---|---|
| `auth.users` | **473** |
| `public.profiles` | **471** |
| `public.user_roles` | **471** |
| `public.items` | **220** |
| `public.user_items` | **377** |
| `public.purchases` | **377** |
| `public.payments` (total) | **564** |
| `public.payments` (status=paid) | **129** |
| **Receita total confirmada** | **R$ 3.954,66** |
| `public.telegram_leads` | **4.854** |
| `public.capi_logs` | **1.972** |
| `public.generated_cards` | **1.194** |
| `public.withdrawals` | **167** |
| `public.webhook_logs` | **325** |
| `public.admin_settings` | **412** (maioria: `card_purchases_{telegram_id}`) |
| `public.funnel_steps` | **9** (1 ativo) |
| `public.gateway_configs` | **1** |
| `public.bot_configs` | **2** (funnel + card) |
| `public.pixel_configs` | **2** |
| `public.utmify_configs` | **1** |
| `public.affiliate_tracking_configs` | **1** |
| `public.affiliate_notification_configs` | **1** |

### 0.2 Migrações registradas no banco (ordem aplicada)

| # | Versão | Nome |
|---|---|---|
| 1 | 20260225002347 | `initial_schema` |
| 2 | 20260225002406 | `rls_policies` |
| 3 | 20260225002429 | `seed_items` |
| 4 | 20260225002738 | `add_missing_fk_index` |
| 5 | 20260225212717 | `create_generated_cards` |
| 6 | 20260225215803 | `fix_function_search_path` |
| 7 | 20260226045114 | `create_withdrawals_table` |
| 8 | 20260226055925 | `create_webhook_logs` |
| 9 | 20260227212551 | `add_group_tracking_infrastructure` |
| 10 | 20260302181316 | `add_telegram_name_to_leads` |
| 11 | 20260312015930 | `create_funnel_media_bucket_and_state` |
| 12 | 20260312020931 | `create_funnel_steps_table_v2` |
| 13 | 20260313023442 | `add_affiliate_columns_to_profiles` |
| 14 | 20260318223413 | `update_payments_gateway_default_to_zucropay` |
| 15 | 20260319184543 | `add_geo_columns_to_telegram_leads` |
| 16 | 20260319220018 | `create_affiliate_notification_configs` |
| 17 | 20260319220105 | `create_pushcut_triggers` |
| 18 | 20260331022643 | `add_affiliate_ref_columns` |
| 19 | 20260331022653 | `create_affiliate_tracking_configs` |
| 20 | 20260401132101 | `fix_rls_block_role_escalation` |
| 21 | 20260401133058 | `lockdown_gateway_configs` |
| 22 | 20260403035530 | `add_saque_recusado_fraude` |
| 23 | 20260403035747 | `rpc_delete_user` |

### 0.3 Edge Functions implantadas (remoto — estado atual)

Todas com `verify_jwt: false` (lógica de auth interna ou server-to-server).

| Slug | Versão | Status | No repositório local |
|---|---|---|---|
| `create-payment` | 24 | ACTIVE | ✅ Sim |
| `bspay-webhook` | 13 | ACTIVE | ✅ Sim |
| `utmify-event` | 11 | ACTIVE | ✅ Sim |
| `tracking-redirect` | 4 | ACTIVE | ✅ Sim |
| `telegram-bot-webhook` | 14 | ACTIVE | ✅ Sim |
| `card-bot-webhook` | 13 | ACTIVE | ✅ Sim |
| `validate-card-purchase` | 5 | ACTIVE | ✅ Sim |
| `buy-item-with-robux` | 3 | ACTIVE | ✅ Sim |
| `tracking-save` | 5 | ACTIVE | ✅ Sim |
| `group-webhook` | 5 | ACTIVE | ✅ Sim |
| `zucropay-webhook` | 3 | ACTIVE | ✅ Sim |
| `pushcut-notify` | 3 | ACTIVE | ⚠️ **Não** (só no remoto) |

---

## 1. Visão Geral do Produto

**Roblox Vault** é uma plataforma web completa de marketplace de itens Roblox com sistema integrado de:
- Compra e venda de itens/skins Roblox via saldo de Robux
- Compra de Robux
- Sistema financeiro com carteira (saldo em R$) e saques via PIX
- Funil de vendas via Telegram Bot com rastreamento avançado de leads
- Integração com Facebook CAPI (Conversions API) para otimização de campanhas
- Integração com UTMify para atribuição de marketing
- Sistema de afiliados com tracking completamente independente (Pixel + UTMify por afiliado)
- Notificações push via Pushcut para afiliados
- Bot de cartões (funcionalidade paralela ao bot de funil)
- Painel administrativo completo com relatório global de leads
- Sistema antifraude com bloqueio de conta e fluxo de contestação via web

**Tagline:** "Compre, Venda e Ganhe"
**Descrição:** "Compre Robux, adquira skins exclusivas e revenda para ganhar dinheiro real"

---

## 2. Stack Tecnológico

### 2.1 Frontend

| Tecnologia | Versão (package.json) | Propósito |
|---|---|---|
| **React** | ^19.2.4 | Framework UI |
| **Vite** | ^7.3.1 | Build tool e dev server |
| **TypeScript** | ~5.9.3 | Tipagem estática |
| **TailwindCSS** | ^4.2.1 | Estilização (via `@tailwindcss/vite`) |
| **React Router DOM** | ^7.13.1 | Roteamento SPA |
| **Zustand** | ^5.0.11 | Gerenciamento de estado global |
| **Framer Motion** | ^12.34.3 | Animações |
| **Recharts** | ^3.7.0 | Gráficos no painel admin |
| **Lucide React** | ^0.575.0 | Ícones |
| **React Hot Toast** | ^2.6.0 | Notificações toast |
| **Axios** | ^1.13.5 | Requisições HTTP |
| **@supabase/supabase-js** | ^2.97.0 | Cliente Supabase |

### 2.2 Backend (Supabase)

| Componente | Propósito |
|---|---|
| **Supabase Auth** | Autenticação (email/password) |
| **Supabase Database (PostgreSQL 17)** | Armazenamento de dados |
| **Supabase Edge Functions (Deno)** | Lógica server-side (webhooks, pagamentos, tracking) |
| **Row Level Security (RLS)** | Controle de acesso no nível de linha |

### 2.3 Serviços Externos

| Serviço | Propósito |
|---|---|
| **ZucroPay** | Gateway de pagamento PIX (principal, gateway padrão desde migração 14) |
| **BSPay** | Gateway de pagamento PIX (legado) |
| **Telegram Bot API** | Bot de funil (vendas) + Bot de cartões |
| **Facebook CAPI** | Envio de eventos de conversão server-side |
| **UTMify** | Plataforma de atribuição de marketing |
| **Pushcut** | Notificações push iOS para afiliados |
| **ip-api.com** | Geolocalização por IP (fire-and-forget) |
| **Vercel** | Hospedagem do frontend |

---

## 3. Arquitetura do Sistema

### 3.1 Diagrama de Fluxo Principal

```
Anúncio (Meta/TikTok/etc)
       |
       v
[redirect.html] -- salva UTMs, fbclid, fbc, fbp, IP, ref --> [tracking-save] --> telegram_leads
       |
       v
[Telegram Bot] <-- [telegram-bot-webhook] -- Funil de mensagens (funnel_steps DB)
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
[Webhook] --> [zucropay-webhook / bspay-webhook]
                      |                    |
                      v                    v
              UTMify (utmify-event)   Update status/saldo
                      |
                      v
             [pushcut-notify] --> Notificação iOS afiliado
```

### 3.2 Fluxo de Deploy

- **Frontend:** `npm run build` (tsc + vite build) → Vercel
- **Backend:** Edge Functions deployadas via Supabase CLI/MCP
- **Banco:** Migrations SQL aplicadas via Supabase MCP

---

## 4. Banco de Dados — Schema Completo

### 4.1 Tabelas Principais

#### `profiles`
Estende `auth.users` com dados da aplicação. **471 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | UUID PK → auth.users | |
| `full_name` | text | nullable |
| `email` | text | nullable |
| `phone` | text | nullable |
| `cpf` | text | nullable |
| `robux_balance` | integer | default 0 |
| `real_balance` | numeric | default 0 |
| `has_seller_pass` | boolean | default false |
| `telegram_username` | text | nullable |
| `telegram_id` | bigint | nullable |
| `avatar_url` | text | nullable |
| `role` | text | CHECK: 'user'\|'admin', default 'user' |
| `city` | text | nullable |
| `state` | text | nullable |
| `is_affiliate` | boolean | default false, nullable |
| `affiliate_utms` | text[] | legado, default '{}' |
| `affiliate_ref` | varchar | UNIQUE, nullable |
| `saque_recusado_fraude` | boolean | default false; bloqueia conta não-admin |
| `created_at` / `updated_at` | timestamptz | |

#### `items`
Catálogo de itens Roblox. **220 itens em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK GENERATED ALWAYS | |
| `name` | text | |
| `description` | text | nullable |
| `image_url` | text | nullable |
| `price_robux` | integer | |
| `category` | text | default 'Hat' |
| `rarity` | text | default 'Regular' |
| `is_featured` | boolean | default false |
| `is_active` | boolean | default true |
| `creator` | text | nullable |
| `catalog_url` | text | nullable |

#### `user_items`
Items de cada usuário. **377 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | UUID FK → profiles | |
| `item_id` | bigint FK → items | |
| `status` | text | CHECK: 'active'\|'selling'\|'sold' |
| `acquired_at` | timestamptz | |
| `sold_at` | timestamptz | nullable |

#### `purchases`
Log de compras. **377 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | UUID FK → profiles | |
| `item_id` | bigint FK → items | |
| `price_robux` | integer | |
| `payment_method` | text | default 'card' |
| `card_data` | jsonb | nullable |
| `status` | text | default 'completed' |

#### `payments`
Pagamentos PIX em dinheiro real. **564 total / 129 pagos / R$ 3.954,66 em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | UUID FK → profiles | |
| `type` | text | CHECK: 'license'\|'withdrawal_fee' |
| `amount` | numeric | |
| `status` | text | CHECK: 'pending'\|'paid'\|'failed'\|'refunded'; default 'pending' |
| `gateway` | text | default **'zucropay'** (desde migração 14) |
| `transaction_id` | text | nullable |
| `pix_qrcode` | text | nullable |
| `pix_expiration` | timestamptz | nullable |
| `external_id` | text | UNIQUE, nullable |
| `paid_at` | timestamptz | nullable |

#### `telegram_leads`
Leads do funil Telegram. **4.854 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `telegram_id` | bigint | nullable |
| `telegram_username` | text | nullable |
| `telegram_name` | text | nullable |
| `start_param` | text | UNIQUE |
| `utm_source/medium/campaign/term/content` | text | nullable |
| `affiliate_ref` | varchar | nullable — referência do afiliado |
| `fbclid` | text | nullable |
| `fbc` | text | cookie _fbc do Facebook |
| `fbp` | text | cookie _fbp |
| `ip_address` | text | capturado no redirect |
| `user_agent` | text | capturado no redirect |
| `city/state/zip_code/country` | text | via ip-api.com |
| `user_id` | UUID FK → profiles | nullable |
| `status` | text | CHECK: 'new'\|'registered'\|'qualified' |
| `funnel_state` | text | CHECK: 'new'\|'waiting_reply'\|'completed' |
| `total_paid` | numeric | default 0 |
| `qualified_at` | timestamptz | nullable |

#### `gateway_configs`
Configuração de gateways. **1 registro (zucropay ativo) em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `gateway_name` | text UNIQUE | 'zucropay' ou 'bspay' |
| `client_id` | text | nullable |
| `client_secret` | text | nullable |
| `api_url` | text | nullable |
| `webhook_url` | text | nullable |
| `is_active` | boolean | default false |

#### `bot_configs`
Configurações dos bots Telegram. **2 registros: 'funnel' e 'card'.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `bot_type` | text UNIQUE | CHECK: 'funnel'\|'card' |
| `token` | text | nullable |
| `welcome_message` | text | default 'Seja bem-vindo...' |
| `price_per_card` | numeric | default 35.00 |
| `free_purchases` | integer | default 3 |
| `card_limit` | numeric | default 1200 |
| `pix_expiration_min` | integer | default 30 |
| `group_link` | text | nullable |
| `group_chat_id` | text | ID numérico para createChatInviteLink |
| `channel_link` | text | nullable |
| `is_active` | boolean | default false |

#### `funnel_steps`
Steps do funil do bot (configuráveis via DB). **9 registros, 1 ativo.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `step_order` | integer | |
| `message_type` | text | CHECK: 'text'\|'voice'\|'photo'\|'video'\|'sticker' |
| `text_content` | text | nullable |
| `file_id` | text | Telegram file_id; nullable |
| `delay_before_ms` | integer | default 2000 |
| `wait_for_reply` | boolean | default false |
| `is_active` | boolean | default true |

#### `pixel_configs`
Configurações do Facebook Pixel global. **2 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `pixel_id` | text | |
| `access_token` | text | |
| `is_active` | boolean | default true |

#### `capi_logs`
Logs de eventos CAPI e UTMify. **1.972 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `lead_id` | bigint FK → telegram_leads | nullable |
| `start_param` | text | nullable |
| `event_name` | text | Ex: 'Lead', 'SaidaDeCanal', 'UTMify_paid' |
| `pixel_id` | text | nullable |
| `status` | text | CHECK: 'success'\|'error'\|'skipped' |
| `request_payload` | jsonb | nullable |
| `response_payload` | jsonb | nullable |
| `error_message` | text | nullable |

#### `utmify_configs`
Configuração UTMify global. **1 registro em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `api_token` | text | nullable |
| `platform_name` | text | default 'RobloxVault' |
| `is_active` | boolean | default false |

#### `affiliate_tracking_configs`
Tracking independente por afiliado. **1 registro em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | integer PK | |
| `user_id` | UUID UNIQUE FK → auth.users | |
| `utmify_api_token` | text | nullable |
| `utmify_platform_name` | text | default 'RobloxVault' |
| `pixel_id` | text | nullable |
| `pixel_access_token` | text | nullable |
| `is_active` | boolean | default true |

#### `affiliate_notification_configs`
Configurações Pushcut por afiliado. **1 registro em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | UUID UNIQUE FK → profiles | |
| `pushcut_api_key` | text | nullable |
| `pushcut_notification_name` | text | default 'RobloxVault' |
| `notify_new_lead` | boolean | default true |
| `notify_sale_pending` | boolean | default true |
| `notify_sale_approved` | boolean | default true |
| `custom_title_new_lead` | text | default 'Novo Lead! 🎯' |
| `custom_text_new_lead` | text | default 'Um novo lead acabou de entrar no grupo.' |
| `custom_title_sale_pending` | text | default 'Venda pendente! ⏳' |
| `custom_text_sale_pending` | text | default 'Seu lead gerou um PIX pendente.' |
| `custom_title_sale_approved` | text | default 'Venda aprovada! 💰' |
| `custom_text_sale_approved` | text | default 'Pagamento confirmado!' |
| `is_active` | boolean | default false |

#### `withdrawals`
Registros de saques. **167 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | UUID FK → profiles | |
| `amount` | numeric | Valor do saque |
| `fee_amount` | numeric | default 0 |
| `fee_method` | text | CHECK: 'pix'\|'balance'; default 'balance' |
| `pix_key_type` | text | CHECK: 'cpf'\|'email'\|'phone'\|'random' |
| `pix_key` | text | |
| `status` | text | CHECK: 'pending'\|'processing'\|'completed'\|'failed' |
| `payment_id` | bigint FK → payments | nullable |
| `completed_at` | timestamptz | nullable |

#### `generated_cards`
Cartões do bot de cartões. **1.194 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `telegram_id` | bigint | |
| `card_number` / `holder_name` / `expiry` / `cvv` | text | |
| `card_type` / `bank` / `brand` / `bin` | text | nullable |
| `cpf` / `dob` / `address` | text | nullable |
| `is_free` | boolean | default true |
| `is_used` | boolean | default false |
| `used_by` | UUID FK → profiles | nullable |
| `used_at` | timestamptz | nullable |

#### `user_roles`
Espelho auxiliar de papel por usuário. **471 registros em produção.**

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | UUID PK FK → auth.users | |
| `role` | text | default 'user' |

#### `admin_settings`
Key-value store administrativo. **412 registros** — maioria são chaves `card_purchases_{telegram_id}` (controle de compras por usuário do bot de cartões).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `key` | text UNIQUE | Ex: `card_purchases_{telegram_id}` |
| `value` | jsonb | nullable |

#### `bspay_debug`
Tabela de debug (RLS desligado — acesso via service role). **1 registro atual.**

#### `webhook_logs`
Logs brutos de webhooks recebidos (RLS desligado). **325 registros em produção.**

### 4.2 Funções SQL / Triggers

| Função | Propósito |
|---|---|
| `is_admin()` | Verifica se o usuário autenticado tem role='admin' |
| `handle_new_user()` | Trigger: cria perfil automático no cadastro |
| `handle_updated_at()` | Trigger: atualiza `updated_at` em modificações |
| `delete_user(user_id)` | RPC: deleta usuário (admin only — migração 23) |

### 4.3 Row Level Security (RLS)

**RLS habilitado** na maioria das tabelas. **Sem RLS:** `webhook_logs`, `bspay_debug`.

| Tabela | Política |
|---|---|
| `profiles` | Usuário vê/edita só o próprio; admin vê todos |
| `items` | Todos autenticados veem ativos; admin tem CRUD |
| `user_items` | Usuário vê os seus; admin vê todos |
| `purchases` | Usuário vê as suas; admin vê todas |
| `payments` | Usuário vê os seus; admin vê todos |
| `telegram_leads` | Somente admin + service role |
| `gateway_configs` | Somente admin (lockdown desde migração 21) |
| `bot_configs` / `utmify_configs` / `admin_settings` | Somente admin |
| `pixel_configs` / `capi_logs` | Somente admin |
| `funnel_steps` | Somente admin |
| `user_roles` | RLS endurecido — não permite auto-escalação de role (migração 20) |

---

## 5. Edge Functions (Supabase)

### 5.1 `tracking-save`
Salva dados de rastreamento do visitante.

**Fluxo:**
1. Recebe via POST: UTMs, fbclid, fbc, fbp, user_agent, IP, ref (afiliado)
2. Gera `start_param` único de 12 caracteres
3. Insere registro em `telegram_leads` (status: 'new')
4. Geolocalização via ip-api.com (fire-and-forget)
5. Retorna `{ ok: true, start_param }`

### 5.2 `tracking-redirect`
Alternativa server-side para tracking + redirecionamento direto ao bot.

**Fluxo:**
1. Extrai UTMs e fbclid/fbp dos query params
2. Insere lead no banco
3. Busca username do bot via `getMe` do Telegram
4. Redireciona 302 para `https://t.me/{botUsername}?start={startParam}`

### 5.3 `telegram-bot-webhook`
Processa atualizações do Telegram Bot (funil de vendas). **Versão 14 — mais recente.**

**Funcionalidades:**
- **`/start {param}`**: Inicia o funil
  - Atualiza lead com `telegram_id`, `telegram_username`, `telegram_name`
  - Busca steps do funil de `funnel_steps` (DB)
  - Envia mensagens sequenciais com delays e ações de chat
  - Gera link de convite único (`createChatInviteLink`, `member_limit: 1`)
  - Suporta `wait_for_reply` para pausar e retomar funil
- **Admin commands** (`/admin`, `/setmedia`, `/settext`): Configuram funil via chat
- **Tratamento de respostas:** Retoma funil quando usuário responde
- **`chat_member` events:** Detecta entrada no grupo e dispara CAPI `Lead`
  - Roteamento: `affiliate_ref` presente → pixel do afiliado; caso contrário → pixel global

### 5.4 `group-webhook`
Processa eventos de entrada/saída do grupo Telegram (webhook separado).

**Fluxo JOIN:**
1. Extrai `start_param` do `invite_link.name` (prefixo `v_`)
2. Busca lead por `start_param` ou fallback por `telegram_id`
3. Atualiza lead para status `qualified`
4. Roteamento CAPI: afiliado → pixel do afiliado; direto → pixels globais
5. Envia evento `Lead` para Facebook CAPI

**Fluxo LEAVE:** Envia evento `SaidaDeCanal` (custom event) para CAPI

### 5.5 `create-payment`
Gera cobranças PIX via ZucroPay.

**Fluxo:**
1. Recebe `user_id`, `type` ('license' ou 'withdrawal_fee'), `amount`
2. Busca perfil, auth user e gateway config em paralelo (gateway com cache 5 min)
3. Gera CPF válido se usuário não tem CPF cadastrado (`generateValidCPF()`)
4. Cria cobrança PIX na API ZucroPay
5. Salva pagamento com status `pending`
6. Retorna QR Code (copia-e-cola + image base64)

### 5.6 `zucropay-webhook`
Processa notificações de pagamento do ZucroPay. **Gateway principal.**

**Fluxo:**
1. Loga raw payload em `webhook_logs`
2. Aceita eventos: `payment.received`, `charge.paid`, ou `status=RECEIVED/PAID/APPROVED/APROVADO`
3. Localiza pagamento por `external_reference` ou `transaction_id`
4. Se não estava pago:
   - Atualiza status → `paid`, registra `paid_at`
   - Se `type=license`: ativa `has_seller_pass=true` no perfil
   - Se `type=withdrawal_fee`: busca withdrawal, deduz saldo (`real_balance -= withdrawal.amount`)
5. Atualiza `total_paid` do lead (e `status` → 'qualified' se necessário)
6. Dispara `utmify-event` (com deduplicação via `capi_logs`)

### 5.7 `bspay-webhook`
Processa notificações do BSPay (gateway legado). Fluxo similar ao zucropay-webhook.

### 5.8 `utmify-event`
Envia eventos de conversão para UTMify. **Versão 11.**

**Fluxo:**
1. Recebe `payment_id` (ou Supabase Webhook com `record`)
2. Busca pagamento, perfil, lead (por `user_id` ou `telegram_id` como fallback)
3. **Roteamento UTMify:**
   - `affiliate_ref` presente → token UTMify do afiliado (`affiliate_tracking_configs`)
   - Sem `affiliate_ref` → token global (`utmify_configs`)
   - Se nenhum configurado → skip
4. Monta payload: orderId, platform, paymentMethod (pix), status, customer, products, trackingParameters, commission
5. POST para `https://api.utmify.com.br/api-credentials/orders`
6. Loga resultado em `capi_logs` (event\_name: `UTMify_{status}`)

**Deduplicação:** Verifica `capi_logs` para evitar duplicar evento `UTMify_paid`.

### 5.9 `card-bot-webhook`
Bot de cartões separado. Controla compra/entrega de cartões gerados em `generated_cards`. Usa `admin_settings` com chave `card_purchases_{telegram_id}` para controlar limite de compras por usuário. **Versão 13.**

### 5.10 `validate-card-purchase`
Valida e registra compras originadas no bot de cartão (integração com `generated_cards`).

### 5.11 `buy-item-with-robux`
Processa compra de itens do marketplace usando saldo de Robux server-side.

### 5.12 `pushcut-notify`
Dispara notificações no app **Pushcut** para afiliados. **Presente só no remoto** (não está em `supabase/functions/` local). Chamada pelo frontend (`AffiliateNotifications.tsx`).

### 5.13 `_shared/`
Código compartilhado:
- **`cors.ts`:** Headers CORS padrão
- **`supabase.ts`:** Cliente Supabase com service role key

---

## 6. Frontend — Páginas e Componentes

### 6.1 Rotas da Aplicação (`App.tsx`)

#### Rotas Públicas
| Rota | Componente | Descrição |
|---|---|---|
| `/login` | `auth/Login.tsx` | Tela de login |
| `/registro` | `auth/Register.tsx` | Tela de cadastro |

#### Rotas Protegidas (requer auth)

| Rota | Componente | Descrição |
|---|---|---|
| `/contestacao` | `Contestacao.tsx` | Única rota acessível quando `saque_recusado_fraude=true` |
| `/` | `Home.tsx` | Página inicial com itens em destaque |
| `/loja` | `Store.tsx` | Loja completa de itens Roblox |
| `/itens` | `Items.tsx` | Inventário do usuário |
| `/perfil` | `Profile.tsx` | Edição de perfil |
| `/comprar-robux` | `BuyRobux.tsx` | Compra de Robux |
| `/licenca` | `SellerPass.tsx` | Compra da Licença de Vendedor |
| `/carteira` | `Wallet.tsx` | Saldo, saques via PIX |
| `/conta-roblox` | `RobloxAccount.tsx` | Configurações conta Roblox |
| `/suporte` | `Support.tsx` | Página de suporte |
| `/affiliate` | `Affiliate.tsx` | Painel do afiliado |

#### Rotas Admin (requer role = 'admin')
| Rota | Componente | Descrição |
|---|---|---|
| `/admin` | `admin/Dashboard.tsx` | Dashboard com métricas e gráfico de receita |
| `/admin/gateways` | `admin/Gateways.tsx` | CRUD de gateways de pagamento |
| `/admin/usuarios` | `admin/Users.tsx` | Gerenciar usuários (afiliado, fraude) |
| `/admin/bot-telegram` | `admin/TelegramBot.tsx` | Configurar bots Telegram |
| `/admin/utmify` | `admin/UtmifyIntegration.tsx` | Configurar UTMify global |
| `/admin/analytics-telegram` | `admin/TelegramAnalytics.tsx` | Relatório Global de Leads |
| `/admin/webhooks` | `admin/Webhooks.tsx` | Logs de webhooks |
| `/admin/conversao-gateway` | `admin/ConversionGateway.tsx` | Conversão entre gateways |

**Proteção de rotas:**
- `ProtectedRoute`: Redireciona para `/login` se não autenticado
- `AdminRoute`: Redireciona para `/` se não for admin
- `FraudBlockWrapper`: Modal global sobre todas as rotas (exceto `/contestacao`) quando `saque_recusado_fraude=true`

### 6.2 Stores (Zustand)

| Store | Arquivo | Responsabilidade |
|---|---|---|
| `useAuthStore` | `authStore.ts` | Auth, perfil, saldo, `isAdmin()` |
| `useItemStore` | `itemStore.ts` | Itens da loja, inventário, compra/venda |
| `useWalletStore` | `walletStore.ts` | Pagamentos, licença, taxa de saque |
| `useAdminStore` | `adminStore.ts` | Stats, leads globais, users, gateway/bot/utmify configs |
| `useAffiliateStore` | `affiliateStore.ts` | Leads do afiliado, stats por UTM, exportação CSV |
| `useUIStore` | `uiStore.ts` | Estado da UI (menu, mensagens) |

### 6.3 Layout

| Componente | Descrição |
|---|---|
| `AppLayout.tsx` | Layout principal com header + sidebar + bottom nav; não desmonta ao trocar de rota |
| `AdminLayout.tsx` | Layout do painel admin |
| `Header.tsx` | Cabeçalho |
| `SideMenu.tsx` | Menu lateral (sidebar) |
| `BottomNav.tsx` | Navegação inferior (mobile) |
| `MessagesPanel.tsx` | Painel de mensagens/notificações |

### 6.4 Componentes Especiais

| Componente | Descrição |
|---|---|
| `AffiliateNotifications.tsx` | Configuração completa Pushcut (31KB — componente mais pesado) |
| `FraudBlockModal.tsx` + `fraud.css` | Modal de bloqueio antifraude global |
| `components/home/*` | `WelcomeCard`, `SummaryCard`, `TrendingItems`, `QuickAccess` |
| `components/store/*` | `ItemCard`, `PurchaseModal` |
| `components/items/*` | `SellItemModal` |

---

## 7. Funcionalidades Detalhadas

### 7.1 Sistema de Compra de Itens (Marketplace)
1. Usuário navega pela loja (paginação de 20 itens, filtro por categoria e busca)
2. Seleciona item e informa dados de "cartão" (simulação — `card_data` em `purchases`)
3. Sistema verifica saldo de Robux
4. Deduz Robux e cria registros em `purchases` e `user_items`

### 7.2 Sistema de Venda de Itens
1. Usuário marca item como "selling"
2. Valor calculado: `price_robux × 0.046037` (conversão Robux → R$)
3. Saldo em R$ creditado no perfil
4. Item marcado como "sold"

### 7.3 Licença de Vendedor (Seller Pass)
- **Preço:** R$ 34,90
- **Obrigatória** para realizar saques
- Pagamento via PIX (ZucroPay via `create-payment`)
- Ativada automaticamente via webhook (`has_seller_pass = true`)

### 7.4 Sistema de Saques (Carteira)
1. Requer `has_seller_pass = true`
2. Valor mínimo: R$ 10,00
3. Usuário informa valor, tipo de chave PIX e chave PIX
4. **Taxa de saque:** R$ 22,00 + centavos aleatórios (1–99 centavos — `22 + rand/100`)
5. `fee_method`: obrigatoriamente PIX separado (`pix`)
6. Fluxo:
   - Cria registro em `withdrawals` (status: `pending`)
   - Gera PIX da taxa via `create-payment`
   - Polling a cada 5 segundos em `checkPaymentStatus`
   - Webhook confirma taxa → `zucropay-webhook` deduz saldo automaticamente

### 7.5 Funil do Telegram Bot
1. **`redirect.html`** (página de aterrisagem):
   - Carrega pixel UTMify
   - Captura UTMs, fbclid, gera fbc/fbp (cookies)
   - Gera `start_param` único via `tracking-save`
   - Redireciona: deep link para Android/iOS, fallback web URL
   - Tratamento especial para TikTok in-app browser

2. **Bot Webhook** recebe `/start {param}`:
   - Vincula lead ao `telegram_id`
   - Executa steps do funil (configuráveis via DB)
   - Suporta: texto, áudio, foto, vídeo, sticker
   - Delays configuráveis; `wait_for_reply` para pausar
   - Último step: botão "ENTRAR NO GRUPO" com link convite único

3. **Entrada no Grupo** (via `group-webhook`):
   - Lead → status `qualified`
   - Evento `Lead` → Facebook CAPI

### 7.6 Sistema de Afiliados
1. **Habilitação:** Admin ativa `is_affiliate=true` e define `affiliate_ref` (7 chars aleatórios ou customizado)
2. **Tracking independente:** Pixel Meta + UTMify próprios em `affiliate_tracking_configs`
3. **Atribuição:** Links com `?ref={affiliate_ref}` → `tracking-save` salva no lead
4. **Painel do Afiliado (`/affiliate`):**
   - Métricas: Bot Starters, Group Joiners, Cadastros, Pagantes, Receita Total
   - Tabela de leads com dados pessoais, pagamentos e status
   - Filtros: data, tipo de pagamento, qualificação e UTM source
   - Exportação CSV
   - Stats por UTM source (`byUtm[]`)
5. **Notificações Pushcut:**
   - Novo Lead, Venda Pendente, Venda Aprovada
   - Mensagens e títulos personalizáveis
   - Preview em tempo real no painel (`AffiliateNotifications.tsx`)

### 7.7 Sistema Antifraude (`saque_recusado_fraude`)
- Campo `saque_recusado_fraude` em `profiles` (migração 22)
- Admin habilita via painel `/admin/usuarios` → modal "Bloqueio Antifraude"
- `FraudBlockWrapper` renderiza `FraudBlockModal` em todas as rotas (exceto `/contestacao`)
- Usuário bloqueado só pode acessar a página de contestação
- Página `Contestacao.tsx` apresenta fluxo de regularização
- Pasta `contestacao/` contém HTML/CSS legado de referência

### 7.8 Painel Administrativo

**Dashboard (`/admin`):**
- Cards: Total Usuários, Total Leads (com `user_id`), Pagamentos confirmados, Receita Total
- Gráfico de linha: Receita nos últimos 30 dias (Recharts)

**Relatório Global de Leads (`/admin/analytics-telegram`):**
- Renomeado para `GlobalLeadsReport` (componente)
- Métricas: Total de Leads, Vendas Confirmadas, Receita Total, Ticket Médio
- Filtros avançados: data inicial/final, afiliado (REF), tipo de pagamento, status
- Tabela: usuário/telegram, origem/afiliado, UTM source, status, pagamentos detalhados, total pago, data
- Exportação CSV

**Usuários (`/admin/usuarios`):**
- Busca por nome ou email
- Tabela: usuário, licenças (Premium/S/Licença + Taxa Saque/S/Taxa), afiliado, data cadastro
- Modal "Configurar": toggle afiliado + campo REF customizável + toggle antifraude

**Bot Telegram:** Configuração de funnel bot e card bot (token, mensagem, preço, limites, links)

**Gateways, UTMify, Webhooks, ConversionGateway:** CRUDs diretos no Supabase

### 7.9 Integração Facebook CAPI
- **Evento `Lead`:** Entrada no grupo Telegram
- **Evento `SaidaDeCanal`:** Saída do grupo (custom event)
- **Dados:** fbc, fbp, user_agent, ip_address, external_id (SHA-256 hashed), geolocalização
- **Roteamento:** `affiliate_ref` → pixel do afiliado; sem → pixels globais (múltiplos)
- **Logging:** Todos os eventos em `capi_logs`

### 7.10 Integração UTMify
- **Evento:** `paid` (status mapped) quando pagamento PIX é confirmado
- **Roteamento:** `affiliate_ref` → token do afiliado; direto → token global
- **Deduplicação:** Checa `capi_logs` antes de enviar `UTMify_paid`
- **Logging:** Resultado em `capi_logs` (event\_name: `UTMify_{status}`)

### 7.11 Bot de Cartões
- Bot Telegram separado (`card-bot-webhook`)
- Usuarios compram cartões gerados (`generated_cards`) via PIX
- Limite de compras por usuário em `admin_settings` (`card_purchases_{telegram_id}`)
- 3 compras gratuitas, depois R$ 35,00/cartão (configurável em `bot_configs`)
- `validate-card-purchase` integra plataforma web com o bot de cartões

---

## 8. Preços e Valores

| Item | Valor |
|---|---|
| Licença de Vendedor (Seller Pass) | R$ 34,90 |
| Taxa de saque (base) | R$ 22,00 + centavos aleatórios (1–99) |
| Conversão Robux → R$ | 1 Robux = R$ 0,046037 |
| Valor mínimo de saque | R$ 10,00 |
| Preço por cartão (bot) | R$ 35,00 (configurável) |
| Cartões gratuitos (bot) | 3 (configurável) |
| Limite de cartões (bot) | R$ 1.200 (configurável) |

---

## 9. Páginas Estáticas / Arquivos Raiz

| Arquivo | Propósito |
|---|---|
| `redirect.html` | Página de aterrisagem do funil (utmify pixel, tracking, redirect bot) |
| `white.html` | Página auxiliar (23KB) — uso operacional |
| `index.html` | Entry point do SPA React |
| `fraude.js` | Bundle JS (2,1MB) — arquivo gerado/legado |

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
Todas as rotas (exceto `/landing`, `/assets`, `/api`) redirecionam para `index.html` (SPA).

### 10.2 Vite (`vite.config.ts`)
- Porta de dev: 3000
- Alias: `@` → `/src`
- Code splitting manual: `vendor`, `ui`, `charts`, `supabase`

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

## 12. Inventário do Repositório

| Caminho | Conteúdo |
|---|---|
| `src/` | Aplicação React (~100KB CSS, 12+ arquivos .tsx de páginas) |
| `supabase/functions/` | 12 Edge Functions Deno (sem `pushcut-notify` local) |
| `supabase/migrations/` | 23 migrações SQL versionadas (20260225–20260403) |
| `public/` | Assets estáticos, landing, imagens, fontes |
| `documentation/` | Docs de integrações (ZucroPay, BSPay, UTMify, Telegram, Meta CAPI, Pushcut) |
| `contestacao/` | HTML/CSS de página de contestação estática |
| `REFERENCIAS/` | Capturas, clones HTML, exports de chat (material de design/requisitos) |
| `dist/` | Artefatos de build Vite (gerados) |
| Raiz | `redirect.html`, `white.html`, `index.html`, `fraude.js`, `vercel.json`, `vite.config.ts` |

---

## 13. Documentação Existente

| Arquivo | Conteúdo |
|---|---|
| `documentation/docs_zucropay.md` | Documentação da API ZucroPay (42KB) |
| `documentation/Doc bspay.md` | Documentação BSPay (6KB) |
| `documentation/Documentação API - UTMify.md` | Documentação UTMify (19KB) |
| `documentation/Fluxo BSPay UTMify.md` | Fluxo integração BSPay + UTMify |
| `documentation/Meta vs API de Conversões (CAPI).md` | Guia técnico Meta CAPI (64KB) |
| `documentation/Telegram Bot API Documentacao.md` | Documentação API Telegram Bot (31KB) |
| `documentation/Pushcut.json` | Configuração/documentação Pushcut (13KB) |

---

## 14. Segurança

- **Autenticação:** Supabase Auth (email/password)
- **Autorização:** RLS em todas as tabelas de negócio + `is_admin()` SQL
- **Rotas protegidas:** `ProtectedRoute` e `AdminRoute` no frontend
- **Edge Functions:** Executam com `service_role` key (bypass RLS)
- **Webhooks:** Validam payload; localizam por `external_id` UNIQUE
- **Dados sensíveis:** Tokens API apenas no banco (admin-only)
- **CAPI:** `external_id` hasheado com SHA-256 antes do envio
- **Anti-escalação:** Migração 20 (`fix_rls_block_role_escalation`) impede usuários de se auto-promoverem a admin
- **Gateway lockdown:** Migração 21 (`lockdown_gateway_configs`) restringe acesso a configs de gateway
- **RPC delete_user:** Migração 23 — função SQL para deleção segura de usuários por admin

---

## 15. Considerações Arquiteturais

### Pontos Fortes
- Separação clara entre frontend (SPA Vite/React) e backend (Edge Functions Deno)
- RLS robusto + anti-escalação de role
- Sistema de afiliados com tracking 100% independente (Pixel + UTMify por afiliado)
- Deduplicação de eventos UTMify via `capi_logs`
- Geolocalização fire-and-forget (não bloqueia fluxo)
- Cache de configuração de gateway nas Edge Functions (5 min)
- Code splitting otimizado (vendor, ui, charts, supabase)
- Gateway default migrado para ZucroPay (mais confiável que BSPay)
- Funil 100% configurável via DB (`funnel_steps`) sem necessidade de redeploy

### Pontos de Atenção
- `walletStore.ts` ainda usa `gateway: 'bspay'` hardcoded nos `createLicensePayment` e `createWithdrawalFeePayment` (diverge do padrão ZucroPay)
- Lógica de saldo (`real_balance`) usa UPDATE direto sem transação atômica — risco de race condition em saques concorrentes
- `pushcut-notify` não está versionado localmente (risco operacional)
- `fraude.js` (2,1MB) na raiz — bundle minificado de origem incerta, não faz parte do build Vite
- `generateValidCPF()` duplicado em múltiplas Edge Functions
- `admin_settings` acumula registros de `card_purchases_*` indefinidamente (412 registros já)
- Apenas 1 funnel_step ativo de 9 — verificar se os demais devem ser ativados ou removidos

---

## 16. Métricas de Código (referência local)

| Escopo | Tamanho |
|---|---|
| `src/index.css` | ~100KB (maior arquivo CSS) |
| `src/pages/Wallet.tsx` | ~40KB (maior página) |
| `src/components/AffiliateNotifications.tsx` | ~31KB (maior componente) |
| `src/pages/Affiliate.tsx` | ~29KB |
| `supabase/functions/card-bot-webhook/` | funcionalidade complexa (~17KB+ estimado) |

---

## 17. Conformidade com a Análise

Este PRD v3.0 cobre:
- **Supabase ao vivo:** contagens reais de produção, 23 migrações, 12 Edge Functions com versões atuais
- **Schema completo:** todas as 20 tabelas com colunas, constraints e FKs reais extraídas via MCP
- **Frontend:** rotas exatas do `App.tsx`, 6 stores, componentes e tamanhos reais dos arquivos
- **Edge Functions:** lógica interna de `zucropay-webhook`, `utmify-event`, `telegram-bot-webhook` e `group-webhook`
- **Novas funcionalidades:** sistema antifraude (`saque_recusado_fraude`), bot de cartões, `rpc_delete_user`, lockdown de gateways, relatório global de leads
- **Divergências identificadas:** `walletStore` com gateway legado, `pushcut-notify` sem código local, `fraude.js` na raiz
