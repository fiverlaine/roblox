# Fluxo BSPay UTMify

## Resumo
Este documento registra o comportamento atual da integracao de pagamentos com a BSPay e o envio de eventos para a UTMify no projeto `roblox-vault`.

## Fluxo atual
1. A funcao `create-payment` cria o pagamento na tabela `payments` com status `pending`.
2. Existe um trigger no banco chamado `utmify_payments` que envia o `INSERT` de `payments` para a funcao `utmify-event`.
3. A funcao `utmify-event` converte `pending` para `waiting_payment` e envia o pedido para a UTMify.
4. Quando a BSPay aprova o pagamento, a funcao `bspay-webhook` recebe o webhook e atualiza o registro para `paid`.

## Problema encontrado
As vendas pendentes estavam sendo enviadas corretamente porque o banco possui um trigger `AFTER INSERT` em `public.payments` apontando para `utmify-event`.

As vendas aprovadas nao estavam sendo enviadas porque a funcao `bspay-webhook` publicada em producao nao disparava nenhum envio para a UTMify depois da confirmacao do pagamento.

## Correcao aplicada
Foi ajustado o arquivo `supabase/functions/bspay-webhook/index.ts` para:

- Disparar o `utmify-event` quando o webhook da BSPay confirmar um pagamento.
- Nao duplicar a atualizacao de negocio quando o pagamento ja estiver `paid`.
- Reenviar o evento `paid` para a UTMify se o pagamento ja estiver aprovado no banco, mas ainda nao existir um log de sucesso `UTMify_paid` em `capi_logs`.
- Evitar duplicidade quando o evento `paid` ja tiver sido enviado com sucesso.

## Observacao importante
O trigger `utmify_payments` existe no banco de producao, mas nao esta versionado nas migrations do repositório. Se o ambiente for recriado do zero, o envio automatico de `pending` para a UTMify nao sera restaurado sem recriar esse trigger.
