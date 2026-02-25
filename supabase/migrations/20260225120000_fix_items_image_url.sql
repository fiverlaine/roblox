/*
 * ============================================================================
 * Migration: 20260225120000_fix_items_image_url
 * Purpose:   Corrige image_url dos itens da loja: de /assets/items/item-X.png
 *            para /assets/item-X.png (arquivos em public/assets/).
 * Depends:   20260224200100_seed_items
 * ============================================================================
 */

update public.items
set image_url = replace(image_url, '/assets/items/', '/assets/')
where image_url like '/assets/items/%';
