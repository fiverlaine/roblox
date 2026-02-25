/**
 * Cliente da API de produtos do concorrente (robloxvault.space).
 * REFERÊNCIA APENAS: a loja NÃO chama esta API (dados vêm do Supabase).
 * Use este módulo só para scripts de importação one-time ou referência do formato.
 * Listagem paginada: page=1..13, limit=20, search, tipo, minPrice, maxPrice.
 */



export interface ApiProduct {
  name: string
  imageUrl: string
  price: string
  priceRobux: number
  creator: string
  itemType: string
  url: string
}

export interface ProductsApiResponse {
  success: boolean
  total: number
  page: number
  totalPages: number
  produtos: ApiProduct[]
}

const API_BASE = 'https://robloxvault.space/api'

export interface FetchProductsParams {
  page?: number
  limit?: number
  search?: string
  tipo?: string
  minPrice?: number
  maxPrice?: number
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsApiResponse> {
  const {
    page = 1,
    limit = 20,
    search = '',
    tipo = '',
    minPrice = 0,
    maxPrice = 9999999,
  } = params

  const url = new URL(`${API_BASE}/products`)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('search', search)
  url.searchParams.set('tipo', tipo)
  url.searchParams.set('minPrice', String(minPrice))
  url.searchParams.set('maxPrice', String(maxPrice))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`API produtos: ${res.status}`)
  const data = (await res.json()) as ProductsApiResponse
  if (!data.success || !Array.isArray(data.produtos)) throw new Error('Resposta inválida da API')
  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiProductToStoreItem(p: ApiProduct, page: number, index: number): any {
  return {
    id: `api-${page}-${index}`,
    name: p.name,
    image_url: p.imageUrl || null,
    price_robux: p.priceRobux,
    rarity: p.itemType || undefined,
    creator: p.creator,
    catalog_url: p.url || undefined,
  }
}
