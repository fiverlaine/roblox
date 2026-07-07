# Project: Documentação API's SuitPay

### Seja bem-vindo(a)!

Aqui você vai encontrar tudo que precisa para realizar a sua integração da melhor forma possível. Venha conosco e ajudaremos a alavancar o seu negócio!

# Autenticação

Para acessar os EndPoints é necessário gerar as chaves de acesso da conta do usuário. Isto é feito acessando a conta pelo [<b>portal</b>](https://web.suitpay.app) com o nome de usuário e senha do cliente.

Dentro da conta, basta clicar no menu lateral VENDAS -> GATEWAY DE PAGAMENTO -> Chaves API, e seguir as instruções na tela para Gerar as Chaves.

Será exibido o **Client ID (ci)** e **Client Secret (cs)** ao final do procedimento. Estes dados devem ser armazenados em local seguro, pois não será possível visualizar as chaves novamente, apenas gerar novas chaves, revogando as chaves anteriores.

As chaves devem ser enviadas juntos da requisição no cabeçalho HTTP das mesmas com os nomes **ci** para _Client ID_ e **cs** para _Client Secret_

# Variável de ambiente

**Sandbox**

host: [https://sandbox.ws.suitpay.app](https://)

**Produção**

host: [https://ws.suitpay.app](https://)

# Retornos

200 - Sucesso.

401 - Falha na autenticação.

400 - Erro na solicitação, verifique o response do retorno.

500 - Erro interno.

# Webhook

Você pode validar se as chamadas para o seu webhook são válidas, caso venha dos seguintes IP's:

3.132.137.46

### Webhook (PIX Cash-in)

É necessário a criação de um webhook para o recebimento dos status das transações em seu sistema.

O webhook deve ser do tipo Rest, aceitar requisições POST e receber os seguintes dados no Request (JSON):

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>typeTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da transação (PIX).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>statusTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da transação (PAID_OUT, CHARGEBACK)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor do pagamento</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>payerName</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do pagador</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>payerTaxId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Documento do pagador</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>paymentDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data e hora do pagamento. (dd/MM/yyyy HH:mm:ss)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>paymentCode</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código de pagamento</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>requestNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>requestNumber enviado na requisição</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>hash</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código hash do conteúdo do JSON</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**statusTransaction:**

PAID_OUT - Transação paga  
CHARGEBACK - Estorno

**hash:**

Este código de segurança é uma verificação de integridade, para garantir que o Webhook que você recebeu foi gerado e enviado pelo sistema da SuitPay. Para validá-lo, siga as etapas abaixo:

1. Concatene todos os valores dos campos (exceto o próprio hash) em uma única string. Mantenha a ordem dos valores contidos consistente com a ordem dos valores recebidos no JSON.
2. Concatene seu ClientSecret (cs) com o resultado da etapa 1.
3. Calcule o hash SHA-256 da string resultante da etapa 2.
4. Compare o hash SHA-256 resultante com o campo hash na carga recebida. Se corresponder, o JSON que você recebeu é válido.

### Webhook (PIX Cash-out)

É necessário a criação de um webhook para o recebimento dos status das transações em seu sistema.

O webhook deve ser do tipo Rest, aceitar requisições POST e receber os seguintes dados no Request (JSON):

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>typeTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da transação (PIX_CASHOUT).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>statusTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da transação (PAID_OUT, CANCELED)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor enviado.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>destinationName</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do destinatário.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>destinationTaxId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Documento do destinatário.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>destinationBank</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do banco destinatário.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>hash</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código hash do conteúdo do JSON</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**statusTransaction:**

PAID_OUT - Transação paga  
CANCELED - Transação cancelada (Pagamento cancelado ou devolvido)

**hash:**

Este código de segurança é uma verificação de integridade, para garantir que o Webhook que você recebeu foi gerado e enviado pelo sistema da SuitPay. Para validá-lo, siga as etapas abaixo:

1. Concatene todos os valores dos campos (exceto o próprio hash) em uma única string. Mantenha a ordem dos valores contidos consistente com a ordem dos valores recebidos no JSON.
2. Concatene seu ClientSecret (cs) com o resultado da etapa 1.
3. Calcule o hash SHA-256 da string resultante da etapa 2.
4. Compare o hash SHA-256 resultante com o campo hash na carga recebida. Se corresponder, o JSON que você recebeu é válido.

### Webhook (Cartão)

É necessário a criação de um webhook para o recebimento dos status das transações em seu sistema.

O webhook deve ser do tipo Rest, aceitar requisições POST e receber os seguintes dados no Request (JSON):

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>typeTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da transação (CARD).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>statusTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da transação (PAID_OUT, CANCELED, CHARGEBACK, WAITING_FOR_APPROVAL, PAYMENT_ACCEPT)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**statusTransaction:**

PAID_OUT - Transação paga  
CANCELED - Transação cancelada  
CHARGEBACK - Chargeback  
WAITING_FOR_APPROVAL - Aguardando aprovação  
PAYMENT_ACCEPT - Pagamento aprovado

### Webhook (Boleto)

É necessário a criação de um webhook para o recebimento dos status das transações em seu sistema.

O webhook deve ser do tipo Rest, aceitar requisições POST e receber os seguintes dados no Request (JSON):

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>typeTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da transação (BOLETO).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>statusTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da transação (PAID_OUT, CANCELED, UNPAID, CHARGEBACK)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor pago</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>requestNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do pedido enviado no momento da criação do boleto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>paymentDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de pagamento do boleto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>hash</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código hash do conteúdo do JSON</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**statusTransaction:**

PAID_OUT - Transação paga  
CANCELED - Transação cancelada  
UNPAID - Transação não paga  
CHARGEBACK - Chargeback

**hash:**

Este código de segurança é uma verificação de integridade, para garantir que o Webhook que você recebeu foi gerado e enviado pelo sistema da SuitPay. Para validá-lo, siga as etapas abaixo:

1. Concatene todos os valores dos campos (exceto o próprio hash) em uma única string. Mantenha a ordem dos valores contidos consistente com a ordem dos valores recebidos no JSON.
2. Concatene seu ClientSecret (cs) com o resultado da etapa 1.
3. Calcule o hash SHA-256 da string resultante da etapa 2.
4. Compare o hash SHA-256 resultante com o campo hash na carga recebida. Se corresponder, o JSON que você recebeu é válido.

### Compatibilidade Retroativa:

A Suit pode, periodicamente, **adicionar novos campos ao payload dos webhooks** enviados, com o objetivo de fornecer informações adicionais e enriquecer a integração.

Para garantir a **compatibilidade futura** da sua aplicação com as atualizações da Suit, **é fundamental que o seu sistema ignore quaisquer campos desconhecidos** que possam ser incluídos na estrutura do webhook.

**Recomendação:**  
Implemente a serialização e/ou parsing do webhook de forma tolerante, garantindo que **campos adicionais não afetem o funcionamento atual da integração**.

#### Exemplo:

Se hoje você recebe:

```json
{
  "idTransaction": "12345",
  "statusTransaction": "PAID_OUT"
}
```

A Suit pode, futuramente, enviar:

```json
{
  "idTransaction": "12345",
  "statusTransaction": "PAID_OUT",
  "paymentDate": "2025-07-23T14:00:00Z",
  "channel": "api"
}
```

Seu sistema deve continuar operando normalmente, mesmo sem tratar os campos `paymentDate` e `channel`.

**Importante:**  
Quebras de integração causadas pela rejeição de campos desconhecidos são de responsabilidade do integrador. Para evitar esse tipo de problema, siga sempre as práticas de tolerância descritas acima.

# Endpoints

# 📁 Collection: Gateway de Cartão

Coleção com os endpoints /card e /cancel do Gateway V3.

# Autenticação

Para acessar os EndPoints é necessário gerar as chaves de acesso da conta do usuário. Isto é feito acessando a conta pelo [<b>portal</b>](https://web.suitpay.app) com o nome de usuário e senha do cliente.

Dentro da conta, basta clicar no menu lateral GATEWAY/CHECKOUT, depois Checkout e seguir as instruções na tela para Gerar as Chaves.

Será exibido o **Client ID (ci)** e **Client Secret (cs)** ao final do procedimento. Estes dados devem ser armazenados em local seguro, pois não será possível visualizar as chaves novamente, apenas gerar novas chaves, revogando as chaves anteriores.

As chaves devem ser enviadas juntos da requisição no cabeçalho HTTP das mesmas com os nomes **ci** para _Client ID_ e **cs** para _Client Secret_

**Para testes de cenários de autorização, utilize os seguintes cartões:**

- **2430 1695 1394 8900** — cartão válido, retornará pagamento **aprovado**
- **2375 5333 4153 2425** — cartão válido, retornará pagamento **recusado**

Os campos **expirationMonth**, **expirationYear** e **CVV** podem receber quaisquer valores válidos, desde que respeitem o formato exigido pela bandeira.

## End-point: Gerar Transação de Cartão

Endpoint para criação de venda de cartão. Retorna um objeto do tipo TransactionCardResponseV3Dto.

Opcionais:

\*client.address

\*webhookUrl

### Method: POST

> ```
> {{host}}/api/v3/gateway/card
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value |
| ------------ | ----- |
| ci           |       |

### Headers

| Content-Type | Value |
| ------------ | ----- |
| cs           |       |

### Body (**raw**)

```json
{
  "requestNumber": "{{$randomUUID}}",
  "card": {
    "number": "4176660000000100",
    "expirationMonth": "01",
    "expirationYear": "2050",
    "cvv": "000",
    "installment": 1,
    "amount": 1
  },
  "client": {
    "name": "Edward Alves Rabelo Neto",
    "document": "02578565101",
    "phoneNumber": "62999599619",
    "email": "edwardneto@suitpay.app",
    "address": {
      "codIbge": "5208707",
      "street": "Rua Paraíba",
      "number": "01",
      "complement": "",
      "zipCode": "74663-520",
      "neighborhood": "Goiânia 2",
      "city": "Goiânia",
      "state": "GO"
    }
  },
  "products": [
    {
      "productName": "Aula Teste",
      "idCheckout": "3978",
      "quantity": 1,
      "value": 1
    }
  ],
  "callbackUrl": "https://webhook.site/"
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "transactionId": "1abc79f6-8f82-4653-bec8-12995b1ebe85",
  "response": "OK",
  "statusTransaction": "PAYMENT_ACCEPT",
  "acquirerMessage": "ACCEPTED",
  "msg": "Sucesso"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "transactionId": "489765dc-fe87-4dd0-95fc-543834123fdf",
  "response": "REJECTED",
  "statusTransaction": "UNPAID",
  "acquirerMessage": "AUTHORIZER_REJECTED",
  "msg": "Erro ao realizar pagamento por cartão de crédito."
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "transactionId": null,
  "response": "WRONG_DATA_FORMAT",
  "statusTransaction": "CANCELED",
  "acquirerMessage": null,
  "msg": "Formato de dados inválidos, verifique os dados e tente novamente.{client.document}."
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Cancelar Transação de Cartão

Endpoint para cancelamento de transação. Retorna HTTP 200 se o cancelamento for efetuado ou HTTP 400 em caso de erro.

### Method: POST

> ```
> {{host}}/api/v3/gateway/cancel?transactionId=eccd3577-cc0a-4d28-bee2-dc5569ea7e1d
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Query Params

| Param         | value                                |
| ------------- | ------------------------------------ |
| transactionId | {{transactionId}}                    |
| transactionId | eccd3577-cc0a-4d28-bee2-dc5569ea7e1d |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "transactionId": "6d8e0eb7-78c7-4499-b153-d83b0bc99ba1",
  "response": "OK",
  "statusTransaction": "CHARGEBACK",
  "acquirerMessage": "",
  "msg": "Success"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "transactionId": "",
  "response": "WRONG_DATA_FORMAT",
  "statusTransaction": "CANCELED",
  "acquirerMessage": "Formato de dados inválidos, verifique os dados e tente novamente.",
  "msg": "descrição do erro"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Simulador de Taxas

Endpoint para simular as parcelas finais de um valor, considerando a taxa de cada cliente. Pode ser considerada apenas as taxas do cartão Visa.

### Method: GET

> ```
> {{host}}/api/v1/gateway/fee-simulator-gateway?value=100
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Query Params

| Param | value |
| ----- | ----- |
| value | 100   |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "list": [
    {
      "creditCardBanner": "Visa",
      "valueDebito": 102.03,
      "valueCredito": 103.08,
      "value2x": 111.25,
      "value3x": 113.02,
      "value4x": 114.84,
      "value5x": 116.73,
      "value6x": 118.67,
      "value7x": 120.69,
      "value8x": 122.77,
      "value9x": 124.92,
      "value10x": 127.16,
      "value11x": 129.47,
      "value12x": 131.87,
      "installment2x": 55.63,
      "installment3x": 37.67,
      "installment4x": 28.71,
      "installment5x": 23.35,
      "installment6x": 19.78,
      "installment7x": 17.24,
      "installment8x": 15.35,
      "installment9x": 13.88,
      "installment10x": 12.72,
      "installment11x": 11.77,
      "installment12x": 10.99
    },
    {
      "creditCardBanner": "Mastercard",
      "valueDebito": 102.03,
      "valueCredito": 109.54,
      "value2x": 111.25,
      "value3x": 113.02,
      "value4x": 114.84,
      "value5x": 116.73,
      "value6x": 118.67,
      "value7x": 120.69,
      "value8x": 122.77,
      "value9x": 124.92,
      "value10x": 127.16,
      "value11x": 129.47,
      "value12x": 131.87,
      "installment2x": 55.63,
      "installment3x": 37.67,
      "installment4x": 28.71,
      "installment5x": 23.35,
      "installment6x": 19.78,
      "installment7x": 17.24,
      "installment8x": 15.35,
      "installment9x": 13.88,
      "installment10x": 12.72,
      "installment11x": 11.77,
      "installment12x": 10.99
    },
    {
      "creditCardBanner": "Elo",
      "valueDebito": 102.03,
      "valueCredito": 109.54,
      "value2x": 111.25,
      "value3x": 113.02,
      "value4x": 114.84,
      "value5x": 116.73,
      "value6x": 118.67,
      "value7x": 120.69,
      "value8x": 122.77,
      "value9x": 124.92,
      "value10x": 127.16,
      "value11x": 129.47,
      "value12x": 131.87,
      "installment2x": 55.63,
      "installment3x": 37.67,
      "installment4x": 28.71,
      "installment5x": 23.35,
      "installment6x": 19.78,
      "installment7x": 17.24,
      "installment8x": 15.35,
      "installment9x": 13.88,
      "installment10x": 12.72,
      "installment11x": 11.77,
      "installment12x": 10.99
    },
    {
      "creditCardBanner": "American Express",
      "valueDebito": 102.03,
      "valueCredito": 109.54,
      "value2x": 111.25,
      "value3x": 113.02,
      "value4x": 114.84,
      "value5x": 116.73,
      "value6x": 118.67,
      "value7x": 120.69,
      "value8x": 122.77,
      "value9x": 124.92,
      "value10x": 127.16,
      "value11x": 129.47,
      "value12x": 131.87,
      "installment2x": 55.63,
      "installment3x": 37.67,
      "installment4x": 28.71,
      "installment5x": 23.35,
      "installment6x": 19.78,
      "installment7x": 17.24,
      "installment8x": 15.35,
      "installment9x": 13.88,
      "installment10x": 12.72,
      "installment11x": 11.77,
      "installment12x": 10.99
    },
    {
      "creditCardBanner": "Hipercard",
      "valueDebito": 102.03,
      "valueCredito": 109.54,
      "value2x": 111.25,
      "value3x": 113.02,
      "value4x": 114.84,
      "value5x": 116.73,
      "value6x": 118.67,
      "value7x": 120.69,
      "value8x": 122.77,
      "value9x": 124.92,
      "value10x": 127.16,
      "value11x": 129.47,
      "value12x": 131.87,
      "installment2x": 55.63,
      "installment3x": 37.67,
      "installment4x": 28.71,
      "installment5x": 23.35,
      "installment6x": 19.78,
      "installment7x": 17.24,
      "installment8x": 15.35,
      "installment9x": 13.88,
      "installment10x": 12.72,
      "installment11x": 11.77,
      "installment12x": 10.99
    }
  ]
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Consultar Taxas de Cartão

Endpoint para a consulta das taxas de cartão por usuário.

### Method: GET

> ```
> {{host}}/api/v1/gateway/user-card-fees
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "debito": 1.99,
  "credito": 8.71,
  "credito2x": 10.11,
  "credito3x": 11.52,
  "credito4x": 12.92,
  "credito5x": 14.33,
  "credito6x": 15.73,
  "credito7x": 17.14,
  "credito8x": 18.55,
  "credito9x": 19.95,
  "credito10x": 21.36,
  "credito11x": 22.76,
  "credito12x": 24.17
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Recorrência de Cartão

Coleção de endpoints para gerenciamento de recorrências.

**Cabeçalhos de Autorização:**

- **ci**: client_id
- **cs**: client_secret

Dominios para **statusTransaction**

| Valor                | Descrição                                                                       |
| -------------------- | ------------------------------------------------------------------------------- |
| PAID_OUT             | Transação concluída com sucesso e os fundos foram transferidos.                 |
| CANCELED             | Transação foi cancelada.                                                        |
| UNPAID               | Transação não foi paga.                                                         |
| CHARGEBACK           | Transação sofreu chargeback, ou seja, estorno solicitado pela instituição.      |
| WAITING_FOR_APPROVAL | Transação está aguardando aprovação.                                            |
| PAYMENT_ACCEPT       | Pagamento foi aceito; a transação foi autorizada pela adquirente.               |
| OK                   | Transação foi processada com sucesso; status genérico de operação bem sucedida. |

Dominios para **type**

| Valor  | Descrição                                                                    |
| ------ | ---------------------------------------------------------------------------- |
| CREDIT | Representa uma operação de crédito, ou seja, a entrada de recursos na conta. |
| DEBIT  | Representa uma operação de débito, ou seja, a saída de recursos da conta.    |

Dominios para **frequency**

| Valor       | Descrição                                                                           |
| ----------- | ----------------------------------------------------------------------------------- |
| FORTNIGHTLY | Indica que a recorrência ocorre a cada 15 dias (quinzenal).                         |
| MONTHLY     | Indica que a recorrência ocorre mensalmente, geralmente a cada 30 ou 31 dias.       |
| QUARTERLY   | Indica que a recorrência ocorre a cada três meses, totalizando quatro vezes ao ano. |
| SEMI_ANNUAL | Indica que a recorrência ocorre a cada seis meses, totalizando duas vezes ao ano.   |

## End-point: Criar Recorrência

### Method: POST

> ```
> {{host}}/api/v1/recurrency/create
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

```json
{
  "requestNumber": "{{$randomUUID}}",
  "frequency": "monthly",
  "automaticRenovation": "false",
  "numberCharges": 12,
  "firstDateBilling": "2025-05-13",
  "firstChargeValue": 10,
  "chargeValue": 20,
  "card": {
    "number": "4176660000000100",
    "expirationMonth": "07",
    "expirationYear": "2025",
    "cvv": "040",
    "installment": 1,
    "amount": 20.0
  },
  "client": {
    "name": "Edward Alves Rabelo Neto",
    "document": "35427861090",
    "phoneNumber": "62999999999",
    "email": "usuario@suitpay.app",
    "address": {
      "codIbge": "5208707",
      "street": "Rua Marmore",
      "number": "27",
      "complement": "Qd 38 Lt 27",
      "zipCode": "74663-420",
      "neighborhood": "Goiânia 2",
      "city": "Goiânia",
      "state": "GO"
    }
  },
  "products": [
    {
      "productName": "spotify",
      "idCheckout": "{{$randomUUID}}",
      "quantity": 1,
      "value": 10
    },
    {
      "productName": "hbomax",
      "idCheckout": "{{$randomUUID}}",
      "quantity": 1,
      "value": 10
    }
  ],
  "callbackUrl": "https://webhook.site/c7611224-c470-48c6-91b1-7237d4fa956f"
}
```

### Response: 201

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "e5bdcdee-895d-4e8d-aa66-60c00bb75738",
  "transactionId": ["b7f4af65-07d6-49dc-9aa2-7b277dcb4ec0"],
  "response": "OK",
  "statusTransaction": "APPROVED",
  "acquirerMessage": "Transação aprovada com sucesso"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "e5bdcdee-895d-4e8d-aa66-60c00bb75738",
  "transactionId": [],
  "response": "REJECTED",
  "statusTransaction": "ERROR",
  "acquirerMessage": "Erro ao criar recorrência"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Editar Recorrência

### Method: POST

> ```
> {{host}}/v1/recurrency/manage
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

```json
{
  "username": "andregritti",
  "recurrencyId": "{{$randomUUID}}",
  "frequency": "quarterly",
  "status": "active",
  "automaticRenovation": "true",
  "numberCharges": "12",
  "firstChargeValue": 29.9,
  "chargeValue": 1.5,
  "card": {
    "number": "4895379980000572",
    "expirationMonth": "12",
    "expirationYear": "2029",
    "cvv": "841",
    "installment": "1",
    "amount": "29.9"
  },
  "products": [
    {
      "productName": "disney+",
      "idCheckout": "94ae13b9-af4a-4780-92d1-3519bd06b235",
      "quantity": 1,
      "value": "29.9"
    }
  ]
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "e5bdcdee-895d-4e8d-aa66-60c00bb75738",
  "transactionId": ["efa25091-b3ee-4263-9f1c-7132a8a1c183"],
  "response": "OK",
  "statusTransaction": "APPROVED",
  "acquirerMessage": "Recorrência atualizada com sucesso"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "93480562-8719-4c19-848b-2c594a8f16ea",
  "transactionId": [],
  "response": "REJECTED",
  "statusTransaction": "ERROR",
  "acquirerMessage": "Erro ao atualizar a recorrência"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Editar Cartão de uma Recorrência

### Method: POST

> ```
> {{host}}/v1/recurrency/update-card
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Body (**raw**)

```json
{
  "requestNumber": "{{$randomUUID}}",
  "recurrencyId": "REC123456",
  "card": {
    "number": "4111111111111111",
    "cardHolderName": "Joao Silva",
    "expirationMonth": "12",
    "expirationYear": "2026",
    "cvv": "321",
    "installment": 1,
    "amount": 50.0
  }
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "2de02221-ac72-4e92-9d63-e20e3fd50df3",
  "transactionId": ["7675ce37-6110-4bfa-aafb-f1e6497daeaa"],
  "response": "OK",
  "statusTransaction": "APPROVED",
  "acquirerMessage": "Cartão atualizado com sucesso"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "recurrencyId": "0b2d6766-a017-4397-a554-286e34597faa",
  "transactionId": [],
  "response": "REJECTED",
  "statusTransaction": "ERROR",
  "acquirerMessage": "Erro ao atualizar o cartão"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Gateway de Pix

undefined

## End-point: Gerar Código de Pagamento PIX (Cash-in)

Endpoint para geração do Código de Pagemento (QrCode) de pagamento PIX.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>requestNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do pedido</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de vencimento do QrCode (AAAA-MM-DD)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>amount</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor total da compra (produtos + frete)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>shippingAmount</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor do frete (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>usernameCheckout</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Username no checkout que está enviando a requisição. (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>callbackUrl</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>URL de webhook para receber as informações sobre o pagamento. (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>client</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Object</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>name</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>document</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>CPF/CNPJ do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>phoneNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Telefone do cliente (DDD+TELEFONE). (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>email</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>E-mail do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>address</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Object</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>(Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>codIbge</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código IBGE do munícipio do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>street</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Rua/Av. do endereço</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>complement</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Complemento do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>zipCode</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>CEP do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>neighborhood</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Bairro do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>city</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Cidade do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>state</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Sigla do estado do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>products</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>(Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>description</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Descrição do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>quantity</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Quantidade solicitada do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor unitário do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>split</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Object</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>(Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>username</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do usuário que vai receber o split (comissão). Deve ser um usuário com conta criada e aprovada na plataforma.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>percentageSplit</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Percentual (%) da comissão.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Response**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID único da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>paymentCode</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código de pagamento gerado (QrCode).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>response</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Mensagem de retorno da solicitação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>paymentCodeBase64</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Imagem do qrCode na base64.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>
### Method: POST
>```
>{{host}}/api/v1/gateway/request-qrcode
>```
### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Body (**raw**)

```json
{
  "requestNumber": "12345",
  "dueDate": "2022-10-30",
  "amount": 300.0,
  "shippingAmount": 0.0,
  "discountAmount": 0.0,
  "usernameCheckout": "checkout",
  "callbackUrl": "https://webhook.com/",
  "client": {
    "name": "José da Silva",
    "document": "927.300.300-18",
    "phoneNumber": "62999815500",
    "email": "josesilva@gmail.com",
    "address": {
      "codIbge": "5208707",
      "street": "Rua Paraíba",
      "number": "150",
      "complement": "",
      "zipCode": "74663-520",
      "neighborhood": "Goiânia 2",
      "city": "Goiânia",
      "state": "GO"
    }
  },
  "products": [
    {
      "description": "Tênis",
      "quantity": 1,
      "value": 200.0
    },
    {
      "description": "Camiseta M",
      "quantity": 2,
      "value": 50.0
    }
  ],
  "split": {
    "username": "usuario",
    "percentageSplit": 10
  }
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "idTransaction": "0b935d10-3c90-4af3-8776-dd18622a7941",
  "paymentCode": "00020101021226890014br.gov.bcb.pix2567brcode-h.sandbox.starkinfra.com/v2/2b625b826e2f40d29e0b71fbc78904795204000053039865802BR5918Suit Business Ltda6007Goiania62070503***6304F01C",
  "response": "OK",
  "paymentCodeBase64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACvElEQVR4Xu2YS3IDIQxE4SLS/W+Ro8BFIP2Ey3Zmkcoi7tVQznzguaojtQTltn8fX+06cxk3cMYNnHEDZ/wNGK311aJFrmg5Wug6mTQCU585F7Nd98jJQ837AF6X/kZE5MjReSvGCigwXRFLyK2olWAzoKsitJQhUXvkY9IHwETHORKaC4E1aQTw57yOq6uv6/8MMBby0DUkUdWTj3kXMMgQRh3c1zEu/jUCahvRWvSVco3KZi494h8joGmStUIq64beiJdpDYDyAxTcqo80GbcK2QegSfFRvBpORZ8qZ7NuAypZ1CwiFR8lTcs0Eh8wcCv1QsomnpFn86i0AUqLOkaypSZPpO2azQ8DuIP+gWWraCdf4OMDpsxSsVocMRSma/EaAL3RNdRClDDZhGtgICtQQnmvopXK6mpvIj8OKEWdRiaTlLrAvHjZCGCNUXlaukhepSxeIi0Ae9kjS42czcraM1kGgBhpRqII2GRPCQrJCRApBaq00kd4QqgVKL8EXpG2UDPZ9ZBWoJGaaiKvB33JCExCo+RsdpYK0Cr7PkUagI1nU7MTlPpprVAnQGLKKatXyVC3KDUC0iSzPMqHchGFe58iDQB5qmUmVULYh3RZAdXJY0/TeZd4VQ29J+vjwNz1y4BOWAoZvVzfyHPkswEQhAdZi4KZ1c2iG4HTvGvmnLY2p5z3/+LzAAUj53aaFzHDMT+K1wEE5TpJUKu15IyxX8VrADAK+lQ52HVTw50acgKtVNHNsxYhaWRGgBQhSGv0Dh2xuiL2nqzPAwzWAuOwraZci2AjMDBJI1mjwrV4m7RWH6CAlLRzxlND1eb6Q6QDKG0UDnLl4dFL90ukCWBrnZvKUd2iupq6F0h+I5GwWYV0OrkTgDnidFNDlXsrbkaAzKCSTIkeCpkYatoH/DZu4IwbOOMGzvgH4BsdZlJNTX5BEAAAAABJRU5ErkJggg=="
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "response": "USER_SPLIT_NOT_FOUND",
  "message": "Usuário do split não encontrado.",
  "codeAntiFraud": null
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Transferência via PIX (Cash-out)

Endpoint para transferência de valores através de PIX.

Para utilizar esse endpoint, é necessário cadastrar o IP do seu servidor de onde vai vir as requisições, pois somente será permitido PIX de saída pela API com o IP cadastrado.

Para cadastrar o IP, vai até o menu GATEWAY/CHECKOUT -> GERENCIAMENTO DE IPs.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>key</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Chave PIX. (Obrigatório)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>typeKey</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da chave PIX, aceita os seguintes valores: document(CPF/CNPJ), phoneNumber(6299995432), email, randomKey(Chave Aleatória), paymentCode(QrCode). (Obrigatório)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor da transferência. Exemplo(156.79) (Obrigatório)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>callbackUrl</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>URL de webhook para receber as informações sobre o pagamento. (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>documentValidation</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Se você quiser validar que um documento (CPF ou CNPJ) seja da chave pix enviada, é só enviar esse campo preenchido. Se esse campo estiver preenchido, o PIX só será concluído se o documento informado for igual ao que pertence a chave PIX. (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>externalId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID opcional que pode ser enviado para controle de duplicidade. Quando esse ID é enviado pelo usuário, ele deve ser único, pois se for enviado um ID repetido, o PIX não será processado, retornando a seguinte mensagem: DUPLICATE_EXTERNAL_ID (External ID já foi utilizado, favor enviar outro External ID para realizar essa operação). (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Response**

HTTP 400 - Verificar campo response

HTTP 404 - Chave Pix não encontrada

HTTP 500 - Erro Interno

HTTP 200 - Sucesso

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>response</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Retorno da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Campo response**

OK - Transação realizada com sucesso

ACCOUNT_DOCUMENTS_NOT_VALIDATED - Conta não validada

NO_FUNDS - Saldo insuficiente

PIX_KEY_NOT_FOUND - Chave PIX não encontrada

UNAUTHORIZED_IP - IP não autorizado

DOCUMENT_VALIDATE - A chave pix não pertence ao documento informado na validação (documentValidation).

DUPLICATE_EXTERNAL_ID - External ID já foi utilizado, favor enviar outro External ID para realizar essa operação.

ERROR - Erro interno

### Method: POST

> ```
> {{host}}/api/v1/gateway/pix-payment
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Body (**raw**)

```json
{
  "value": 1.0,
  "key": "62999998888",
  "typeKey": "phoneNumber",
  "callbackUrl": "https://webhook.com",
  "documentValidation": "079.940.605-87",
  "externalId": "1234567890"
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "idTransaction": "10dc395c-bee0-4368-a980-85a610987e30",
  "response": "OK"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "response": "NO_FUNDS",
  "message": "Sem saldo para executar esta operação.",
  "codeAntiFraud": null
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "response": "DOCUMENT_VALIDATE",
  "message": "A chave pix não pertence ao documento informado na validação.",
  "codeAntiFraud": null
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Gerar PDF Comprovante Pix Cash-out

Endpoint para gerar o comprovante em PDF do pix cash-out. Retorna o PDF em base64.

**Retornos:**

200 - OK

404 - Não encontrado

500 - Erro interno

### Method: GET

> ```
> {{host}}/api/v1/gateway/get-receipt-pix-cashout?idTransaction=58cad814-15de-4165-be6c-42b7236f1698
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Query Params

| Param         | value                                |
| ------------- | ------------------------------------ |
| idTransaction | 58cad814-15de-4165-be6c-42b7236f1698 |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "pdfBase64": "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b2JqCjExIDAgb2JqCjw8L05hbWVzIDEwIDAgUi9UeXBlL0NhdGFsb2cvUGFnZXMgNyAwIFIvVmlld2VyUHJlZmVyZW5jZXM8PC9QcmludFNjYWxpbmcvQXBwRGVmYXVsdD4+Pj4KZW5kb2JqCjEyIDAgb2JqCjw8L01vZERhdGUoRDoyMDIzMTEyMDAxMjAwNS0wMycwMCcpL0NyZWF0b3IoSmFzcGVyUmVwb3J0cyBMaWJyYXJ5IHZlcnNpb24gNi4xNy4wLTZkOTMxOTMyNDFkZDhjYzQyNjI5ZTE4OGI5NGY5ZTBiYzU3MjJlZmQpL0NyZWF0aW9uRGF0ZShEOjIwMjMxMTIwMDEyMDA1LTAzJzAwJykvUHJvZHVjZXIoaVRleHQgMi4xLjcgYnkgMVQzWFQpPj4KZW5kb2JqCnhyZWYKMCAxMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTI5NTYgMDAwMDAgbiAKMDAwMDAxMzI2NiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDMyMDcgMDAwMDAgbiAKMDAwMDAwMzY3MyAwMDAwMCBuIAowMDAwMDEyMDM1IDAwMDAwIG4gCjAwMDAwMTMzNTQgMDAwMDAgbiAKMDAwMDAxMzIzMSAwMDAwMCBuIAowMDAwMDEzNDE3IDAwMDAwIG4gCjAwMDAwMTM0NzEgMDAwMDAgbiAKMDAwMDAxMzUwNCAwMDAwMCBuIAowMDAwMDEzNjA5IDAwMDAwIG4gCnRyYWlsZXIKPDwvSW5mbyAxMiAwIFIvSUQgWzxkOTFhNjc5MzJlNWU4MDRjYzQ2NTFkMzJmY2Y3NjVhNT48ZGI2MWJiYzc2YTJmZDIyYzY3MDExYmIyNzkxYzMwN2U+XS9Sb290IDExIDAgUi9TaXplIDEzPj4Kc3RhcnR4cmVmCjEzODE5CiUlRU9GCg=="
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Gateway de Boleto

undefined

## End-point: Gerar Boleto

Endpoint para geração de boleto.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>requestNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do pedido</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de vencimento do boleto (AAAA-MM-DD)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>amount</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor total da compra (produtos + frete)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>shippingAmount</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor do frete (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>usernameCheckout</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Username no checkout que está enviando a requisição</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>client</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Object</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>name</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>document</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>CPF/CNPJ do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>phoneNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Telefone do cliente (DDD+TELEFONE)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>email</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>E-mail do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>address</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Object</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>codIbge</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Código IBGE do munícipio do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>street</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Rua/Av. do endereço</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>complement</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Complemento do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>zipCode</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>CEP do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>neighborhood</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Bairro do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>city</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Cidade do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>state</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Sigla do estado do endereço do cliente</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>products</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>description</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Descrição do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>quantity</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Quantidade solicitada do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Number</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor unitário do produto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>callbackUrl</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>URL de webhook para receber as informações sobre o pagamento. (Opcional)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Response**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>idTransaction</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID único da transação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>digitableLine</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Linha digitável do boleto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>barcode</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do código de barras do boleto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>response</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Mensagem de retorno da solicitação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>
### Method: POST
>```
>{{host}}/api/v1/gateway/request-boleto
>```
### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Body (**raw**)

```json
{
  "requestNumber": "12345",
  "dueDate": "2022-10-30",
  "amount": 300.0,
  "shippingAmount": 10.0,
  "usernameCheckout": "checkout",
  "client": {
    "name": "José da Silva",
    "document": "927.300.300-18",
    "phoneNumber": "62999815500",
    "email": "josesilva@gmail.com",
    "address": {
      "codIbge": "5208707",
      "street": "Rua Paraíba",
      "number": "150",
      "complement": "",
      "zipCode": "74663-520",
      "neighborhood": "Goiânia 2",
      "city": "Goiânia",
      "state": "GO"
    }
  },
  "products": [
    {
      "description": "Tênis",
      "quantity": 1,
      "value": 200.0
    },
    {
      "description": "Camiseta M",
      "quantity": 2,
      "value": 75.0
    }
  ]
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "idTransaction": "6a537c4d-8f86-4b3b-b56a-e821b6611681",
  "digitableLine": "34191.09107 26219.707309 71444.640008 1 87270000002000",
  "barcode": "34191872700000020001091026219707307144464000",
  "response": "OK"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Gerar PDF do Boleto

Endpoint para geração do PDF do boleto.

**Request**

<table border="1">
<tr>
<th>Variável</th>
<th>Type</th>
<th>Descrição</th>
</tr>
<tr>
<td>id</td>
<td>String</td>
<td>ID retornado no endpoint de geração de boleto. (Obrigatório)</td>
</tr>
</table>

**Response**

<table border="1">
<tr>
<th>Variável</th>
<th>Type</th>
<th>Descrição</th>
</tr>
<tr>
<td>base64</td>
<td>String</td>
<td>PDF em base64.</td>
</tr>
<tr>
<td>response</td>
<td>String</td>
<td>Mensagem de retorno da solicitação.</td>
</tr>
</table>
### Method: GET
>```
>{{host}}/api/v1/gateway/boleto/pdf?id=0c83eeac-d614-4b9e-bb60-fe69cf909f69
>```
### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Query Params

| Param | value                                |
| ----- | ------------------------------------ |
| id    | 0c83eeac-d614-4b9e-bb60-fe69cf909f69 |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "id": "0c83eeac-d614-4b9e-bb60-fe69cf909f69",
  "digitableLine": "34191.09107 40697.647309 71444.640008 7 91850000035000",
  "barcode": "34197918500000350001091040697647307144464000",
  "dueDate": "30/11/2022",
  "base64": "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txPa+uOH5jE6/2lZr/YPykW9qgDXx/teU/8Pk5D4hwplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVGFicy9TL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvVHlwZS9Hcm91cC9DUy9EZXZpY2VSR0I+Pi9Db250ZW50cyA4IDAgUi9UeXBlL1BhZ2UvUmVzb3VyY2VzPDwvQ29sb3JTcGFjZTw8L0NTL0RldmljZVJHQj4+L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldL0ZvbnQ8PC9GMSAyIDAgUj4+L1hPYmplY3Q8PC9YZjEgMyAwIFIvaW1nMiA3IDAgUi9pbWcxIDUgMCBSL2ltZzAgNCAwIFI+Pj4+L1BhcmVudCA5IDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0+PgplbmRvYmoKMTAgMCBvYmoKWzEgMCBSL1hZWiAwIDg1MiAwXQplbmRvYmoKMiAwIG9iago8PC9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjkgMCBvYmoKPDwvS2lkc1sxIDAgUl0vVHlwZS9QYWdlcy9Db3VudCAxL0lUWFQoMi4xLjcpPj4KZW5kb2JqCjExIDAgb2JqCjw8L05hbWVzWyhKUl9QQUdFX0FOQ0hPUl8wXzEpIDEwIDAgUl0+PgplbmRvYmoKMTIgMCBvYmoKPDwvRGVzdHMgMTEgMCBSPj4KZW5kb2JqCjEzIDAgb2JqCjw8L05hbWVzIDEyIDAgUi9UeXBlL0NhdGFsb2cvUGFnZXMgOSAwIFIvVmlld2VyUHJlZmVyZW5jZXM8PC9QcmludFNjYWxpbmcvQXBwRGVmYXVsdD4+Pj4KZW5kb2JqCjE0IDAgb2JqCjw8L01vZERhdGUoRDoyMDIyMTEwMjExMzA1NC0wMycwMCcpL0NyZWF0b3IoSmFzcGVyUmVwb3J0cyBMaWJyYXJ5IHZlcnNpb24gNi4xNy4wLTZkOTMxOTMyNDFkZDhjYzQyNjI5ZTE4OGI5NGY5ZTBiYzU3MjJlZmQpL0NyZWF0aW9uRGF0ZShEOjIwMjIxMTAyMTEzMDU0LTAzJzAwJykvUHJvZHVjZXIoaVRleHQgMi4xLjcgYnkgMVQzWFQpPj4KZW5kb2JqCnhyZWYKMCAxNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTg5NDkgMDAwMDAgbiAKMDAwMDAxOTI4MSAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDI3OTIgMDAwMDAgbiAKMDAwMDAwMzc0NiAwMDAwMCBuIAowMDAwMDA2OTM4IDAwMDAwIG4gCjAwMDAwMDc0MDUgMDAwMDAgbiAKMDAwMDAxNTc2NyAwMDAwMCBuIAowMDAwMDE5MzY5IDAwMDAwIG4gCjAwMDAwMTkyNDUgMDAwMDAgbiAKMDAwMDAxOTQzMiAwMDAwMCBuIAowMDAwMDE5NDg4IDAwMDAwIG4gCjAwMDAwMTk1MjIgMDAwMDAgbiAKMDAwMDAxOTYyNyAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gMTQgMCBSL0lEIFs8N2IxODQzZmE1MDM2NTViZjc4YWZjYmEzN2E1MTRhNzc+PGZkNTk5ZjhkM2RkMjBmOTg1YTQ3Yzk0NDIwODg4MDliPl0vUm9vdCAxMyAwIFIvU2l6ZSAxNT4+CnN0YXJ0eHJlZgoxOTgzNwolJUVPRgo=",
  "errorMessage": null
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "base64": null,
  "response": "BOLETO_NOT_FOUND"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Sistema de Cobranças

undefined

## End-point: Criar nova cobrança

Esse endpoint permite cadastrar uma nova cobrança de pagamento via Boleto ou Pix.

- Para cobranças **por cliente**, os dados como **valor** e **data de vencimento** devem ser informados no corpo da recorrência.
- Para cobranças **por produto**, o **valor** e a **data de vencimento** devem ser informados diretamente no produto.

Os dados obrigatórios incluem informações sobre o cliente ou produto associado, a frequência do pagamento e demais detalhes necessários para a cobrança recorrente.

#### **Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>id</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Long</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Identificador único da recorrência <b>(gerado automaticamente).</b></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>username</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do usuário responsável pela criação da recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>clientsDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Lista de clientes associados à recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>productDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>RecurrencyBolePixProductDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Produto associado à recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>frequency</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Frequência da recorrência (ONE_TIME, FORTNIGHTLY, MONTHLY, QUARTERLY, SEMI_ANNUAL).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da recorrência (ACTIVE, CANCELED, PAUSED).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>BigDecimal</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor da cobrança da recorrência - campo utilizado nas recorrências por cliente.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>recurrencyBolepixType</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da recorrência (CLIENT ou PRODUCT).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>recurrencyPaymentType</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo de pagamento da recorrência (BOLETO, PIX, BOLEPIX)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>LocalDate (yyyy-MM-dd)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de vencimento da cobrança.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

_clientsDto:_

| Variável        | Type               | Descrição                     |
| --------------- | ------------------ | ----------------------------- |
| username        | String             | Nome do cliente               |
| phoneNumber     | String             | Número de telefone do cliente |
| email           | String             | E-mail do cliente             |
| cpf             | String             | Documento (CPF) do cliente    |
| deliveryAddress | DeliveryAddressDto | Endereço do cliente           |

_deliveryAddress_:

| Variável     | Type   | Descrição                                                           |
| ------------ | ------ | ------------------------------------------------------------------- |
| codIbge      | String | Código do IBGE referente ao município do endereço.                  |
| street       | String | Nome da rua, avenida ou logradouro do endereço.                     |
| number       | String | Número do imóvel no endereço.                                       |
| complement   | String | Informações complementares, como apartamento, bloco, conjunto, etc. |
| zipCode      | String | Código de Endereçamento Postal (CEP).                               |
| neighborhood | String | Nome do bairro onde o endereço está localizado.                     |
| city         | String | Nome da cidade do endereço.                                         |
| state        | String | Estado onde o endereço está localizado.                             |

_productDto:_

| Variável    | Type                   | Descrição                                                                        |
| ----------- | ---------------------- | -------------------------------------------------------------------------------- |
| id          | String                 | Identificador único do produto **(gerado automaticamente).**                     |
| name        | String                 | Nome do produto.                                                                 |
| value       | String                 | Valor da cobrança da recorrência - campo utilizado nas recorrências por produto. |
| dueDate     | LocalDate (yyyy-MM-dd) | Data de vencimento da cobrança - campo utilizado nas recorrências por produto.   |
| description | String                 | Descrição do produto.                                                            |

#### **Response**

**201: CREATED -** Recorrência criada com sucesso.

**400: BAD_REQUEST -** Dados inválidos.

**401: UNAUTHORIZED -** Não autorizado.

### Method: POST

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/create
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Body (**raw**)

```json
{
  "username": "testecheckout",
  "clientsDto": [
    {
      "username": "Isabela Teste",
      "phoneNumber": "31999999999",
      "email": "clientemail@gmail.com",
      "cpf": "14989472632",
      "deliveryAddress": {
        "city": "Belo Horizonte",
        "codIbge": "3106200",
        "complement": "Apartamento 101",
        "neighborhood": "Centro",
        "number": "100",
        "state": "MG",
        "street": "Rua das Flores",
        "zipCode": "30130010"
      }
    },
    {
      "username": "Maria Teste",
      "phoneNumber": "31988888888",
      "email": "clientemail@gmail.com",
      "cpf": "14989472632",
      "deliveryAddress": {
        "city": "Contagem",
        "codIbge": "3106705",
        "complement": "Casa",
        "neighborhood": "Inconfidentes",
        "number": "200",
        "state": "MG",
        "street": "Avenida Brasil",
        "zipCode": "32240000"
      }
    }
  ],
  "productDto": {
    "id": null,
    "name": "Condomínio SuitPay",
    "value": null,
    "dueDate": null,
    "description": "Cobrança mensal de condomínio"
  },
  "frequency": "MONTHLY",
  "status": "ACTIVE",
  "value": 150.0,
  "dueDate": "2025-04-10",
  "recurrencyBolepixType": "CLIENT",
  "recurrencyPaymentType": "BOLETO"
}
```

### Response: 201

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
Recorrência criada com sucesso.
```

</details>

### Response: 500

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1742822405026,
  "status": 500,
  "error": "Internal Server Error",
  "message": "No message available",
  "path": "/api/v1/recurrency-boleto-pix/create"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1742822453039,
  "status": 400,
  "error": "Bad Request",
  "message": "JSON parse error: Cannot deserialize value of type `br.com.suitbank.webapp.service.entity.recurrency.constant.RecurrencyFrequency` from String \"MENSAL\": value not one of declared Enum instance names: [SEMI_ANNUAL, QUARTERLY, FORTNIGHTLY, MONTHLY]; nested exception is com.fasterxml.jackson.databind.exc.InvalidFormatException: Cannot deserialize value of type `br.com.suitbank.webapp.service.entity.recurrency.constant.RecurrencyFrequency` from String \"MENSAL\": value not one of declared Enum instance names: [SEMI_ANNUAL, QUARTERLY, FORTNIGHTLY, MONTHLY]\n at [Source: (PushbackInputStream); line: 24, column: 18] (through reference chain: br.com.suitbank.webapp.service.dto.recurrencybolepix.RecurrencyBolePixDto[\"productDto\"]->br.com.suitbank.webapp.service.dto.recurrencybolepix.RecurrencyBolePixProductDto[\"frequency\"])",
  "path": "/api/v1/recurrency-boleto-pix/create"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Listar cobranças por filtros

Esse endpoint permite listar as recorrências de acordo com determinados filtros, que são:

#### **Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>createdStartDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data início do filtro de data de criação - pode ser nulo se o filtro for feito apenas pela data de vencimento.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>createdEndDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data fim do filtro de data de criação - pode ser nulo se o filtro for feito apenas pela data de vencimento.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueStartDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data início do filtro de data de vencimento - pode ser nulo se o filtro for feito apenas pela data de criação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueEndDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data fim do filtro de data de vencimento - pode ser nulo se o filtro for feito apenas pela data de criação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>frequency</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Frequência da recorrência (ONE_TIME, FORTNIGHTLY, MONTHLY, QUARTERLY, SEMI_ANNUAL).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da recorrência (ACTIVE, CANCELED, PAUSED).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>pageNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número da página a ser buscada - método paginado.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>pageSize</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tamanho da página a ser buscada - método paginado.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

#### **Response**

**200: OK**.

**400: BAD_REQUEST -** Dados inválidos.

**500: INTERNAL ERROR**.

### Method: POST

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/recurrencies-by-filters
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Body (**raw**)

```json
{
  "createdStartDate": null,
  "createdEndDate": null,
  "dueStartDate": "2025-01-01",
  "dueEndDate": "2025-12-31",
  "status": "ACTIVE",
  "frequency": "MONTHLY",
  "pageNumber": 0,
  "pageSize": 10
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "list": [
    {
      "id": 8,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "mariateste@gmail.com",
          "cpf": "14989472632",
          "username": "Cliente Teste 04",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        },
        {
          "email": "mariateste@gmail.com",
          "cpf": "14989472632",
          "username": "Cliente Teste 05",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 12,
        "name": "Curso de culinária",
        "description": "Cobrança mensal de curso avançado de culinária"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 100,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "BOLETO",
      "description": null,
      "dueDate": "2025-04-10",
      "createdDate": "2025-04-08",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    },
    {
      "id": 15,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Isabela Teste",
          "phoneNumber": "31999999999",
          "deliveryAddress": {
            "codIbge": "3106200",
            "street": "Rua das Flores",
            "number": "100",
            "complement": "Apartamento 101",
            "zipCode": "30130010",
            "neighborhood": "Centro",
            "city": "Belo Horizonte",
            "state": "MG"
          }
        },
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Maria Teste",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 29,
        "name": "Condomínio SuitPay",
        "description": "Cobrança mensal de condomínio"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 150,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "BOLETO",
      "description": null,
      "dueDate": "2025-04-10",
      "createdDate": "2025-04-15",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    },
    {
      "id": 16,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Isabela Teste",
          "phoneNumber": "31999999999",
          "deliveryAddress": {
            "codIbge": "3106200",
            "street": "Rua das Flores",
            "number": "100",
            "complement": "Apartamento 101",
            "zipCode": "30130010",
            "neighborhood": "Centro",
            "city": "Belo Horizonte",
            "state": "MG"
          }
        },
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Maria Teste",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 30,
        "name": "Condomínio SuitPay",
        "description": "Cobrança mensal de condomínio"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 150,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "BOLETO",
      "description": null,
      "dueDate": "2025-04-10",
      "createdDate": "2025-04-15",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    },
    {
      "id": 17,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Isabela Teste",
          "phoneNumber": "31999999999",
          "deliveryAddress": {
            "codIbge": "3106200",
            "street": "Rua das Flores",
            "number": "100",
            "complement": "Apartamento 101",
            "zipCode": "30130010",
            "neighborhood": "Centro",
            "city": "Belo Horizonte",
            "state": "MG"
          }
        },
        {
          "email": "clientemail@gmail.com",
          "cpf": "14989472632",
          "username": "Maria Teste",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 31,
        "name": "Condomínio SuitPay",
        "description": "Cobrança mensal de condomínio"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 150,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "BOLETO",
      "description": null,
      "dueDate": "2025-04-10",
      "createdDate": "2025-04-15",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    },
    {
      "id": 5,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "joaoteste@gmail.com",
          "cpf": "14989472632",
          "username": "João da Silva",
          "phoneNumber": "31999999999",
          "deliveryAddress": {
            "codIbge": "3106200",
            "street": "Rua das Flores",
            "number": "100",
            "complement": "Apartamento 101",
            "zipCode": "30130010",
            "neighborhood": "Centro",
            "city": "Belo Horizonte",
            "state": "MG"
          }
        },
        {
          "email": "mariateste@gmail.com",
          "cpf": "14989472632",
          "username": "Maria da Silva",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 9,
        "name": "Condomínio SuitPay",
        "description": "Cobrança mensal de condomínio"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 150,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "BOLETO",
      "description": null,
      "dueDate": "2025-04-10",
      "createdDate": "2025-04-07",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    },
    {
      "id": 6,
      "username": "testecheckout",
      "clientsDto": [
        {
          "email": "joaoteste@gmail.com",
          "cpf": "14989472632",
          "username": "Cliente Teste 01",
          "phoneNumber": "31999999999",
          "deliveryAddress": {
            "codIbge": "3106200",
            "street": "Rua das Flores",
            "number": "100",
            "complement": "Apartamento 101",
            "zipCode": "30130010",
            "neighborhood": "Centro",
            "city": "Belo Horizonte",
            "state": "MG"
          }
        },
        {
          "email": "mariateste@gmail.com",
          "cpf": "14989472632",
          "username": "Cliente Teste 02",
          "phoneNumber": "31988888888",
          "deliveryAddress": {
            "codIbge": "3106705",
            "street": "Avenida Brasil",
            "number": "200",
            "complement": "Casa",
            "zipCode": "32240000",
            "neighborhood": "Inconfidentes",
            "city": "Betim",
            "state": "MG"
          }
        }
      ],
      "productDto": {
        "id": 10,
        "name": "Serviço de Streaming",
        "description": "Cobrança mensal de serviço de streaming"
      },
      "frequency": "MONTHLY",
      "status": "ACTIVE",
      "value": 90,
      "recurrencyBolepixType": "CLIENT",
      "recurrencyPaymentType": "PIX",
      "description": null,
      "dueDate": "2025-06-10",
      "createdDate": "2025-04-07",
      "fixedInterest": null,
      "percentageInterest": null,
      "fixedFine": null,
      "percentageFine": null
    }
  ],
  "pageMaxNumber": 1,
  "totalNumber": 6
}
```

</details>

### Response: 500

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744812825385,
  "status": 500,
  "error": "Internal Server Error",
  "message": "No message available",
  "path": "/api/v1/recurrency-boleto-pix/recurrencies-by-filters"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744812422628,
  "status": 400,
  "error": "Bad Request",
  "message": "JSON parse error: Unexpected character ('-' (code 45)): was expecting comma to separate Object entries; nested exception is com.fasterxml.jackson.core.JsonParseException: Unexpected character ('-' (code 45)): was expecting comma to separate Object entries\n at [Source: (PushbackInputStream); line: 4, column: 24]",
  "path": "/api/v1/recurrency-boleto-pix/recurrencies-by-filters"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Lista pagamentos de clientes por cobrança

Esse endpoint permite listar as últimas cobranças de cada cliente de acordo com os filtros:

#### **Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>recurrencyId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Long</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Id da recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>document</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Documento (CPF) do cliente - apenas números.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status do pagamento/cobrança (PENDING, PAID, OVERDUE)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>pageNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número da página a ser buscada - método paginado.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>pageSize</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tamanho da página a ser buscada - método paginado.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

#### **Response**

**200: OK**.

**400: BAD_REQUEST -** Dados inválidos.

**500: INTERNAL ERROR**.

### Method: POST

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/clients-charges
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Body (**raw**)

```json
{
  "recurrencyId": 8,
  "document": null,
  "status": null,
  "pageNumber": 0,
  "pageSize": 10
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "list": [
    {
      "clientName": "Cliente Teste 04",
      "value": 100,
      "productDescription": "Cobrança mensal de curso avançado de culinária",
      "paymentMethod": "BOLETO",
      "status": "OVERDUE",
      "paymentLink": "http://localhost:8081/recurrency/paymentlink/8647b6e2-eecf-41f9-9b3e-24304bcd56ed"
    },
    {
      "clientName": "Cliente Teste 05",
      "value": 100,
      "productDescription": "Cobrança mensal de curso avançado de culinária",
      "paymentMethod": "BOLETO",
      "status": "OVERDUE",
      "paymentLink": "http://localhost:8081/recurrency/paymentlink/a82b2a44-cb06-4f30-9423-6212ad0ec7a9"
    }
  ],
  "pageMaxNumber": 1,
  "totalNumber": 2
}
```

</details>

### Response: 500

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744812968382,
  "status": 500,
  "error": "Internal Server Error",
  "message": "No message available",
  "path": "/api/v1/recurrency-boleto-pix/clients-charges"
}
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744813030116,
  "status": 400,
  "error": "Bad Request",
  "message": "JSON parse error: Unrecognized token 'ATIVO': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false'); nested exception is com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'ATIVO': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')\n at [Source: (PushbackInputStream); line: 4, column: 19]",
  "path": "/api/v1/recurrency-boleto-pix/clients-charges"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edição de cobrança

Endpoint para edição de recorrência existente.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>id</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Long</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Identificador único da recorrência <b>(gerado automaticamente).</b></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>username</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do usuário responsável pela criação da recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>clientsDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Lista de clientes associados à recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>productDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>RecurrencyBolePixProductDto</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Produto associado à recorrência.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>frequency</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Frequência da recorrência (ONE_TIME, FORTNIGHTLY, MONTHLY, QUARTERLY, SEMI_ANNUAL) - campo utilizado nas recorrências por cliente.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da recorrência (ACTIVE, CANCELED, PAUSED).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>BigDecimal</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor da cobrança da recorrência - campo utilizado nas recorrências por cliente.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>recurrencyBolepixType</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo da recorrência (CLIENT ou PRODUCT).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>recurrencyPaymentType</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Tipo de pagamento da recorrência (BOLETO, PIX, BOLEPIX)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>LocalDate (yyyy-MM-dd)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de vencimento da cobrança.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

#### **Response**

**200: OK -** Recorrência atualizada com sucesso.

**400: BAD_REQUEST -** Dados inválidos.

**500: INTERNAL ERROR**.

### Method: PUT

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/update/1
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Body (**raw**)

```json
{
  "id": 1,
  "username": "testecheckout",
  "clientsDto": [
    {
      "email": "joaoteste@gmail.com",
      "cpf": "14989472632",
      "username": "Cliente Teste 08",
      "phoneNumber": "31999999999",
      "deliveryAddress": {
        "codIbge": "3106200",
        "street": "Rua das Flores",
        "number": "100",
        "complement": "Apartamento 101",
        "zipCode": "30130010",
        "neighborhood": "Centro",
        "city": "Belo Horizonte",
        "state": "MG"
      }
    },
    {
      "email": "mariateste@gmail.com",
      "cpf": "14989472632",
      "username": "Cliente Teste 09",
      "phoneNumber": "31988888888",
      "deliveryAddress": {
        "codIbge": "3106705",
        "street": "Avenida Brasil",
        "number": "200",
        "complement": "Casa",
        "zipCode": "32240000",
        "neighborhood": "Inconfidentes",
        "city": "Betim",
        "state": "MG"
      }
    }
  ],
  "productDto": {
    "id": 4,
    "name": "Condomínio SuitPay"
  },
  "frequency": "MONTHLY",
  "status": "ACTIVE",
  "value": 200.0,
  "recurrencyBolepixType": "CLIENT",
  "recurrencyPaymentType": "BOLETO",
  "description": null,
  "dueDate": "2026-04-13",
  "createdDate": "2025-03-31",
  "fixedInterest": null,
  "percentageInterest": null,
  "fixedFine": null,
  "percentageFine": null
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
Recorrência atualizada com sucesso.
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744814281488,
  "status": 400,
  "error": "Bad Request",
  "message": "JSON parse error: Unrecognized token 'MENSAL': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false'); nested exception is com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'MENSAL': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')\n at [Source: (PushbackInputStream); line: 42, column: 25]",
  "path": "/api/v1/recurrency-boleto-pix/update/1"
}
```

</details>

### Response: 500

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744814318048,
  "status": 500,
  "error": "Internal Server Error",
  "message": "The given id must not be null!; nested exception is java.lang.IllegalArgumentException: The given id must not be null!",
  "path": "/api/v1/recurrency-boleto-pix/update/1"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edição de produto

Endpoint para edição de produto existente.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>id</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Long</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Identificador único do produto<b>.</b></div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>name</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do produto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>value</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>BigDecimal</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Valor da cobrança da recorrência - campo utilizado nas recorrências por produto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>description</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Descrição do produto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>dueDate</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>LocalDate (yyyy-MM-dd)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Data de vencimento da cobrança - campo utilizado nas recorrências por produto.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

#### **Response**

**200: OK -** Recorrência atualizada com sucesso.

**400: BAD_REQUEST -** Dados inválidos.

**401: UNAUTHORIZED -** Não autorizado.

### Method: PUT

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/product/update/19
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Body (**raw**)

```json
{
  "id": 19,
  "name": "Netflix",
  "description": "Cobrança semestral de streaming - plano familiar",
  "value": null,
  "dueDate": null
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
Produto atualizado com sucesso.
```

</details>

### Response: 400

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744813848560,
  "status": 400,
  "error": "Bad Request",
  "message": "JSON parse error: Unrecognized token 'Netflix': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false'); nested exception is com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'Netflix': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')\n at [Source: (PushbackInputStream); line: 3, column: 21]",
  "path": "/api/v1/recurrency-boleto-pix/product/update/19"
}
```

</details>

### Response: 500

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1744813920976,
  "status": 500,
  "error": "Internal Server Error",
  "message": "JTA transaction unexpectedly rolled back (maybe due to a timeout); nested exception is javax.transaction.RollbackException: ARJUNA016053: Could not commit transaction.",
  "path": "/api/v1/recurrency-boleto-pix/product/update/19"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Cobranças

Endpoint para listar todos as recorrências cadastradas.

### Method: GET

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### 🔑 Authentication noauth

| Param | value | Type |
| ----- | ----- | ---- |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
[
  {
    "id": 1,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 08",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 09",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 4,
      "name": "Condomínio SuitPay"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 200,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2026-04-13",
    "createdDate": "2025-03-31",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 2,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 08",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 09",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 4,
      "name": "Condomínio SuitPay"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2026-04-13",
    "createdDate": "2025-03-31",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 3,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 08",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 09",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 4,
      "name": "Condomínio SuitPay"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2026-04-13",
    "createdDate": "2025-03-31",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 4,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 08",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 09",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 4,
      "name": "Condomínio SuitPay"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2026-04-13",
    "createdDate": "2025-03-31",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 5,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria da Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 9,
      "name": "Condomínio SuitPay",
      "description": "Cobrança mensal de condomínio"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-07",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 6,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 01",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 02",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 10,
      "name": "Serviço de Streaming",
      "description": "Cobrança mensal de serviço de streaming"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 90,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": "2025-06-10",
    "createdDate": "2025-04-07",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 7,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 08",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 09",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 4,
      "name": "Condomínio SuitPay"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2026-04-13",
    "createdDate": "2025-04-07",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 8,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 04",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 05",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 12,
      "name": "Curso de culinária",
      "description": "Cobrança mensal de curso avançado de culinária"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 100,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-08",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 9,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 06",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 07",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 13,
      "name": "Curso avançado de informática",
      "description": "Cobrança única de curso avançado de informática"
    },
    "frequency": "ONE_TIME",
    "status": "ACTIVE",
    "value": 100,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": "2025-04-12",
    "createdDate": "2025-04-08",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 10,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 21,
      "name": "Netflix",
      "description": "Cobrança semestral de streaming"
    },
    "frequency": "QUARTERLY",
    "status": "ACTIVE",
    "value": null,
    "recurrencyBolepixType": "PRODUCT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": null,
    "createdDate": "2025-04-09",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 11,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 23,
      "name": "Netflix",
      "description": "Cobrança semestral de streaming"
    },
    "frequency": "SEMI_ANNUAL",
    "status": "ACTIVE",
    "value": null,
    "recurrencyBolepixType": "PRODUCT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": null,
    "createdDate": "2025-04-10",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 12,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 20,
      "name": "Plano de nutricionista",
      "description": "Cobrança trimestral de consulta com nutricionista"
    },
    "frequency": "QUARTERLY",
    "status": "ACTIVE",
    "value": 500,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-13",
    "createdDate": "2025-04-10",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 13,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "isabelamalachias.dev@gmail.com",
        "cpf": "14989472632",
        "username": "Isabela Malachias",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 27,
      "name": "Aluguel SuitPay",
      "description": "Cobrança quinzenal de aluguel"
    },
    "frequency": "FORTNIGHTLY",
    "status": "ACTIVE",
    "value": 100,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-12",
    "createdDate": "2025-04-11",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 14,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "isabelamalachias.dev@gmail.com",
        "cpf": "14989472632",
        "username": "Isabela Malachias",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 28,
      "name": "Plano de saúde",
      "description": "Cobrança semestral de plano de saúde"
    },
    "frequency": "SEMI_ANNUAL",
    "status": "ACTIVE",
    "value": null,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": null,
    "createdDate": "2025-04-11",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 15,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Isabela Teste",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Teste",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 29,
      "name": "Condomínio SuitPay",
      "description": "Cobrança mensal de condomínio"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-15",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 16,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Isabela Teste",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Teste",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 30,
      "name": "Condomínio SuitPay",
      "description": "Cobrança mensal de condomínio"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-15",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 17,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Isabela Teste",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "clientemail@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Teste",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 31,
      "name": "Condomínio SuitPay",
      "description": "Cobrança mensal de condomínio"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-15",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  }
]
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Produtos

Endpoint para listar todos os produtos de recorrências.

### Method: GET

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/products/
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
[
  {
    "id": 1,
    "name": "Condomínio SuitPay"
  },
  {
    "id": 2,
    "name": "Condomínio SuitPay"
  },
  {
    "id": 3,
    "name": "Condomínio SuitPay"
  },
  {
    "id": 4,
    "name": "Condomínio SuitPay"
  },
  {
    "id": 9,
    "name": "Condomínio SuitPay",
    "description": "Cobrança mensal de condomínio"
  },
  {
    "id": 10,
    "name": "Serviço de Streaming",
    "description": "Cobrança mensal de serviço de streaming"
  },
  {
    "id": 11,
    "name": "Curso online de Java",
    "description": "Cobrança mensal de curso avançado de Java"
  },
  {
    "id": 12,
    "name": "Curso de culinária",
    "description": "Cobrança mensal de curso avançado de culinária"
  },
  {
    "id": 13,
    "name": "Curso avançado de informática",
    "description": "Cobrança única de curso avançado de informática"
  },
  {
    "id": 14,
    "name": "Curso de espanhol iniciante",
    "description": "Cobrança única de curso de espanhol iniciante"
  },
  {
    "id": 17,
    "name": "Condomínio SuitPay",
    "description": "Cobrança mensal de condomínio"
  },
  {
    "id": 18,
    "name": "Curso de espanhol iniciante",
    "description": "Cobrança única de curso de espanhol iniciante"
  },
  {
    "id": 19,
    "name": "Netflix",
    "description": "Cobrança semestral de streaming - plano único"
  },
  {
    "id": 20,
    "name": "Plano de nutricionista",
    "description": "Cobrança trimestral de consulta com nutricionista"
  },
  {
    "id": 21,
    "name": "Netflix",
    "description": "Cobrança semestral de streaming"
  },
  {
    "id": 22,
    "name": "Netflix",
    "description": "Cobrança semestral de streaming"
  },
  {
    "id": 23,
    "name": "Netflix",
    "description": "Cobrança semestral de streaming"
  },
  {
    "id": 24,
    "name": "Aluguel SuitPay",
    "description": "Cobrança quinzenal de aluguel"
  },
  {
    "id": 25,
    "name": "Aluguel SuitPay",
    "description": "Cobrança quinzenal de aluguel"
  },
  {
    "id": 26,
    "name": "Aluguel SuitPay",
    "description": "Cobrança quinzenal de aluguel"
  },
  {
    "id": 27,
    "name": "Aluguel SuitPay",
    "description": "Cobrança quinzenal de aluguel"
  },
  {
    "id": 28,
    "name": "Plano de saúde",
    "description": "Cobrança semestral de plano de saúde"
  },
  {
    "id": 29,
    "name": "Condomínio SuitPay",
    "description": "Cobrança mensal de condomínio"
  },
  {
    "id": 30,
    "name": "Condomínio SuitPay",
    "description": "Cobrança mensal de condomínio"
  },
  {
    "id": 31,
    "name": "Condomínio SuitPay",
    "description": "Cobrança mensal de condomínio"
  }
]
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Clientes

Endpoint para listar todos os clientes de recorrências.

### Method: GET

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/clients
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
[
  {
    "email": "clientemail@gmail.com",
    "cpf": "00000000000",
    "username": "cliente01",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "clientemail@gmail.com",
    "cpf": "11111111111",
    "username": "cliente02",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "joaoteste@gmail.com",
    "cpf": "14989472632",
    "username": "João da Silva",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Maria da Silva",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "joaoteste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 01",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 02",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "joaoteste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 03",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 04",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 05",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "joaoteste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 06",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 07",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "joaoteste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 08",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Cliente Teste 09",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "isabelamalachias.dev@gmail.com",
    "cpf": "14989472632",
    "username": "Isabela Malachias",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Maria Laura",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "mariateste@gmail.com",
    "cpf": "14989472632",
    "username": "Maria Silva",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  },
  {
    "email": "clientemail@gmail.com",
    "cpf": "14989472632",
    "username": "Isabela Teste",
    "phoneNumber": "31999999999",
    "deliveryAddress": {
      "codIbge": "3106200",
      "street": "Rua das Flores",
      "number": "100",
      "complement": "Apartamento 101",
      "zipCode": "30130010",
      "neighborhood": "Centro",
      "city": "Belo Horizonte",
      "state": "MG"
    }
  },
  {
    "email": "clientemail@gmail.com",
    "cpf": "14989472632",
    "username": "Maria Teste",
    "phoneNumber": "31988888888",
    "deliveryAddress": {
      "codIbge": "3106705",
      "street": "Avenida Brasil",
      "number": "200",
      "complement": "Casa",
      "zipCode": "32240000",
      "neighborhood": "Inconfidentes",
      "city": "Betim",
      "state": "MG"
    }
  }
]
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Cobranças por Cliente

Endpoint para listar todas as recorrências existentes por cliente.

### Method: GET

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/clients/3/recurrencies
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
[
  {
    "id": 5,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria da Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 9,
      "name": "Condomínio SuitPay",
      "description": "Cobrança mensal de condomínio"
    },
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "value": 150,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-10",
    "createdDate": "2025-04-07",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 11,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 23,
      "name": "Netflix",
      "description": "Cobrança semestral de streaming"
    },
    "frequency": "SEMI_ANNUAL",
    "status": "ACTIVE",
    "value": null,
    "recurrencyBolepixType": "PRODUCT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": null,
    "createdDate": "2025-04-10",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 12,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 20,
      "name": "Plano de nutricionista",
      "description": "Cobrança trimestral de consulta com nutricionista"
    },
    "frequency": "QUARTERLY",
    "status": "ACTIVE",
    "value": 500,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "BOLETO",
    "description": null,
    "dueDate": "2025-04-13",
    "createdDate": "2025-04-10",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  },
  {
    "id": 10,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "João da Silva",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Maria Silva",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 21,
      "name": "Netflix",
      "description": "Cobrança semestral de streaming"
    },
    "frequency": "QUARTERLY",
    "status": "ACTIVE",
    "value": null,
    "recurrencyBolepixType": "PRODUCT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": null,
    "createdDate": "2025-04-09",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  }
]
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Cobrança por Produto

Endpoint para listar todas as recorrências existentes por produto.

### Method: GET

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/products/13/recurrencies
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### 🔑 Authentication noauth

| Param | value | Type |
| ----- | ----- | ---- |

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
[
  {
    "id": 9,
    "username": "testecheckout",
    "clientsDto": [
      {
        "email": "joaoteste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 06",
        "phoneNumber": "31999999999",
        "deliveryAddress": {
          "codIbge": "3106200",
          "street": "Rua das Flores",
          "number": "100",
          "complement": "Apartamento 101",
          "zipCode": "30130010",
          "neighborhood": "Centro",
          "city": "Belo Horizonte",
          "state": "MG"
        }
      },
      {
        "email": "mariateste@gmail.com",
        "cpf": "14989472632",
        "username": "Cliente Teste 07",
        "phoneNumber": "31988888888",
        "deliveryAddress": {
          "codIbge": "3106705",
          "street": "Avenida Brasil",
          "number": "200",
          "complement": "Casa",
          "zipCode": "32240000",
          "neighborhood": "Inconfidentes",
          "city": "Betim",
          "state": "MG"
        }
      }
    ],
    "productDto": {
      "id": 13,
      "name": "Curso avançado de informática",
      "description": "Cobrança única de curso avançado de informática"
    },
    "frequency": "ONE_TIME",
    "status": "ACTIVE",
    "value": 100,
    "recurrencyBolepixType": "CLIENT",
    "recurrencyPaymentType": "PIX",
    "description": null,
    "dueDate": "2025-04-12",
    "createdDate": "2025-04-08",
    "fixedInterest": null,
    "percentageInterest": null,
    "fixedFine": null,
    "percentageFine": null
  }
]
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remover cliente de uma cobrança

Endpoint para remover o relacionamento entre um cliente e uma recorrência.

### Method: DELETE

> ```
> https://sandbox.ws.suitpay.app/api/v1/recurrency-boleto-pix/clients/14/recurrencies/13
> ```

### Headers

| Content-Type | Value                      |
| ------------ | -------------------------- |
| ci           | testesandbox_1687443996536 |

### Headers

| Content-Type | Value                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| cs           | 5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d |

### Response: undefined

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json

```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Sistema de Envio de SMS

Esse endpoint permitir o envio de SMS através do sistema da SuitPay.

## End-point: Enviar SMS

Endpoint para envio de SMS.

**Request**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>foneMensagens</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Lista de mensagens SMS</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>phoneNumber</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Número do telefone que vai receber o SMS</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>phoneName</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Nome do recebedor do SMS</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>message</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Mensagem que vai ser enviada (Máx. 160 caracteres)</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>externalId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID do sistema do usuário, para controle.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>urlCallback</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>URL do webhook que vai receber a resposta de sucesso ou erro.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Response**

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>ids</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>List</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Lista com os ID's gerados.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da requisição</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>message</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Mensagem de retorno da solicitação.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Webhook**

Se for enviada a urlCallback na requisição, será realizado um POST para essa URL com o seguinte JSON:

```json
{
  "id": 19,
  "status": "DELIVERED",
  "statusDescription": "Confirmação de entrega",
  "sucess": true,
  "externalId": "1234"
}
```

<table><tbody><tr><th>Variável</th><th>Type</th><th>Descrição</th></tr><tr><td><div>id</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Integer</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>ID retornado na requisição.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>status</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Status da requisição, ver lista abaixo.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>statusDescription</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Mensagem referente ao status.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>sucess</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>boolean</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>true (SMS entregue), false (falha na entrega do SMS).</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr><tr><td><div>externalId</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>String</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td><td><div>Se for enviado externalId na requisição, ele é enviando no webhhook.</div><div contenteditable="false"><div><div><div></div></div></div><div></div></div></td></tr></tbody></table>

**Lista de Status**

PENDING: Pendente,

PROCESSING: Em processamento,

PROCESSED: Processado,

SENT: Enviado,

DELIVERED: SMS Entregue,

ERROR: Erro ao enviar SMS,

FAILED: Falha no processamento,

RECOVERED: SMS recuperado,

UNDELIVERED: SMS não foi entregue.

### Method: POST

> ```
> {{host}}/api/v1/queue/sms/send/batch
> ```

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| ci           | {{ci}} |

### Headers

| Content-Type | Value  |
| ------------ | ------ |
| cs           | {{cs}} |

### Body (**raw**)

```json
{
  "foneMensagens": [
    {
      "phoneNumber": "62999819340",
      "phoneName": "André",
      "message": "Enviando mensagem de novo teste.",
      "externalId": "1234",
      "urlCallback": "https://webhook.site/3545faa7-0af8-41d0-8c8e-b913cb580033"
    },
    {
      "phoneNumber": "31997196966",
      "phoneName": "Davyd",
      "message": "Enviando mensagem de novo teste.",
      "urlCallback": "https://webhook.site/3545faa7-0af8-41d0-8c8e-b913cb580033"
    }
  ]
}
```

### Response: 200

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "ids": [13, 14],
  "status": "SUCESS",
  "message": "Solicitação de SMS foi recebida e está sendo processada para envio."
}
```

</details>

### Response: 403

<details open style="width: fit-content; max-height: 600px; overflow: auto">
<summary>Response example:</summary>

```json
{
  "timestamp": 1749833341465,
  "status": 403,
  "error": "Forbidden",
  "message": "Forbidden",
  "path": "/api/v1/queue/sms/send/batch"
}
```

</details>

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
