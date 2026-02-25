# Imagens (assets) – iguais ao concorrente (Clone html manual)

Os nomes dos arquivos nesta pasta seguem o **Clone html manual** (concorrente).

## Assets existentes (layout / branding)

| Arquivo | Uso |
|--------|-----|
| `logo_icone-CoCIMuPm.png` | Ícone do logo (header, login, registro) |
| `logo_em_texto-D-gRJvZz.png` | Logo em texto "Roblox Vault" |
| `banner1-Y8STgM8X.png` | Banner promocional (Home) |
| `banner_loja-C3jkUOGT.png` | Banner da página Loja/Itens |
| `personagem-roblox-dando-ola-CEViZ2r4.png` | Personagem na WelcomeCard |
| `avatar-DZBXmQLv.webp` | Avatar placeholder (perfil) |
| `pattern.svg` | Padrão de fundo |
| `index-cPsyMJi3.css` | Estilos (build) |

## Itens da loja (15 itens)

O concorrente usa **imagens do Roblox CDN** (rbxcdn.com) na loja, não arquivos locais. No Roblox Vault, os 15 itens do catálogo estão configurados com as mesmas URLs do concorrente (seed e migration `20260225130000_items_image_url_concorrente`). Não é necessário colocar arquivos `item-1.png` … `item-15.png` nesta pasta para a loja funcionar.

Se quiser usar imagens locais no futuro, altere a coluna `image_url` na tabela `public.items` no Supabase (SQL Editor) para caminhos como `/assets/item-1.png` e coloque os arquivos aqui.
