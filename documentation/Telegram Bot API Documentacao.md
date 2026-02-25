# Documentação Completa da API do Telegram para Desenvolvimento de SaaS

## Visão Geral

O Telegram oferece três tipos de APIs para desenvolvedores:[^1]

- **Bot API**: Interface baseada em HTTP para criação de bots. É a mais usada para SaaS e a foco principal deste documento.
- **Telegram API + TDLib**: Protocolo MTProto para construção de clientes personalizados do Telegram com acesso completo à plataforma.
- **Gateway API**: Permite enviar códigos de verificação via Telegram em vez de SMS tradicional.

A **Bot API** é a interface recomendada para SaaS. Ela abstrai toda a complexidade do protocolo MTProto, traduzindo requisições HTTP simples para chamadas nativas ao backend do Telegram. A versão atual é a **Bot API 9.4**, lançada em fevereiro de 2026, contendo **165 métodos** disponíveis.[^2][^3][^4]

***

## Criação e Configuração de um Bot

### Passo a passo com o BotFather

O **@BotFather** é o bot oficial do Telegram para criar e gerenciar bots:[^5][^6]

1. Abrir o Telegram e buscar por **@BotFather**
2. Enviar o comando `/newbot`
3. Escolher um **nome de exibição** para o bot (ex: "Meu SaaS Bot")
4. Escolher um **username** que termine com `bot` ou `_bot` (ex: `meusaas_bot`)
5. O BotFather retorna o **token de autenticação** (ex: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### Comandos do BotFather

| Comando | Função |
|---------|--------|
| `/newbot` | Cria um novo bot |
| `/setname` | Altera o nome do bot |
| `/setdescription` | Define a descrição do bot |
| `/setabouttext` | Define o texto "Sobre" |
| `/setuserpic` | Define a foto do perfil |
| `/setcommands` | Define a lista de comandos |
| `/deletebot` | Exclui o bot |
| `/mybots` | Lista todos os seus bots |
| `/setinline` | Habilita o modo inline |
| `/setinlinefeedback` | Configura feedback inline |
| `/setjoingroups` | Permite/restringe entrada em grupos |
| `/setprivacy` | Configura modo de privacidade |

O token deve ser mantido em segredo — qualquer pessoa com o token terá controle total do bot.[^5]

***

## Autenticação e Requisições

### Formato das requisições

Todas as requisições à Bot API devem ser feitas via **HTTPS** no seguinte formato:[^3]

```
https://api.telegram.org/bot<token>/METHOD_NAME
```

Exemplo:
```
https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe
```

### Métodos HTTP suportados

A API aceita **GET** e **POST**, com quatro formas de passar parâmetros:[^3]
- Query string na URL
- `application/x-www-form-urlencoded`
- `application/json`
- `multipart/form-data` (obrigatório para upload de arquivos)

### Formato da resposta

Toda resposta é um objeto JSON com:[^3]
- `ok` (Boolean): `true` se a requisição teve sucesso
- `result`: resultado da consulta (quando `ok` é `true`)
- `description` (String): descrição do erro (quando `ok` é `false`)
- `error_code` (Integer): código do erro
- `parameters` (ResponseParameters): informações extras para tratamento automático de erros

***

## Recebimento de Atualizações (Updates)

Existem duas formas mutuamente exclusivas de receber updates:[^7][^3]

### getUpdates (Long Polling)

O bot faz requisições periódicas ao servidor para buscar atualizações pendentes:[^3]

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `offset` | Integer | ID do primeiro update a ser retornado |
| `limit` | Integer | Limite de updates (1-100, padrão 100) |
| `timeout` | Integer | Timeout em segundos para long polling |
| `allowed_updates` | Array of String | Tipos de update desejados |

### setWebhook (Push)

O Telegram envia um POST HTTPS para a URL especificada sempre que houver uma atualização:[^3]

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `url` | String | Sim | URL HTTPS para receber updates |
| `certificate` | InputFile | Não | Certificado público (self-signed) |
| `ip_address` | String | Não | IP fixo para envio |
| `max_connections` | Integer | Não | Máximo de conexões simultâneas (1-100, padrão 40) |
| `allowed_updates` | Array of String | Não | Tipos de update desejados |
| `drop_pending_updates` | Boolean | Não | Descartar updates pendentes |
| `secret_token` | String | Não | Token secreto para validação (header `X-Telegram-Bot-Api-Secret-Token`) |

**Portas suportadas para Webhook**: 443, 80, 88, 8443.[^3]

### Comparação: getUpdates vs Webhook

| Aspecto | getUpdates | Webhook |
|---------|-----------|---------|
| Mecanismo | Pull (polling) | Push (Telegram envia) |
| Latência | Maior (depende do intervalo de polling) | Menor (notificação imediata) |
| Configuração | Simples, sem servidor público | Requer HTTPS e IP público |
| Uso ideal | Desenvolvimento e testes | Produção[^7][^8] |
| Escalabilidade | Limitada | Alta |

### Objeto Update

O objeto `Update` contém um dos seguintes campos opcionais:[^3]

- `message` – Nova mensagem recebida
- `edited_message` – Mensagem editada
- `channel_post` – Post em canal
- `edited_channel_post` – Post editado em canal
- `business_connection` – Conexão com conta business
- `business_message` – Mensagem de conta business
- `inline_query` – Consulta inline
- `chosen_inline_result` – Resultado inline escolhido
- `callback_query` – Callback de botão inline
- `shipping_query` – Consulta de frete (pagamentos)
- `pre_checkout_query` – Pré-checkout (pagamentos)
- `poll` – Estado de enquete atualizado
- `poll_answer` – Resposta de enquete alterada
- `my_chat_member` – Status do bot no chat atualizado
- `chat_member` – Membro do chat atualizado
- `chat_join_request` – Pedido de entrada no chat
- `chat_boost` – Boost adicionado ao chat
- `removed_chat_boost` – Boost removido
- `message_reaction` – Reação em mensagem
- `message_reaction_count` – Contagem de reações
- `purchased_paid_media` – Mídia paga comprada

***

## Tipos Principais (Types)

### User

Representa um usuário ou bot do Telegram:[^3]

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Integer | Identificador único (até 52 bits) |
| `is_bot` | Boolean | Se é um bot |
| `first_name` | String | Primeiro nome |
| `last_name` | String | Último nome (opcional) |
| `username` | String | Username (opcional) |
| `language_code` | String | Idioma IETF (opcional) |
| `is_premium` | Boolean | Se é Premium (opcional) |
| `can_join_groups` | Boolean | Se pode entrar em grupos (apenas getMe) |
| `can_read_all_group_messages` | Boolean | Se pode ler todas mensagens (apenas getMe) |
| `supports_inline_queries` | Boolean | Se suporta inline queries (apenas getMe) |
| `can_connect_to_business` | Boolean | Se pode conectar a conta business (apenas getMe) |
| `has_main_web_app` | Boolean | Se tem Mini App principal (apenas getMe) |

### Chat

Representa um chat:[^3]

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Integer | Identificador único |
| `type` | String | "private", "group", "supergroup" ou "channel" |
| `title` | String | Título (grupos, supergrupos, canais) |
| `username` | String | Username (se disponível) |
| `first_name` | String | Primeiro nome (chat privado) |
| `is_forum` | Boolean | Se é fórum com tópicos |
| `is_direct_messages` | Boolean | Se é chat de mensagens diretas de canal |

### Message

Objeto principal que representa uma mensagem. Contém dezenas de campos opcionais dependendo do tipo de conteúdo:[^3]

- **Texto**: `text`, `entities`
- **Mídia**: `photo`, `video`, `audio`, `document`, `animation`, `sticker`, `voice`, `video_note`
- **Localização**: `location`, `venue`
- **Contato**: `contact`
- **Enquete**: `poll`
- **Jogo**: `game`
- **Fatura**: `invoice`, `successful_payment`
- **Checklist**: `checklist`
- **Presentes**: `gift`, `unique_gift`
- **Forum**: `forum_topic_created`, `forum_topic_edited`, `forum_topic_closed`
- **Serviço**: `new_chat_members`, `left_chat_member`, `pinned_message`, etc.
- **Teclado**: `reply_markup` (InlineKeyboardMarkup)

### MessageEntity

Define entidades especiais em texto:[^3]

| Tipo | Exemplo |
|------|---------|
| `mention` | @username |
| `hashtag` | #hashtag |
| `cashtag` | $USD |
| `bot_command` | /start |
| `url` | https://telegram.org |
| `email` | user@example.com |
| `phone_number` | +1-212-555-0123 |
| `bold` | Texto em negrito |
| `italic` | Texto em itálico |
| `underline` | Texto sublinhado |
| `strikethrough` | Texto tachado |
| `spoiler` | Texto spoiler |
| `blockquote` | Citação em bloco |
| `code` | Código inline |
| `pre` | Bloco de código |
| `text_link` | Link clicável |
| `text_mention` | Menção sem username |
| `custom_emoji` | Emoji personalizado |

***

## Lista Completa dos 165 Métodos (Bot API 9.4)

Todos os métodos organizados por categoria:[^4]

### Métodos Básicos do Bot

| Método | Descrição |
|--------|-----------|
| `getMe` | Informações do bot |
| `logOut` | Sair do servidor Bot API cloud |
| `close` | Fechar instância antes de migração |

### Envio de Mensagens

| Método | Descrição |
|--------|-----------|
| `sendMessage` | Enviar mensagem de texto |
| `sendPhoto` | Enviar foto |
| `sendAudio` | Enviar áudio |
| `sendDocument` | Enviar documento/arquivo |
| `sendVideo` | Enviar vídeo |
| `sendAnimation` | Enviar GIF/animação |
| `sendVoice` | Enviar mensagem de voz |
| `sendVideoNote` | Enviar nota de vídeo (circular) |
| `sendMediaGroup` | Enviar grupo de mídia (álbum) |
| `sendLocation` | Enviar localização |
| `sendVenue` | Enviar local/venue |
| `sendContact` | Enviar contato |
| `sendPoll` | Enviar enquete |
| `sendDice` | Enviar dado/emoji animado |
| `sendChatAction` | Enviar ação ("digitando...", etc.) |
| `sendSticker` | Enviar sticker |
| `sendGame` | Enviar jogo |
| `sendInvoice` | Enviar fatura/invoice |
| `sendPaidMedia` | Enviar mídia paga |
| `sendChecklist` | Enviar checklist |
| `sendGift` | Enviar presente |
| `sendMessageDraft` | Enviar rascunho de mensagem |

### Encaminhamento e Cópia

| Método | Descrição |
|--------|-----------|
| `forwardMessage` | Encaminhar mensagem |
| `forwardMessages` | Encaminhar múltiplas mensagens |
| `copyMessage` | Copiar mensagem (sem link de encaminhamento) |
| `copyMessages` | Copiar múltiplas mensagens |

### Edição de Mensagens

| Método | Descrição |
|--------|-----------|
| `editMessageText` | Editar texto de mensagem |
| `editMessageCaption` | Editar legenda |
| `editMessageMedia` | Editar mídia |
| `editMessageReplyMarkup` | Editar teclado inline |
| `editMessageLiveLocation` | Editar localização ao vivo |
| `editMessageChecklist` | Editar checklist |
| `stopMessageLiveLocation` | Parar localização ao vivo |
| `stopPoll` | Parar enquete |
| `deleteMessage` | Deletar mensagem |
| `deleteMessages` | Deletar múltiplas mensagens |

### Administração de Chat

| Método | Descrição |
|--------|-----------|
| `getChat` | Obter informações do chat |
| `getChatAdministrators` | Obter administradores |
| `getChatMemberCount` | Obter contagem de membros |
| `getChatMember` | Obter informações de um membro |
| `banChatMember` | Banir membro |
| `unbanChatMember` | Desbanir membro |
| `restrictChatMember` | Restringir membro |
| `promoteChatMember` | Promover membro a admin |
| `setChatAdministratorCustomTitle` | Definir título personalizado de admin |
| `banChatSenderChat` | Banir chat remetente |
| `unbanChatSenderChat` | Desbanir chat remetente |
| `setChatPermissions` | Definir permissões do chat |
| `setChatPhoto` | Definir foto do chat |
| `deleteChatPhoto` | Deletar foto do chat |
| `setChatTitle` | Definir título do chat |
| `setChatDescription` | Definir descrição do chat |
| `setChatStickerSet` | Definir sticker set do chat |
| `deleteChatStickerSet` | Remover sticker set |
| `pinChatMessage` | Fixar mensagem |
| `unpinChatMessage` | Desfixar mensagem |
| `unpinAllChatMessages` | Desfixar todas as mensagens |
| `leaveChat` | Sair do chat |
| `setChatMenuButton` | Definir botão do menu |
| `getChatMenuButton` | Obter botão do menu |

### Links de Convite

| Método | Descrição |
|--------|-----------|
| `exportChatInviteLink` | Exportar link primário |
| `createChatInviteLink` | Criar link de convite |
| `editChatInviteLink` | Editar link de convite |
| `revokeChatInviteLink` | Revogar link de convite |
| `createChatSubscriptionInviteLink` | Criar link de assinatura |
| `editChatSubscriptionInviteLink` | Editar link de assinatura |
| `approveChatJoinRequest` | Aprovar pedido de entrada |
| `declineChatJoinRequest` | Recusar pedido de entrada |

### Tópicos de Fórum

| Método | Descrição |
|--------|-----------|
| `createForumTopic` | Criar tópico |
| `editForumTopic` | Editar tópico |
| `closeForumTopic` | Fechar tópico |
| `reopenForumTopic` | Reabrir tópico |
| `deleteForumTopic` | Deletar tópico |
| `unpinAllForumTopicMessages` | Desfixar mensagens do tópico |
| `editGeneralForumTopic` | Editar tópico geral |
| `closeGeneralForumTopic` | Fechar tópico geral |
| `reopenGeneralForumTopic` | Reabrir tópico geral |
| `hideGeneralForumTopic` | Esconder tópico geral |
| `unhideGeneralForumTopic` | Mostrar tópico geral |
| `unpinAllGeneralForumTopicMessages` | Desfixar mensagens do tópico geral |
| `getForumTopicIconStickers` | Obter ícones de tópicos |

### Configurações do Bot

| Método | Descrição |
|--------|-----------|
| `setMyCommands` | Definir comandos |
| `deleteMyCommands` | Deletar comandos |
| `getMyCommands` | Obter comandos |
| `setMyName` | Definir nome |
| `getMyName` | Obter nome |
| `setMyDescription` | Definir descrição |
| `getMyDescription` | Obter descrição |
| `setMyShortDescription` | Definir descrição curta |
| `getMyShortDescription` | Obter descrição curta |
| `setMyDefaultAdministratorRights` | Definir direitos padrão de admin |
| `getMyDefaultAdministratorRights` | Obter direitos padrão |
| `setMyProfilePhoto` | Definir foto de perfil |
| `removeMyProfilePhoto` | Remover foto de perfil |

### Arquivos

| Método | Descrição |
|--------|-----------|
| `getFile` | Obter informações de arquivo para download |
| `uploadStickerFile` | Upload de arquivo para sticker |
| `getUserProfilePhotos` | Obter fotos de perfil do usuário |
| `getUserProfileAudios` | Obter áudios de perfil |

### Stickers

| Método | Descrição |
|--------|-----------|
| `sendSticker` | Enviar sticker |
| `getStickerSet` | Obter sticker set |
| `getCustomEmojiStickers` | Obter emoji stickers |
| `createNewStickerSet` | Criar novo sticker set |
| `addStickerToSet` | Adicionar sticker ao set |
| `setStickerPositionInSet` | Alterar posição no set |
| `deleteStickerFromSet` | Remover do set |
| `replaceStickerInSet` | Substituir no set |
| `setStickerSetThumbnail` | Definir thumbnail |
| `setCustomEmojiStickerSetThumbnail` | Thumbnail de emoji personalizado |
| `setStickerSetTitle` | Definir título |
| `deleteStickerSet` | Deletar set |
| `setStickerEmojiList` | Definir emojis do sticker |
| `setStickerKeywords` | Definir keywords |
| `setStickerMaskPosition` | Definir posição da máscara |

### Inline Mode

| Método | Descrição |
|--------|-----------|
| `answerInlineQuery` | Responder consulta inline |
| `savePreparedInlineMessage` | Salvar mensagem inline preparada |
| `answerWebAppQuery` | Responder consulta de Web App |

### Pagamentos

| Método | Descrição |
|--------|-----------|
| `sendInvoice` | Enviar fatura |
| `createInvoiceLink` | Criar link de fatura |
| `answerShippingQuery` | Responder consulta de frete |
| `answerPreCheckoutQuery` | Responder pré-checkout |
| `refundStarPayment` | Reembolsar pagamento em Stars |
| `getStarTransactions` | Obter transações em Stars |
| `getMyStarBalance` | Obter saldo em Stars |

### Jogos

| Método | Descrição |
|--------|-----------|
| `sendGame` | Enviar jogo |
| `setGameScore` | Definir pontuação |
| `getGameHighScores` | Obter melhores pontuações |

### Presentes (Gifts)

| Método | Descrição |
|--------|-----------|
| `sendGift` | Enviar presente |
| `getAvailableGifts` | Obter presentes disponíveis |
| `getUserGifts` | Obter presentes do usuário |
| `getChatGifts` | Obter presentes do chat |
| `convertGiftToStars` | Converter presente em Stars |
| `upgradeGift` | Fazer upgrade de presente |
| `transferGift` | Transferir presente |
| `giftPremiumSubscription` | Presentear assinatura Premium |

### Contas Business

| Método | Descrição |
|--------|-----------|
| `getBusinessConnection` | Obter conexão business |
| `readBusinessMessage` | Marcar mensagem como lida |
| `deleteBusinessMessages` | Deletar mensagens business |
| `setBusinessAccountName` | Definir nome da conta |
| `setBusinessAccountBio` | Definir bio |
| `setBusinessAccountUsername` | Definir username |
| `setBusinessAccountProfilePhoto` | Definir foto de perfil |
| `removeBusinessAccountProfilePhoto` | Remover foto de perfil |
| `setBusinessAccountGiftSettings` | Configurar presentes |
| `getBusinessAccountGifts` | Obter presentes da conta |
| `getBusinessAccountStarBalance` | Obter saldo em Stars |
| `transferBusinessAccountStars` | Transferir Stars |

### Stories

| Método | Descrição |
|--------|-----------|
| `postStory` | Publicar story |
| `editStory` | Editar story |
| `deleteStory` | Deletar story |
| `repostStory` | Repostar story |

### Verificação e Outras

| Método | Descrição |
|--------|-----------|
| `verifyUser` | Verificar usuário |
| `verifyChat` | Verificar chat |
| `removeUserVerification` | Remover verificação de usuário |
| `removeChatVerification` | Remover verificação de chat |
| `setMessageReaction` | Definir reação em mensagem |
| `setUserEmojiStatus` | Definir status emoji do usuário |
| `getUserChatBoosts` | Obter boosts do usuário |
| `setPassportDataErrors` | Sinalizar erros no Passport |
| `editUserStarSubscription` | Editar assinatura Star do usuário |
| `approveSuggestedPost` | Aprovar post sugerido |
| `declineSuggestedPost` | Recusar post sugerido |

***

## Sistema de Pagamentos

### Telegram Stars (Bens Digitais)

Para venda de **bens e serviços digitais**, todas as transações devem ser feitas exclusivamente em **Telegram Stars** (moeda virtual com tag `XTR`). Usuários compram Stars dentro do Telegram via Apple Pay ou Google Pay.[^9]

Fluxo de pagamento:[^10][^9]
1. Bot envia uma mensagem de invoice via `sendInvoice` ou gera link com `createInvoiceLink`
2. Usuário pressiona o botão "Pay"
3. Telegram envia update `pre_checkout_query` ao bot
4. Bot responde com `answerPreCheckoutQuery` em até **10 segundos**
5. Pagamento é processado
6. Telegram envia mensagem `successful_payment` ao bot
7. Bot entrega o produto/serviço

### Pagamentos Físicos (Provedores)

Para **bens físicos**, é possível usar provedores de pagamento terceiros (Stripe, etc.). O bot pode solicitar:[^11][^10]
- Endereço de entrega
- Telefone
- E-mail
- Dados de cartão de crédito

### Regras Importantes

- Bens digitais **devem** usar exclusivamente Telegram Stars em apps mobile (por exigência Apple/Google)[^9]
- Bens físicos podem usar outras moedas e provedores
- O bot é responsável por entregar o produto após confirmação[^10]
- Reembolsos são possíveis via `refundStarPayment`[^4]

***

## Mini Apps (Web Apps)

Mini Apps permitem criar interfaces HTML5 completas dentro do Telegram. Possibilidades:[^12]

- Lojas online
- Jogos
- Dashboards
- Formulários complexos
- Qualquer aplicação web

### Formas de abrir uma Mini App

- **Keyboard Button** (`web_app` type): envia dados de volta ao bot via `Telegram.WebApp.sendData`[^12]
- **Inline Button**: abre Mini App a partir de botão inline
- **Menu Button**: via botão do menu do bot
- **Direct Link**: via `t.me` deep link
- **Attachment Menu**: via menu de anexos
- **Home Screen Shortcut**: atalho na tela inicial do dispositivo (Bot API 8.0+)[^13]

### Recursos da Mini App (Bot API 8.0+)

Introduzidos na versão 8.0:[^13]
- Modo full-screen
- Atalhos na home screen
- Planos de assinatura
- Status de emoji
- Compartilhamento de mídia e download
- Acesso a geolocalização
- Rastreamento de movimento do dispositivo
- Personalização da tela de carregamento
- Otimizações específicas de hardware

***

## Inline Mode

O modo inline permite que usuários interajam com o bot diretamente a partir do campo de texto em **qualquer chat**, digitando `@username_do_bot consulta`.[^14][^15]

### Fluxo

1. Usuário digita `@bot query` em qualquer chat
2. Telegram envia `InlineQuery` ao bot
3. Bot responde com `answerInlineQuery` contendo resultados
4. Usuário seleciona um resultado
5. Resultado é enviado ao chat atual

### Tipos de resultado inline

- `InlineQueryResultArticle` – Artigos de texto
- `InlineQueryResultPhoto` – Fotos
- `InlineQueryResultGif` – GIFs
- `InlineQueryResultVideo` – Vídeos
- `InlineQueryResultAudio` – Áudios
- `InlineQueryResultDocument` – Documentos
- `InlineQueryResultLocation` – Localizações
- `InlineQueryResultVenue` – Locais
- `InlineQueryResultContact` – Contatos
- `InlineQueryResultGame` – Jogos
- `InlineQueryResultCachedPhoto`, `InlineQueryResultCachedGif`, etc. – Variantes com mídia já no servidor

***

## Teclados e Botões

### Reply Keyboard

Teclado que substitui o teclado padrão do dispositivo. Opções:
- `resize_keyboard`: redimensiona o teclado
- `one_time_keyboard`: oculta após uso
- `selective`: mostra para usuários específicos
- `persistent`: mantém visível

### Inline Keyboard

Botões que aparecem abaixo de mensagens. Cada botão pode ter:[^3]
- `url` – Abre uma URL
- `callback_data` – Envia dados de callback ao bot
- `web_app` – Abre uma Mini App
- `login_url` – Login via Telegram
- `switch_inline_query` – Ativa modo inline
- `switch_inline_query_current_chat` – Modo inline no chat atual
- `pay` – Botão de pagamento

***

## Rate Limits e Limites

### Limites de Envio de Mensagens

| Limite | Valor Aproximado |
|--------|-----------------|
| Mensagens para o mesmo chat | ~1 por segundo[^16][^17] |
| Mensagens para chats diferentes | ~30 por segundo[^18][^16] |
| Operações em grupo/canal | ~20 por minuto[^17] |
| Broadcast (notificações em massa) | ~30 por segundo total[^18] |

Os limites são **dinâmicos** e dependem de fatores como idade do bot, histórico de uso e tipo de requisição. O Telegram não publica números fixos oficiais.[^19][^16]

### Limites de Arquivos

| Tipo | API Padrão | Servidor Local |
|------|-----------|----------------|
| Upload | 50 MB | 2.000 MB (2 GB)[^2][^17] |
| Download | 20 MB | 2.000 MB (2 GB)[^2][^17] |
| Fotos via URL | 5 MB | – |

### Tratamento de Erros 429

Ao receber erro `429 Too Many Requests`:[^19]
- A resposta inclui campo `retry_after` com tempo em segundos
- Implementar backoff exponencial
- Usar sistemas de fila
- Considerar usar múltiplos bots para cargas altas

***

## Servidor Local da Bot API

É possível rodar um servidor local da Bot API usando o código aberto disponível em `github.com/tdlib/telegram-bot-api`. Vantagens:[^20][^17][^2]

- Upload e download de arquivos até **2 GB**
- Suporte a **HTTP** (não requer HTTPS) para webhooks
- Webhook em **qualquer IP e porta**
- Até **100.000 conexões** simultâneas de webhook
- Sem limite de tamanho em downloads
- Processamento local de atualizações (menor latência)
- Acesso ao caminho absoluto de arquivos baixados

***

## Telegram Passport

Permite que bots solicitem documentos de identidade verificados dos usuários. O método `setPassportDataErrors` permite sinalizar erros nos dados fornecidos.[^3]

Tipos de dados que podem ser solicitados:
- Documento de identidade pessoal
- Endereço residencial
- Telefone
- E-mail

***

## Contas Business

Bots podem ser conectados a contas Telegram Business para processar e responder mensagens em nome de empresas. Funcionalidades:[^13]

- Horário de funcionamento
- Localização do negócio
- Respostas rápidas
- Mensagens automatizadas (saudação, ausência)
- Página inicial customizada
- Suporte a chatbot

***

## Changelog Recente

### Bot API 9.4 (Fevereiro 2026)
Atualização mais recente, incluindo novos recursos e correções.[^13]

### Bot API 9.3
- Tópicos em chats privados
- Novos recursos de presentes[^13]

### Bot API 9.2
- Checklists
- Presentes expandidos
- Mensagens diretas em canais
- Posts sugeridos[^13]

### Bot API 9.1
- Checklists
- Presentes[^13]

### Bot API 9.0
- Contas Business expandidas
- Mini Apps aprimorados
- Presentes
- Recursos Telegram Premium[^13]

### Bot API 8.0
- 10 novos recursos para Mini Apps[^13]
- Assinaturas via Stars
- Modo full-screen
- Atalhos na home screen
- Status emoji
- Compartilhamento de mídia
- Geolocalização
- Motion tracking
- Personalização de tela de carregamento

***

## Boas Práticas para SaaS

### Arquitetura Recomendada

- Usar **webhook** em produção para menor latência[^8][^7]
- Implementar **sistema de filas** para gerenciar rate limits
- Usar `secret_token` no webhook para segurança
- Armazenar o token do bot de forma segura (variáveis de ambiente)
- Implementar retry com backoff exponencial para erros 429

### Segurança

- Nunca expor o token do bot em código público[^5]
- Validar o `secret_token` em requisições de webhook
- Usar HTTPS com certificado válido
- Implementar validação de `update_id` para evitar replays

### Monetização

Opções disponíveis para bots:[^9]
- **Telegram Stars**: venda de bens digitais (obrigatório em mobile)
- **Assinaturas**: cobranças periódicas em Stars
- **Pagamentos físicos**: via provedores como Stripe
- **Revenue sharing**: 50% da receita de anúncios em canais e bots
- **Programas de afiliados**: comissões por referências
- **Mídia paga**: fotos e vídeos que precisam ser pagos para visualização

### Performance

- Usar servidor local da Bot API para arquivos grandes e alta carga[^17]
- Pré-processar e cachear respostas frequentes
- Usar `sendChatAction` para feedback visual ao usuário
- Respeitar o campo `retry_after` das respostas 429[^19]

***

## Links Oficiais de Referência

| Recurso | URL |
|---------|-----|
| Documentação Bot API | https://core.telegram.org/bots/api |
| Introdução a Bots | https://core.telegram.org/bots |
| Changelog | https://core.telegram.org/bots/api-changelog |
| Pagamentos (Digital) | https://core.telegram.org/bots/payments-stars |
| Pagamentos (Físico) | https://core.telegram.org/bots/payments |
| Mini Apps | https://core.telegram.org/bots/webapps |
| Inline Mode | https://core.telegram.org/bots/inline |
| Servidor Local | https://github.com/tdlib/telegram-bot-api |
| Telegram API (MTProto) | https://core.telegram.org/api |
| Gateway API | https://core.telegram.org/gateway |

---

## References

1. [[PDF] The 21st Century Voice Contemporary And Traditiona](https://core.telegram.org) - We offer three kinds of APIs for developers. The Bot API allows you to easily create programs that u...

2. [Telegram Bots API](https://opengram.dev/docs/intro/telegram-bots-api/) - General Information

3. [Telegram Bot API](https://core.telegram.org/bots/api) - The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram. To...

4. [Methods | Telegram Bot SDK](https://tg-bot-sdk.website/api/) - Telegram Bot API 9.4 — 165 methods

5. [How to Create a Telegram Bot: Set Up BotFather ... - Why Turrit](https://iturrit.com/blog/create-telegram-bot-botfather-api-first-message) - Turrit is a powerful communication tool based on Telegram, dedicated to providing a superb, simple, ...

6. [How to Create a Telegram Bot via BotFather](https://smartbotsland.com/create-edit-bot/get-token-botfather-telegram/) - Learn how to use BotFather in Telegram with this simple step-by-step guide. Create your first bot, s...

7. [Telegram Bot getUpdates VS setWebhook](https://stackoverflow.com/questions/40033150/telegram-bot-getupdates-vs-setwebhook) - I want to develop a bot for a business! I don't know that using getUpdates method for develop a wind...

8. [Evaluating getUpdates Versus setWebhook in Telegram ...](https://community.latenode.com/t/evaluating-getupdates-versus-setwebhook-in-telegram-bot-api/3850) - I’ve been building a Telegram bot using a C# framework and I’m trying to decide between two methods ...

9. [Bot Payments API for Digital Goods and Services](https://core.telegram.org/bots/payments-stars) - Telegram Bot Payments are a free and open platform that allows sellers to accept payments for goods ...

10. [Bot Payments API](https://core.telegram.org/bots/payments) - Bot Payments API. Telegram Bot Payments are a free and open platform that allows sellers to accept p...

11. [Bot Payments API - GitHub Pages](https://josxa.github.io/telegram-bot-api-docs/core.telegram.org/bots/payments.html) - You can accept payments from Telegram users via Telegram Bots. Note: This article is intended for bo...

12. [Telegram Mini Apps](https://core.telegram.org/bots/webapps) - With Mini Apps developers can use JavaScript to create infinitely flexible interfaces that can be la...

13. [Bot API changelog - Telegram APIs](https://core.telegram.org/bots/api-changelog) - The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram. To...

14. [Inline Mode - A guide to Telegram.Bot .NET library](https://telegrambots.github.io/book/3/inline.html) - Comprehensive documentation to using the Telegram.Bot library and Bot API for building .NET bots for...

15. [Sending the inline query result](https://core.telegram.org/api/bots/inline) - Users can interact with your bot via inline queries, straight from the text input field in any chat.

16. [How to solve rate limit errors from Telegram Bot API ...](https://gramio.dev/rate-limits) - How to solve rate limit (too many requests) errors from Telegram Bot API with GramIO using auto-retr...

17. [Local Telegram Bot API: advantages, limitations of the standard API ...](https://bigmike.help/en/case/local-telegram-bot-api-advantages-limitations-of-the-standard-api-and-set-eb4a3b/) - Complete guide to installing and configuring the Local Telegram Bot API with Docker. Overview of the...

18. [Understanding Telegram API Rate Limits - BytePlus](https://www.byteplus.com/en/topic/450604) - Explore a detailed guide on Telegram API rate limits to optimize your bot and application developmen...

19. [How to Optimize Telegram Bot Rate Limits Without Errors](https://telegramhpc.com/news/1216/) - A 1 % 429 rate is healthy; anything higher signals architectural debt. Log method-level data, separa...

20. [tdlib/telegram-bot-api](https://github.com/tdlib/telegram-bot-api) - Telegram Bot API server . Contribute to tdlib/telegram-bot-api development by creating an account on...

