/*
 * ============================================================================
 * Migration: 20260225140000_items_creator_catalog_url
 * Purpose:   Adiciona colunas creator e catalog_url em items para o mesmo
 *            formato do concorrente (nome do criador, link do catálogo Roblox).
 * Depends:   20260224200000_initial_schema
 * ============================================================================
 */

alter table public.items
  add column if not exists creator text,
  add column if not exists catalog_url text;

comment on column public.items.creator is 'Nome do criador do item (ex.: Roblox, UGC)';
comment on column public.items.catalog_url is 'URL do item no catálogo Roblox';
