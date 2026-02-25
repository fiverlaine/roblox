/**
 * Gera a migration com os 205 itens das páginas 3-13.
 * Uso: node scripts/seed-products-gen.mjs
 * Copie a saída para: supabase/migrations/20260225160000_seed_products_pages_3_to_13.sql
 *
 * Ou, se quiser buscar da API (one-time): descomente fetchAll() e rode.
 */

const API = 'https://robloxvault.space/api/products';

function esc(s) {
  if (s == null || s === undefined) return 'null';
  return "'" + String(s).replace(/'/g, "''") + "'";
}

async function fetchPage(page) {
  const url = `${API}?page=${page}&limit=20&search=&tipo=&minPrice=0&maxPrice=9999999`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.produtos || [];
}

async function fetchAll() {
  const all = [];
  for (let p = 3; p <= 13; p++) {
    const list = await fetchPage(p);
    all.push(...list);
    console.error(`Page ${p}: ${list.length} items`);
  }
  return all;
}

function toRow(p) {
  const itemType = (p.itemType || 'Regular').replace(/'/g, "''");
  return `(${esc(p.name)}, null, ${esc(p.imageUrl)}, ${p.priceRobux}, 'Hat', '${itemType}', false, true, ${esc(p.creator)}, ${esc(p.url)})`;
}

async function main() {
  const produtos = await fetchAll();
  const header = `/*
 * ============================================================================
 * Migration: 20260225160000_seed_products_pages_3_to_13
 * Purpose:   Insere 205 produtos das páginas 3 a 13 (páginas 1-2 no seed anterior).
 * Depends:   20260225140000_items_creator_catalog_url, 20260225150000_seed_products_concorrente
 * ============================================================================
 */

insert into public.items (name, description, image_url, price_robux, category, rarity, is_featured, is_active, creator, catalog_url) values
`;
  const values = produtos.map(toRow).join(',\n');
  console.log(header + values + ';\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
