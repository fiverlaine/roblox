/*
 * ============================================================================
 * Migration: 20260224200100_seed_items
 * Purpose:   Seeds the database with initial Roblox Vault catalogue items,
 *            default bot configurations, and default gateway configuration.
 * Depends:   20260224200000_initial_schema
 * ============================================================================
 */


-- ============================================================================
-- 1. ROBLOX STORE ITEMS  (~15 items, Portuguese names, varied categories/rarity)
-- ============================================================================

insert into public.items (name, description, image_url, price_robux, category, rarity, is_featured) values

  -- Featured items (image_url = URLs do concorrente Clone html manual / loja.html - rbxcdn)
  ('Coroa do Rei Supremo',
   'Uma coroa dourada imponente, símbolo de poder absoluto no universo Roblox.',
   'https://tr.rbxcdn.com/180DAY-8b8e45931f80ff23c7948320869b12a7/420/420/EmoteAnimation/Webp/noFilter', 25000, 'Hat', 'Mythic', true),

  ('Asas de Dragão Ancestral',
   'Asas épicas que emanam chamas ancestrais a cada movimento.',
   'https://tr.rbxcdn.com/180DAY-c0b4cb514d8c31285c099a87d45c47a5/420/420/FaceAccessory/Webp/noFilter', 22000, 'BackAccessory', 'Legendary', true),

  ('Máscara do Vazio',
   'Uma máscara misteriosa que distorce a realidade ao seu redor.',
   'https://tr.rbxcdn.com/180DAY-a510c9326796e0c8c740eabc140430b5/420/420/ShirtAccessory/Webp/noFilter', 18000, 'FaceAccessory', 'Legendary', true),

  ('Avatar Samurai Sombrio',
   'Conjunto completo de samurai com armadura escura e detalhes em vermelho.',
   'https://tr.rbxcdn.com/180DAY-f708f69e274ae68dae535f199e1e1618/420/420/Hat/Webp/noFilter', 20000, 'Avatar', 'Epic', true),

  ('Espada do Trovão Eterno',
   'Uma lâmina lendária que canaliza o poder dos relâmpagos.',
   'https://tr.rbxcdn.com/180DAY-decc4d129c3555560d6d610ef30e6f4e/420/420/Face/Webp/noFilter', 15000, 'Gear', 'Legendary', true),

  ('Capacete Cyberpunk Neon',
   'Capacete futurista com luzes neon pulsantes e visor holográfico.',
   'https://tr.rbxcdn.com/180DAY-c38116294139d2498c2b1569591fe0b7/420/420/Hat/Webp/noFilter', 12000, 'Hat', 'Epic', true),

  -- Regular items
  ('Boné Grafiteiro Urbano',
   'Boné estiloso com grafites exclusivos inspirados na cultura de rua.',
   'https://tr.rbxcdn.com/180DAY-685d18b362dd1f00ad4061d66bb93a20/420/420/Hat/Webp/noFilter', 3500, 'Hat', 'Regular', false),

  ('Mochila Explorador Galáctico',
   'Mochila espacial equipada com propulsores visuais.',
   'https://tr.rbxcdn.com/180DAY-bb5760ef8679aa59a5b347acf2ba6d15/420/420/Hat/Webp/noFilter', 5000, 'BackAccessory', 'Rare', false),

  ('Óculos de Sol Pixelados',
   'Óculos clássicos com estilo retrô pixelado.',
   'https://tr.rbxcdn.com/180DAY-d0f305a47f8cbd15f2a2614983103cea/420/420/Hat/Webp/noFilter', 3000, 'FaceAccessory', 'Regular', false),

  ('Avatar Ninja das Sombras',
   'Traje ninja completo em preto com detalhes em roxo neon.',
   'https://tr.rbxcdn.com/180DAY-56fd58b2a6d15d95e600dee11b697291/420/420/Hat/Webp/noFilter', 8500, 'Avatar', 'Rare', false),

  ('Katana de Cristal',
   'Espada forjada em cristal puro, emite brilho ao ser empunhada.',
   'https://tr.rbxcdn.com/180DAY-cbe917f5ce16b5be1bad96fa6ba55051/420/420/FrontAccessory/Webp/noFilter', 7000, 'Gear', 'Rare', false),

  ('Chapéu de Mago Estelar',
   'Chapéu cônico decorado com estrelas e constelações brilhantes.',
   'https://tr.rbxcdn.com/180DAY-f9632212d30f210eec94208aea790c82/420/420/BackAccessory/Webp/noFilter', 4500, 'Hat', 'Rare', false),

  ('Asas de Anjo Celestial',
   'Asas brancas luminosas que irradiam uma aura divina.',
   'https://tr.rbxcdn.com/180DAY-b49b9a26283f8293871615676129f87f/420/420/BackAccessory/Webp/noFilter', 16000, 'BackAccessory', 'Epic', false),

  ('Máscara de Gelo Ártico',
   'Máscara congelada que libera partículas de neve ao se mover.',
   'https://tr.rbxcdn.com/180DAY-7cdbfbb8d1d4d8c5cf3a7401c2b783a9/420/420/BackAccessory/Webp/noFilter', 6000, 'FaceAccessory', 'Rare', false),

  ('Escudo do Guardião Supremo',
   'Escudo indestrutível com emblema dourado do Guardião.',
   'https://tr.rbxcdn.com/180DAY-6b7bce4cd1c89c6bcee788801fda3595/420/420/Hat/Webp/noFilter', 9500, 'Gear', 'Epic', false);


-- ============================================================================
-- 2. DEFAULT BOT CONFIGURATIONS
-- ============================================================================

insert into public.bot_configs (bot_type, welcome_message, price_per_card, free_purchases, card_limit, pix_expiration_min, is_active) values
  ('funnel',
   'Seja bem-vindo a maior base de ccs do Brasil!',
   35.00, 3, 1200, 30, false),
  ('card',
   'Seja bem-vindo a maior base de ccs do Brasil!',
   35.00, 3, 1200, 30, false);


-- ============================================================================
-- 3. DEFAULT GATEWAY CONFIGURATION
-- ============================================================================

insert into public.gateway_configs (gateway_name, api_url, is_active) values
  ('bspay', 'https://api.bspay.co/v2', false);


-- ============================================================================
-- END OF SEED
-- ============================================================================
