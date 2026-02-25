export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  cpf: string | null
  robux_balance: number
  real_balance: number
  has_seller_pass: boolean
  telegram_username: string | null
  telegram_id: number | null
  avatar_url: string | null
  role: 'user' | 'admin'
  city: string | null
  state: string | null
  created_at: string
  updated_at: string
}

export interface Item {
  id: number
  name: string
  description: string | null
  image_url: string | null
  price_robux: number
  category: string
  rarity: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  creator?: string | null
  catalog_url?: string | null
}

export interface UserItem {
  id: number
  user_id: string
  item_id: number
  status: 'active' | 'selling' | 'sold'
  acquired_at: string
  sold_at: string | null
  item?: Item
}

export interface Purchase {
  id: number
  user_id: string
  item_id: number
  price_robux: number
  payment_method: string
  card_data: Record<string, unknown> | null
  status: string
  created_at: string
  item?: Item
}

export interface Payment {
  id: number
  user_id: string
  type: 'license' | 'withdrawal_fee'
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  gateway: string
  transaction_id: string | null
  pix_qrcode: string | null
  pix_expiration: string | null
  external_id: string | null
  created_at: string
  paid_at: string | null
}

export interface TelegramLead {
  id: number
  telegram_id: number | null
  telegram_username: string | null
  start_param: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  fbclid: string | null
  fbp: string | null
  user_id: string | null
  status: 'new' | 'registered' | 'qualified'
  total_paid: number
  created_at: string
  qualified_at: string | null
  profile?: Profile
}

export interface GatewayConfig {
  id: number
  gateway_name: string
  client_id: string | null
  client_secret: string | null
  api_url: string | null
  webhook_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BotConfig {
  id: number
  bot_type: 'funnel' | 'card'
  token: string | null
  welcome_message: string
  price_per_card: number
  free_purchases: number
  card_limit: number
  pix_expiration_min: number
  group_link: string | null
  channel_link: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UtmifyConfig {
  id: number
  api_token: string | null
  platform_name: string
  is_active: boolean
  created_at: string
  updated_at: string
}
