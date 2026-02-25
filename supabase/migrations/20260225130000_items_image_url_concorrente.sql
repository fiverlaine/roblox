/*
 * ============================================================================
 * Migration: 20260225130000_items_image_url_concorrente
 * Purpose:   Define image_url dos 15 itens da loja com as mesmas URLs do
 *            concorrente (Clone html manual / loja.html) - rbxcdn.com.
 * Depends:   20260224200100_seed_items
 * ============================================================================
 */

update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-8b8e45931f80ff23c7948320869b12a7/420/420/EmoteAnimation/Webp/noFilter' where name = 'Coroa do Rei Supremo';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-c0b4cb514d8c31285c099a87d45c47a5/420/420/FaceAccessory/Webp/noFilter' where name = 'Asas de Dragão Ancestral';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-a510c9326796e0c8c740eabc140430b5/420/420/ShirtAccessory/Webp/noFilter' where name = 'Máscara do Vazio';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-f708f69e274ae68dae535f199e1e1618/420/420/Hat/Webp/noFilter' where name = 'Avatar Samurai Sombrio';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-decc4d129c3555560d6d610ef30e6f4e/420/420/Face/Webp/noFilter' where name = 'Espada do Trovão Eterno';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-c38116294139d2498c2b1569591fe0b7/420/420/Hat/Webp/noFilter' where name = 'Capacete Cyberpunk Neon';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-685d18b362dd1f00ad4061d66bb93a20/420/420/Hat/Webp/noFilter' where name = 'Boné Grafiteiro Urbano';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-bb5760ef8679aa59a5b347acf2ba6d15/420/420/Hat/Webp/noFilter' where name = 'Mochila Explorador Galáctico';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-d0f305a47f8cbd15f2a2614983103cea/420/420/Hat/Webp/noFilter' where name = 'Óculos de Sol Pixelados';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-56fd58b2a6d15d95e600dee11b697291/420/420/Hat/Webp/noFilter' where name = 'Avatar Ninja das Sombras';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-cbe917f5ce16b5be1bad96fa6ba55051/420/420/FrontAccessory/Webp/noFilter' where name = 'Katana de Cristal';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-f9632212d30f210eec94208aea790c82/420/420/BackAccessory/Webp/noFilter' where name = 'Chapéu de Mago Estelar';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-b49b9a26283f8293871615676129f87f/420/420/BackAccessory/Webp/noFilter' where name = 'Asas de Anjo Celestial';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-7cdbfbb8d1d4d8c5cf3a7401c2b783a9/420/420/BackAccessory/Webp/noFilter' where name = 'Máscara de Gelo Ártico';
update public.items set image_url = 'https://tr.rbxcdn.com/180DAY-6b7bce4cd1c89c6bcee788801fda3595/420/420/Hat/Webp/noFilter' where name = 'Escudo do Guardião Supremo';
