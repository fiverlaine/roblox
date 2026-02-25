/*
 * ============================================================================
 * Migration: 20260224200000_initial_schema
 * Purpose:   Initial database schema for Roblox Vault marketplace platform
 * Affected:  Creates all core tables, helper functions, triggers, RLS policies,
 *            and performance indexes.
 * Notes:     This is the foundational migration — all subsequent migrations
 *            depend on these objects existing.
 * ============================================================================
 */


-- ============================================================================
-- 1. HELPER FUNCTIONS
-- ============================================================================

/*
 * is_admin() — checks whether the currently authenticated user holds the
 * 'admin' role in public.profiles.  Used throughout RLS policies.
 * SECURITY DEFINER so it can read profiles regardless of the caller's own
 * row-level permissions; search_path is locked down.
 */
create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  return exists (
    select 1
    from public.profiles
    where public.profiles.id = (select auth.uid())
      and public.profiles.role = 'admin'
  );
end;
$$;

/*
 * handle_new_user() — trigger function that automatically creates a row in
 * public.profiles whenever a new user is inserted into auth.users.
 * Pulls full_name and avatar_url from raw_user_meta_data if available.
 */
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$;

/*
 * handle_updated_at() — generic trigger function that sets updated_at = now()
 * on any row that is modified. Attach to any table that carries an
 * updated_at column.
 */
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- --------------------------------------------------------------------------
-- 2.1  profiles — extends auth.users with application-specific fields
-- --------------------------------------------------------------------------
create table public.profiles (
  id              uuid        primary key references auth.users (id) on delete cascade,
  full_name       text,
  email           text,
  phone           text,
  cpf             text,
  robux_balance   integer     not null default 0,
  real_balance    numeric(10,2) not null default 0,
  has_seller_pass boolean     not null default false,
  telegram_username text,
  telegram_id     bigint,
  avatar_url      text,
  role            text        not null default 'user'
                              check (role in ('user', 'admin')),
  city            text,
  state           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.profiles is
  'Application user profiles extending auth.users with Roblox Vault-specific data such as balances, seller status, Telegram integration, and administrative role.';

alter table public.profiles enable row level security;

-- --------------------------------------------------------------------------
-- 2.2  items — catalogue of Roblox items available in the store
-- --------------------------------------------------------------------------
create table public.items (
  id           bigint      generated always as identity primary key,
  name         text        not null,
  description  text,
  image_url    text,
  price_robux  integer     not null,
  category     text        not null default 'Hat',
  rarity       text        not null default 'Regular',
  is_featured  boolean     not null default false,
  is_active    boolean     not null default true,
  created_at   timestamptz not null default now()
);

comment on table public.items is
  'Roblox items listed in the marketplace store. Each row represents a distinct item with pricing, category, rarity, and active/featured flags.';

alter table public.items enable row level security;

-- --------------------------------------------------------------------------
-- 2.3  user_items — tracks item ownership per user
-- --------------------------------------------------------------------------
create table public.user_items (
  id          bigint      generated always as identity primary key,
  user_id     uuid        not null references public.profiles (id) on delete cascade,
  item_id     bigint      not null references public.items (id),
  status      text        not null default 'active'
                          check (status in ('active', 'selling', 'sold')),
  acquired_at timestamptz not null default now(),
  sold_at     timestamptz
);

comment on table public.user_items is
  'Junction table recording which items each user owns, along with ownership status (active / selling / sold).';

alter table public.user_items enable row level security;

-- --------------------------------------------------------------------------
-- 2.4  purchases — item purchase transaction log
-- --------------------------------------------------------------------------
create table public.purchases (
  id             bigint      generated always as identity primary key,
  user_id        uuid        not null references public.profiles (id) on delete cascade,
  item_id        bigint      not null references public.items (id),
  price_robux    integer     not null,
  payment_method text        not null default 'card',
  card_data      jsonb,
  status         text        not null default 'completed',
  created_at     timestamptz not null default now()
);

comment on table public.purchases is
  'Records every item purchase transaction, including the price paid in Robux and payment method details.';

alter table public.purchases enable row level security;

-- --------------------------------------------------------------------------
-- 2.5  payments — real-money (PIX) payment records
-- --------------------------------------------------------------------------
create table public.payments (
  id              bigint        generated always as identity primary key,
  user_id         uuid          not null references public.profiles (id) on delete cascade,
  type            text          not null
                                check (type in ('license', 'withdrawal_fee')),
  amount          numeric(10,2) not null,
  status          text          not null default 'pending'
                                check (status in ('pending', 'paid', 'failed', 'refunded')),
  gateway         text          not null default 'bspay',
  transaction_id  text,
  pix_qrcode      text,
  pix_expiration  timestamptz,
  external_id     text          unique,
  created_at      timestamptz   not null default now(),
  paid_at         timestamptz
);

comment on table public.payments is
  'Real-money payment records (PIX-based). Covers license fees and withdrawal fees with gateway tracking and QR code data.';

alter table public.payments enable row level security;

-- --------------------------------------------------------------------------
-- 2.6  telegram_leads — Telegram-sourced lead tracking
-- --------------------------------------------------------------------------
create table public.telegram_leads (
  id                bigint        generated always as identity primary key,
  telegram_id       bigint,
  telegram_username text,
  start_param       text          unique not null,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_term          text,
  utm_content       text,
  fbclid            text,
  fbp               text,
  user_id           uuid          references public.profiles (id) on delete set null,
  status            text          not null default 'new'
                                  check (status in ('new', 'registered', 'qualified')),
  total_paid        numeric(10,2) not null default 0,
  created_at        timestamptz   not null default now(),
  qualified_at      timestamptz
);

comment on table public.telegram_leads is
  'Lead acquisition tracking from Telegram bots with full UTM attribution, Facebook pixel data, and conversion status.';

alter table public.telegram_leads enable row level security;

-- --------------------------------------------------------------------------
-- 2.7  gateway_configs — payment gateway credentials / settings
-- --------------------------------------------------------------------------
create table public.gateway_configs (
  id            bigint      generated always as identity primary key,
  gateway_name  text        not null unique,
  client_id     text,
  client_secret text,
  api_url       text,
  webhook_url   text,
  is_active     boolean     not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.gateway_configs is
  'Payment gateway configurations including API credentials. Access is restricted to admin users only.';

alter table public.gateway_configs enable row level security;

-- --------------------------------------------------------------------------
-- 2.8  bot_configs — Telegram bot configuration
-- --------------------------------------------------------------------------
create table public.bot_configs (
  id               bigint        generated always as identity primary key,
  bot_type         text          not null unique
                                 check (bot_type in ('funnel', 'card')),
  token            text,
  welcome_message  text          not null default 'Seja bem-vindo a maior base de ccs do Brasil!',
  price_per_card   numeric(10,2) not null default 35.00,
  free_purchases   integer       not null default 3,
  card_limit       numeric(10,2) not null default 1200,
  pix_expiration_min integer     not null default 30,
  group_link       text,
  channel_link     text,
  is_active        boolean       not null default false,
  created_at       timestamptz   not null default now(),
  updated_at       timestamptz   not null default now()
);

comment on table public.bot_configs is
  'Telegram bot configuration for funnel and card bot types. Stores tokens, messaging defaults, pricing, and links. Admin-only access.';

alter table public.bot_configs enable row level security;

-- --------------------------------------------------------------------------
-- 2.9  utmify_configs — Utmify integration settings
-- --------------------------------------------------------------------------
create table public.utmify_configs (
  id             bigint      generated always as identity primary key,
  api_token      text,
  platform_name  text        not null default 'RobloxVault',
  is_active      boolean     not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.utmify_configs is
  'Utmify marketing-attribution integration settings. Admin-only access.';

alter table public.utmify_configs enable row level security;

-- --------------------------------------------------------------------------
-- 2.10 admin_settings — key/value store for general admin configuration
-- --------------------------------------------------------------------------
create table public.admin_settings (
  id         bigint      generated always as identity primary key,
  key        text        unique not null,
  value      jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.admin_settings is
  'Generic key/value configuration store for platform-wide admin settings.';

alter table public.admin_settings enable row level security;


-- ============================================================================
-- 3. TRIGGERS
-- ============================================================================

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

create trigger on_profiles_updated
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger on_gateway_configs_updated
  before update on public.gateway_configs
  for each row
  execute function public.handle_updated_at();

create trigger on_bot_configs_updated
  before update on public.bot_configs
  for each row
  execute function public.handle_updated_at();

create trigger on_utmify_configs_updated
  before update on public.utmify_configs
  for each row
  execute function public.handle_updated_at();

create trigger on_admin_settings_updated
  before update on public.admin_settings
  for each row
  execute function public.handle_updated_at();


-- ============================================================================
-- 4. INDEXES  (performance for RLS policy look-ups and common queries)
-- ============================================================================

create index idx_profiles_role        on public.profiles using btree (role);
create index idx_items_is_active      on public.items    using btree (is_active);
create index idx_items_is_featured    on public.items    using btree (is_featured);
create index idx_items_category       on public.items    using btree (category);
create index idx_user_items_user_id   on public.user_items using btree (user_id);
create index idx_user_items_item_id   on public.user_items using btree (item_id);
create index idx_purchases_user_id    on public.purchases using btree (user_id);
create index idx_payments_user_id     on public.payments  using btree (user_id);
create index idx_payments_external_id on public.payments  using btree (external_id);
create index idx_telegram_leads_user_id       on public.telegram_leads using btree (user_id);
create index idx_telegram_leads_telegram_id   on public.telegram_leads using btree (telegram_id);
create index idx_telegram_leads_start_param   on public.telegram_leads using btree (start_param);


-- ============================================================================
-- 5. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- --------------------------------------------------------------------------
-- 5.1  profiles
-- --------------------------------------------------------------------------

create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using ( (select auth.uid()) = id );

create policy "Admins can view all profiles"
  on public.profiles
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id );

/*
 * Inserts into profiles are handled by the handle_new_user() trigger function
 * which runs as SECURITY DEFINER (service role). No explicit insert policy is
 * needed for end-users.
 */

-- --------------------------------------------------------------------------
-- 5.2  items
-- --------------------------------------------------------------------------

create policy "Authenticated users can view active items"
  on public.items
  for select
  to authenticated
  using ( is_active = true );

create policy "Admins can view all items"
  on public.items
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert items"
  on public.items
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update items"
  on public.items
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete items"
  on public.items
  for delete
  to authenticated
  using ( public.is_admin() );

-- --------------------------------------------------------------------------
-- 5.3  user_items
-- --------------------------------------------------------------------------

create policy "Users can view their own items"
  on public.user_items
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Admins can view all user items"
  on public.user_items
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Users can update their own items"
  on public.user_items
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

/*
 * Inserts into user_items are performed server-side (service role) after
 * a purchase is validated.  No client-side insert policy needed.
 */

-- --------------------------------------------------------------------------
-- 5.4  purchases
-- --------------------------------------------------------------------------

create policy "Users can view their own purchases"
  on public.purchases
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Admins can view all purchases"
  on public.purchases
  for select
  to authenticated
  using ( public.is_admin() );

/*
 * Inserts into purchases are handled server-side (service role / edge
 * functions) to enforce business rules. No client insert policy.
 */

-- --------------------------------------------------------------------------
-- 5.5  payments
-- --------------------------------------------------------------------------

create policy "Users can view their own payments"
  on public.payments
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Admins can view all payments"
  on public.payments
  for select
  to authenticated
  using ( public.is_admin() );

/*
 * Inserts and updates on payments are performed server-side via edge
 * functions / webhooks running under the service role.
 */

-- --------------------------------------------------------------------------
-- 5.6  telegram_leads  (admin / service role only)
-- --------------------------------------------------------------------------

create policy "Admins can view all telegram leads"
  on public.telegram_leads
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert telegram leads"
  on public.telegram_leads
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update telegram leads"
  on public.telegram_leads
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete telegram leads"
  on public.telegram_leads
  for delete
  to authenticated
  using ( public.is_admin() );

-- --------------------------------------------------------------------------
-- 5.7  gateway_configs  (admin only)
-- --------------------------------------------------------------------------

create policy "Admins can view gateway configs"
  on public.gateway_configs
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert gateway configs"
  on public.gateway_configs
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update gateway configs"
  on public.gateway_configs
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete gateway configs"
  on public.gateway_configs
  for delete
  to authenticated
  using ( public.is_admin() );

-- --------------------------------------------------------------------------
-- 5.8  bot_configs  (admin only)
-- --------------------------------------------------------------------------

create policy "Admins can view bot configs"
  on public.bot_configs
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert bot configs"
  on public.bot_configs
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update bot configs"
  on public.bot_configs
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete bot configs"
  on public.bot_configs
  for delete
  to authenticated
  using ( public.is_admin() );

-- --------------------------------------------------------------------------
-- 5.9  utmify_configs  (admin only)
-- --------------------------------------------------------------------------

create policy "Admins can view utmify configs"
  on public.utmify_configs
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert utmify configs"
  on public.utmify_configs
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update utmify configs"
  on public.utmify_configs
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete utmify configs"
  on public.utmify_configs
  for delete
  to authenticated
  using ( public.is_admin() );

-- --------------------------------------------------------------------------
-- 5.10 admin_settings  (admin only)
-- --------------------------------------------------------------------------

create policy "Admins can view admin settings"
  on public.admin_settings
  for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can insert admin settings"
  on public.admin_settings
  for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admins can update admin settings"
  on public.admin_settings
  for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete admin settings"
  on public.admin_settings
  for delete
  to authenticated
  using ( public.is_admin() );


-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
