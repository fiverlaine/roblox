export const BRAND = {
  name: 'Roblox Vault',
  tagline: 'Compre, Venda e Ganhe',
  description: 'Compre Robux, adquira skins exclusivas e revenda para ganhar dinheiro real',
  colors: {
    primary: '#4678C0',
    secondary: '#ABDEFD',
    accent: '#F5C16C',
  },
}

export const PRICES = {
  sellerPass: 1.00,
  withdrawalFeeBase: 1.00,
}

export const NAV_ITEMS = [
  { path: '/', label: 'Início', icon: 'Home' },
  { path: '/itens', label: 'Itens', icon: 'Package' },
  { path: '/perfil', label: 'Perfil', icon: 'User' },
] as const

export const SIDEBAR_ITEMS = [
  { path: '/', label: 'Início', icon: 'Home' },
  { path: '/perfil', label: 'Perfil', icon: 'User' },
  { path: '/itens', label: 'Meus Pacotes', icon: 'Package' },
  { path: '/comprar-robux', label: 'Comprar Robux', icon: 'Coins' },
  { path: '/carteira', label: 'Carteira', icon: 'Wallet' },
  { path: '/conta-roblox', label: 'Conta Roblox', icon: 'Gamepad2' },
  { path: '/suporte', label: 'Suporte', icon: 'HelpCircle' },
] as const;

export const ADMIN_SIDEBAR_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/admin/gateways', label: 'Gateways de Pagamento', icon: 'CreditCard' },
  { path: '/admin/usuarios', label: 'Usuários', icon: 'Users' },
  { path: '/admin/bot-telegram', label: 'Bot do Telegram', icon: 'Bot' },
  { path: '/admin/utmify', label: 'Integração Utmify', icon: 'TrendingUp' },
  { path: '/admin/conversao-gateway', label: 'Conversão Gateway', icon: 'RefreshCw' },
  { path: '/admin/analytics-telegram', label: 'Analytics Telegram', icon: 'BarChart3' },
  { path: '/admin/webhooks', label: 'Webhooks', icon: 'Webhook' },
] as const

export const ITEM_CATEGORIES = [
  'Hat',
  'Avatar',
  'BackAccessory',
  'FaceAccessory',
  'Gear',
] as const

export const ITEM_RARITIES = [
  'Regular',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
] as const

export const CARD_TYPES = [
  'INFINITE',
  'PLATINUM',
  'GOLD',
  'CLASSIC',
  'STANDARD',
  'BLACK',
  'BUSINESS',
  'SIGNATURE',
] as const

export const RARITY_COLORS: Record<string, string> = {
  Regular: 'bg-gray-100 text-gray-700',
  Rare: 'bg-blue-100 text-blue-700',
  Epic: 'bg-purple-100 text-purple-700',
  Legendary: 'bg-yellow-100 text-yellow-700',
  Mythic: 'bg-red-100 text-red-700',
}
