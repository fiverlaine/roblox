# Documentação ZucroPay
## Sumário
- [Introdução](#introduction)
- [Início Rápido](#quickstart)
- [Autenticação](#authentication)
- [Cobranças](#charges)
- [Pagamentos](#payments)
- [Webhooks](#webhooks)
- [Taxas e Tarifas](#fees)
- [Visão Geral](#api-overview)
  - [GET Dados da Conta](#api-account-get)
  - [POST Criar](#api-charges-create)
  - [GET Consultar](#api-charges-get)
  - [GET Listar](#api-charges-list)
  - [POST Estornar](#api-charges-refund)
  - [DELETE Desativar](#api-links-delete)
  - [PUT Atualizar](#api-products-update)
  - [DELETE Excluir](#api-products-delete)
  - [POST Solicitar](#api-withdrawals-create)
  - [DELETE Remover](#api-webhooks-delete)
  - [DELETE Revogar](#api-keys-revoke)
- [JavaScript / Node.js](#sdk-javascript)

---

## Bem-vindo à ZucroPay <a name="introduction"></a>

# Bem-vindo à ZucroPay

Gateway de Pagamentos PIX, Cartão e Boleto

A ZucroPay é uma plataforma de pagamentos completa que permite você receber pagamentos via PIX, Cartão de Crédito e Boleto de forma simples e integrada.

[🚀Início RápidoComece a receber pagamentos em 5 minutos](#quickstart)
[🔑AutenticaçãoAprenda a autenticar suas requisições](#authentication)
[💻API ReferenceDocumentação completa de todos os endpoints](#api-overview)
[🔔WebhooksReceba notificações de pagamentos em tempo real](#webhooks)

## Principais Funcionalidades

Receba pagamentos PIX em segundos. QR Code e código copia-e-cola gerados automaticamente.

Aceite as principais bandeiras com parcelamento em até 12x.

Gere boletos com vencimento configurável.

Receba notificações em tempo real quando pagamentos forem confirmados.

Acompanhe vendas, saques e métricas em tempo real.

## URL Base

Todas as requisições devem ser feitas para:

```bash
https://api.appzucropay.com
```

## Suporte

Precisa de ajuda? Entre em contato:

- Email:suporte@appzucropay.com
- Dashboard:dashboard.appzucropay.com

## Início Rápido <a name="quickstart"></a>

# Início Rápido

Comece a receber pagamentos em 5 minutos

1

### Criar sua conta

Primeiro, crie sua conta no dashboard:

2

### Gerar sua API Key

Após criar sua conta, vá em Integrações e gere sua API Key:

- Acesse oDashboard
- Vá emIntegraçõesno menu lateral
- Clique emCriar Nova API Key
- Copie e guarde sua chave (ela não será exibida novamente!)

**Importante:** Guarde sua API Key em local seguro. Ela não será exibida novamente após criada.
              

3

### Criar sua primeira cobrança

Agora você pode criar sua primeira cobrança PIX:

```bash
curl -X POST https://api.appzucropay.com/api/v1/charges \
  -H "Content-Type: application/json" \
  -H "X-API-Key: zp_sua_api_key_aqui" \
  -d '{
    "billing_type": "PIX",
    "value": 99.90,
    "description": "Produto de Teste",
    "customer": {
      "name": "João Silva",
      "email": "joao@email.com",
      "cpf_cnpj": "12345678900"
    }
  }'
```

```javascript
const response = await fetch('https://api.appzucropay.com/api/v1/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zp_sua_api_key_aqui'
  },
  body: JSON.stringify({
    billing_type: 'PIX',
    value: 99.90,
    description: 'Produto de Teste',
    customer: {
      name: 'João Silva',
      email: 'joao@email.com',
      cpf_cnpj: '12345678900'
    }
  })
});

const data = await response.json();
console.log(data);
```

```python
import requests

response = requests.post(
    'https://api.appzucropay.com/api/v1/charges',
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': 'zp_sua_api_key_aqui'
    },
    json={
        'billing_type': 'PIX',
        'value': 99.90,
        'description': 'Produto de Teste',
        'customer': {
            'name': 'João Silva',
            'email': 'joao@email.com',
            'cpf_cnpj': '12345678900'
        }
    }
)

print(response.json())
```

```php
<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.appzucropay.com/api/v1/charges',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-API-Key: zp_sua_api_key_aqui'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'billing_type' => 'PIX',
        'value' => 99.90,
        'description' => 'Produto de Teste',
        'customer' => [
            'name' => 'João Silva',
            'email' => 'joao@email.com',
            'cpf_cnpj' => '12345678900'
        ]
    ])
]);

$response = curl_exec($curl);
curl_close($curl);

print_r(json_decode($response, true));
```

## Resposta

```json
{
  "id": "abc123-def456-ghi789",
  "object": "charge",
  "billing_type": "PIX",
  "status": "PENDING",
  "value": 99.90,
  "net_value": 93.91,
  "platform_fee": 5.99,
  "pix": {
    "txid": "zp1234567890abcdef...",
    "qr_code": "data:image/png;base64,iVBORw0KGgo...",
    "copy_paste": "00020126580014br.gov.bcb.pix...",
    "expires_at": "2026-01-20T14:00:00Z"
  },
  "created_at": "2026-01-20T13:00:00Z"
}
```

4

### Exibir o QR Code

Use o campo pix.qr_code para exibir a imagem do QR Code:

```html
<img src="data:image/png;base64,iVBORw0KGgo..." alt="QR Code PIX" />
```

E o campo pix.copy_paste para o código copia-e-cola:

```javascript
document.getElementById('pixCode').textContent = data.pix.copy_paste;
```

5

### Verificar o pagamento

Você pode verificar o status de duas formas:

#### Opção 1: Polling (consultar periodicamente)

```javascript
const checkPayment = setInterval(async () => {
  const response = await fetch(`https://api.appzucropay.com/api/v1/charges/${chargeId}`, {
    headers: { 'X-API-Key': 'zp_sua_api_key_aqui' }
  });
  const data = await response.json();
  
  if (data.status === 'RECEIVED') {
    clearInterval(checkPayment);
    alert('Pagamento confirmado!');
  }
}, 5000); // A cada 5 segundos
```

#### Opção 2: Webhooks (recomendado)

Configure um webhook para receber notificações em tempo real. Veja mais em Webhooks.

## Autenticação <a name="authentication"></a>

# Autenticação

Como autenticar suas requisições na API ZucroPay

## API Keys

A ZucroPay usa API Keys para autenticar requisições. Você pode gerenciar suas API Keys no Dashboard.

### Formato da API Key

As API Keys seguem o formato:

```undefined
zp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Nunca compartilhe sua API Key!** Ela dá acesso completo à sua conta. Se você suspeitar que ela foi comprometida, revogue-a imediatamente no Dashboard.
        

## Como Autenticar

Existem duas formas de enviar sua API Key:

### Header X-API-Key (Recomendado)

```bash
curl -X GET https://api.appzucropay.com/api/v1/charges \
  -H "X-API-Key: zp_sua_api_key_aqui"
```

### Header Authorization

```bash
curl -X GET https://api.appzucropay.com/api/v1/charges \
  -H "Authorization: Bearer zp_sua_api_key_aqui"
```

## Erros de Autenticação

### 401 - API Key não fornecida

```json
{
  "error": "API Key não fornecida",
  "code": "API_KEY_MISSING"
}
```

Solução: Adicione o header X-API-Key com sua API Key.

### 401 - API Key inválida

```json
{
  "error": "API Key inválida ou inativa",
  "code": "API_KEY_INVALID"
}
```

Solução: Verifique se a API Key está correta e não foi revogada.

## Rate Limiting

A API possui limites de requisições para garantir estabilidade:

| Endpoint | Limite | Janela |
| --- | --- | --- |
| Geral | 100 req | 1 min |
| Criação de cobranças | 60 req | 1 min |
| Webhooks | 500 req | 1 min |

### Headers de Rate Limit

Cada resposta inclui headers informativos:

```makefile
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705761300
```

## Cobranças <a name="charges"></a>

# Cobranças

Entenda como funcionam as cobranças na ZucroPay

## O que é uma Cobrança?

Uma cobrança (charge) representa uma solicitação de pagamento. Quando você cria uma cobrança, geramos o meio de pagamento (QR Code PIX, link de cartão, boleto) para o cliente pagar.

## Tipos de Cobrança

### PIX

Pagamento instantâneo via PIX. Confirmação em segundos.

```json
{
  "billing_type": "PIX",
  "value": 99.90
}
```

Retorno: QR Code + código copia-e-cola

### Cartão de Crédito

Pagamento com cartão de crédito. Suporta parcelamento.

```json
{
  "billing_type": "CREDIT_CARD",
  "value": 99.90
}
```

Retorno: Link de pagamento ou processo via token

### Link de Pagamento (UNDEFINED)

Cria um link onde o cliente escolhe como pagar.

```json
{
  "billing_type": "UNDEFINED",
  "value": 99.90
}
```

Retorno: URL do checkout

## Status das Cobranças

| Status | Descrição | Quando ocorre |
| --- | --- | --- |
| PENDING | Aguardando pagamento | Cobrança criada, aguardando o cliente pagar |
| RECEIVED | Pagamento confirmado | PIX confirmado, cartão aprovado ou boleto compensado |
| REFUSED | Pagamento recusado | Cartão recusado pelo banco emissor ou gateway |
| REFUNDED | Pagamento estornado | Estorno processado via API ou painel |
| CANCELLED | Cancelado / Expirado | Cobrança cancelada manualmente ou PIX/boleto expirado |
| OVERDUE | Pagamento vencido | Boleto passou da data de vencimento sem pagamento |

## Valores

Cada cobrança tem:

| Campo | Descrição |
| --- | --- |
| value | Valor bruto cobrado do cliente |
| net_value | Valor líquido que você recebe |
| platform_fee | Taxa da plataforma |
| reserve_amount | Valor em reserva (5%) |

### Exemplo

```json
{
  "value": 100.00,
  "net_value": 86.93,
  "platform_fee": 8.49,
  "reserve_amount": 4.58
}
```

## Pagamentos <a name="payments"></a>

# Pagamentos

Como funcionam os pagamentos na ZucroPay

## Métodos de Pagamento

A ZucroPay suporta os principais métodos de pagamento do Brasil:

⚡

### PIX

Transferência instantânea

- Confirmação em segundos
- Disponível 24/7
- Sem limite de valor

💳

### Cartão de Crédito

Parcelamento em até 12x

- Visa, Mastercard, Elo
- Amex, Hipercard
- Tokenização segura

📄

### Boleto

Pagamento tradicional

- Vencimento configurável
- Compensação 1-3 dias
- Código de barras

## PIX - Como Funciona

- Você cria uma cobrança PIX
- Recebe QR Code + código copia-e-cola
- Cliente paga no app do banco
- Pagamento confirmado instantaneamente
- Você recebe webhook de confirmação

### Criando Cobrança PIX

```javascript
const response = await fetch('https://api.appzucropay.com/api/v1/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zp_sua_api_key'
  },
  body: JSON.stringify({
    billing_type: 'PIX',
    value: 99.90,
    description: 'Meu Produto',
    customer: {
      name: 'Cliente',
      cpf_cnpj: '12345678900'
    }
  })
});

const data = await response.json();

// Exibir QR Code
document.getElementById('qrcode').src = data.pix.qr_code;

// Código para copiar
document.getElementById('pixCode').textContent = data.pix.copy_paste;
```

## Cartão de Crédito via API

A API suporta pagamentos com Cartão de Crédito. Ao criar uma cobrança com billing_type: "CREDIT_CARD", a resposta inclui um payment_url para o cliente completar o pagamento.

### Criando Cobrança com Cartão

```javascript
const response = await fetch('https://api.appzucropay.com/api/v1/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zp_sua_api_key'
  },
  body: JSON.stringify({
    billing_type: 'CREDIT_CARD',
    value: 149.90,
    description: 'Assinatura Premium',
    customer: {
      name: 'Maria Santos',
      email: 'maria@email.com',
      cpf_cnpj: '98765432100'
    },
    postback_url: 'https://meusite.com/webhooks/zucropay'
  })
});

const data = await response.json();

// Redirecionar o cliente para o link de pagamento:
window.location.href = data.payment_url;
```

### Resposta do Cartão

```json
{
  "id": "def456-ghi789-jkl012",
  "object": "charge",
  "billing_type": "CREDIT_CARD",
  "status": "PENDING",
  "value": 149.90,
  "net_value": 140.93,
  "platform_fee": 8.97,
  "payment_url": "https://pay.zucropay.com/charge/abc123def456",
  "charge_id": 12345678,
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

Importante: O campo payment_url contém o link seguro para o cliente preencher os dados do cartão. Redirecione o cliente para essa URL. Após o pagamento, você receberá uma notificação via postback_url ou webhook cadastrado.

### Bandeiras Aceitas

Visa, Mastercard, Elo, American Express, Hipercard, Diners

## Parcelamento (Cartão)

O valor mínimo por parcela é R$ 5,00.

| Parcelas | Taxa Adicional |
| --- | --- |
| 1x | 0% |
| 2x | 2,49% |
| 3x | 4,98% |
| 6x | 9,96% |
| 12x | 19,92% |

## Webhooks <a name="webhooks"></a>

# Webhooks

Receba notificações em tempo real sobre pagamentos

## O que são Webhooks?

Webhooks são notificações HTTP enviadas automaticamente quando eventos acontecem na sua conta. Com webhooks, você não precisa ficar consultando o status das cobranças - a ZucroPay avisa você quando algo acontece.

## Eventos Disponíveis

| Evento | Descrição |
| --- | --- |
| payment.received | Pagamento confirmado |
| payment.refunded | Pagamento estornado |
| payment.overdue | Pagamento vencido |
| withdrawal.completed | Saque realizado |
| withdrawal.rejected | Saque rejeitado |

## Formato do Payload

Quando um evento ocorre, enviamos um POST para sua URL:

```json
{
  "event": "payment.received",
  "data": {
    "payment_id": "abc123-def456",
    "value": 99.90,
    "net_value": 93.91,
    "status": "RECEIVED",
    "billing_type": "PIX",
    "customer": {
      "name": "João Silva",
      "email": "joao@email.com"
    }
  },
  "timestamp": "2026-01-20T13:05:00.000Z"
}
```

## Implementando seu Webhook

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { event, data, timestamp } = req.body;
  const secret = req.headers['x-webhook-secret'];
  
  // Valide o secret se configurado
  if (secret && secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send('Invalid secret');
  }
  
  switch (event) {
    case 'payment.received':
      console.log('Pagamento recebido!', data.payment_id);
      // Liberar produto, enviar email, etc.
      liberarProduto(data);
      break;
      
    case 'payment.refunded':
      console.log('Pagamento estornado!', data.payment_id);
      // Reverter acesso, notificar, etc.
      break;
  }
  
  // IMPORTANTE: Sempre retorne 200
  res.status(200).send('OK');
});

app.listen(3000);
```

```php
<?php
// webhook.php

$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

// Validar secret
$receivedSecret = $_SERVER['HTTP_X_WEBHOOK_SECRET'] ?? '';
if ($receivedSecret !== getenv('WEBHOOK_SECRET')) {
    http_response_code(401);
    exit('Invalid secret');
}

// Processar evento
switch ($data['event']) {
    case 'payment.received':
        $paymentId = $data['data']['payment_id'];
        // Liberar produto
        liberarProduto($paymentId);
        
        // Enviar email
        enviarEmailConfirmacao($data['data']['customer']['email']);
        break;
        
    case 'payment.refunded':
        // Reverter acesso
        revogarAcesso($data['data']['payment_id']);
        break;
}

// IMPORTANTE: Sempre retorne 200
http_response_code(200);
echo json_encode(['received' => true]);
```

```python
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    secret = request.headers.get('X-Webhook-Secret')
    
    # Validar secret
    if secret != os.environ.get('WEBHOOK_SECRET'):
        return jsonify({'error': 'Invalid secret'}), 401
    
    event = data.get('event')
    payload = data.get('data')
    
    if event == 'payment.received':
        print(f"Pagamento recebido: {payload['payment_id']}")
        # Liberar produto
        liberar_produto(payload)
        
    elif event == 'payment.refunded':
        print(f"Pagamento estornado: {payload['payment_id']}")
        # Reverter acesso
    
    # IMPORTANTE: Sempre retorne 200
    return jsonify({'received': True}), 200

if __name__ == '__main__':
    app.run(port=5000)
```

## Boas Práticas

Seu endpoint deve responder em até 5 segundos com status 200. Se precisar fazer processamento demorado, salve o evento e processe em background.

Podemos reenviar webhooks em caso de falha. Seu código deve ser capaz de processar o mesmo evento múltiplas vezes sem duplicar ações.

Configure um secret e valide em cada webhook recebido para garantir que a requisição veio da ZucroPay.

## Retentativas

Se seu endpoint retornar erro (status != 2xx) ou timeout, tentamos novamente:

| Tentativa | Intervalo |
| --- | --- |
| 1ª | Imediata |
| 2ª | 5 segundos |
| 3ª | 30 segundos |

## Taxas e Tarifas <a name="fees"></a>

# Taxas e Tarifas

Entenda como funcionam as taxas da ZucroPay

## Visão Geral

A ZucroPay cobra uma taxa por transação que varia conforme o método de pagamento. Não há mensalidade ou taxa de setup.

## Taxas por Método

⚡

### PIX

5,99% + R$ 2,50 fixo

Confirmação instantânea

💳

### Cartão de Crédito

5,99% + R$ 2,50 fixo

+ 2,49% por parcela

📄

### Boleto

5,99% + R$ 2,50 fixo

Compensação em 1-3 dias

## Exemplo PIX - R$ 100,00

| Item | Valor |
| --- | --- |
| Valor da venda | R$ 100,00 |
| Taxa percentual (5,99%) | - R$ 5,99 |
| Taxa fixa | - R$ 2,50 |
| Reserva (5%) | - R$ 4,58 |
| Você recebe | R$ 86,93 |

          A reserva de 5% é liberada após 30 dias automaticamente.
        

## Reserva de Segurança

5% de cada venda fica reservado por 30 dias como garantia contra:

- Chargebacks
- Estornos
- Disputas

Após 30 dias, o valor é automaticamente liberado para seu saldo disponível.

## API Reference <a name="api-overview"></a>

# API Reference

Documentação completa da API ZucroPay

## URL Base

Todas as requisições devem ser feitas para:

```bash
https://api.appzucropay.com
```

## Autenticação

Todas as requisições devem incluir sua API Key:

```makefile
X-API-Key: zp_sua_api_key_aqui
```

## Endpoints Disponíveis

### Conta / Seller

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | /api/v1/account | Dados do seller/empresa |

### Cobranças

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/charges | Criar nova cobrança |
| GET | /api/v1/charges/:id | Consultar cobrança |
| GET | /api/v1/charges | Listar cobranças |
| POST | /api/v1/charges/:id/refund | Estornar cobrança |

### Clientes

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/customers | Criar cliente |
| GET | /api/v1/customers/:id | Consultar cliente |
| GET | /api/v1/customers | Listar clientes |

### Links de Pagamento

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/payment-links | Criar link de pagamento |
| GET | /api/v1/payment-links/:id | Consultar link |
| GET | /api/v1/payment-links | Listar links |
| DELETE | /api/v1/payment-links/:id | Desativar link |

### Produtos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/products | Criar produto |
| GET | /api/v1/products/:id | Consultar produto |
| GET | /api/v1/products | Listar produtos |
| PUT | /api/v1/products/:id | Atualizar produto |
| DELETE | /api/v1/products/:id | Excluir produto |

### Transações

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | /api/v1/transactions | Listar transações |

### Saques

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/withdrawals | Solicitar saque |
| GET | /api/v1/withdrawals | Listar saques |

### Saldo

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | /api/v1/balance | Consultar saldo |

### Webhooks

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/webhooks | Criar webhook |
| GET | /api/v1/webhooks | Listar webhooks |
| DELETE | /api/v1/webhooks/:id | Deletar webhook |

### API Keys

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | /api/v1/keys | Criar API Key |
| GET | /api/v1/keys | Listar API Keys |
| DELETE | /api/v1/keys/:id | Revogar API Key |

## Códigos de Status

| Código | Descrição |
| --- | --- |
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Não encontrado |
| 429 | Rate limit excedido |
| 500 | Erro interno |

## Formato de Erros

```json
{
  "error": "Mensagem de erro",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Dados da Conta <a name="api-account-get"></a>

`/api/v1/account`

# Dados da Conta

Retorna os dados do seller/empresa vinculado à API Key

## Response

name
string
Nome do seller ou razão social da empresa

email
string
Email da conta

document
string
CPF (pessoa física) ou CNPJ (pessoa jurídica)

person_type
string
Tipo de pessoa: `PF` ou `PJ`

phone
string
Telefone de contato

account_status
string
Status da conta: `active`, `pending`, `blocked`

identity_verified
boolean
Se a identidade do seller foi verificada

## Exemplo de Request

```bash
curl -X GET https://api.appzucropay.com/api/v1/account \
  -H "X-API-Key: zp_sua_api_key_aqui"
```

## Response

```json
{
  "object": "account",
  "id": "abc123-def456-ghi789",
  "name": "Empresa XYZ Ltda",
  "email": "contato@empresa.com",
  "document": "12345678000199",
  "person_type": "PJ",
  "phone": "11999998888",
  "account_status": "active",
  "identity_verified": true,
  "payment_provider": "efibank",
  "created_at": "2026-01-15T10:00:00.000Z"
}
```

## Criar Cobrança <a name="api-charges-create"></a>

`/api/v1/charges`

# Criar Cobrança

Cria uma nova cobrança PIX, Cartão ou link de pagamento

## Request Body

billing_type 
string
Tipo de cobrança: `PIX`, `CREDIT_CARD` ou `UNDEFINED`

value 
number
Valor da cobrança em reais (ex: 99.90)

description
string
Descrição da cobrança

customer
object
Dados do cliente (name, email, cpf_cnpj, phone)

external_reference
string
Referência externa (ID do seu sistema)

postback_url
string
URL para receber webhooks de atualização de status da cobrança (charge.paid, charge.refunded, charge.cancelled, charge.refused)

callback_url
string
Alias para `postback_url` (mantido por compatibilidade)

## Exemplo de Request

```bash
curl -X POST https://api.appzucropay.com/api/v1/charges \
  -H "Content-Type: application/json" \
  -H "X-API-Key: zp_sua_api_key_aqui" \
  -d '{
    "billing_type": "PIX",
    "value": 99.90,
    "description": "Produto Premium",
    "customer": {
      "name": "João Silva",
      "email": "joao@email.com",
      "cpf_cnpj": "12345678900"
    },
    "external_reference": "PEDIDO-123",
    "postback_url": "https://meusite.com/webhooks/zucropay"
  }'
```

```bash
curl -X POST https://api.appzucropay.com/api/v1/charges \
  -H "Content-Type: application/json" \
  -H "X-API-Key: zp_sua_api_key_aqui" \
  -d '{
    "billing_type": "CREDIT_CARD",
    "value": 149.90,
    "description": "Assinatura Mensal",
    "customer": {
      "name": "Maria Santos",
      "email": "maria@email.com",
      "cpf_cnpj": "98765432100"
    },
    "external_reference": "ASSINATURA-456",
    "postback_url": "https://meusite.com/webhooks/zucropay"
  }'
```

```javascript
const response = await fetch('https://api.appzucropay.com/api/v1/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zp_sua_api_key_aqui'
  },
  body: JSON.stringify({
    billing_type: 'PIX',
    value: 99.90,
    description: 'Produto Premium',
    customer: {
      name: 'João Silva',
      email: 'joao@email.com',
      cpf_cnpj: '12345678900'
    },
    external_reference: 'PEDIDO-123',
    postback_url: 'https://meusite.com/webhooks/zucropay'
  })
});

const data = await response.json();
```

```javascript
const response = await fetch('https://api.appzucropay.com/api/v1/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'zp_sua_api_key_aqui'
  },
  body: JSON.stringify({
    billing_type: 'CREDIT_CARD',
    value: 149.90,
    description: 'Assinatura Mensal',
    customer: {
      name: 'Maria Santos',
      email: 'maria@email.com',
      cpf_cnpj: '98765432100'
    },
    external_reference: 'ASSINATURA-456',
    postback_url: 'https://meusite.com/webhooks/zucropay'
  })
});

const data = await response.json();
// data.payment_url -> URL para o cliente pagar via cartão
```

## Response (PIX)

```json
{
  "id": "abc123-def456-ghi789",
  "object": "charge",
  "billing_type": "PIX",
  "status": "PENDING",
  "value": 99.90,
  "net_value": 93.91,
  "platform_fee": 5.99,
  "pix": {
    "txid": "zp1234567890abcdefghijklmnop",
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "copy_paste": "00020126580014br.gov.bcb.pix0136...",
    "expires_at": "2026-01-20T14:00:00.000Z"
  },
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Response (Cartão de Crédito)

```json
{
  "id": "def456-ghi789-jkl012",
  "object": "charge",
  "billing_type": "CREDIT_CARD",
  "status": "PENDING",
  "value": 149.90,
  "net_value": 140.93,
  "platform_fee": 8.97,
  "payment_url": "https://pay.zucropay.com/charge/abc123def456",
  "charge_id": 12345678,
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Consultar Cobrança <a name="api-charges-get"></a>

`/api/v1/charges/{id}`

# Consultar Cobrança

Consulta os detalhes de uma cobrança específica

## Path Parameters

id 
string
ID da cobrança

## Exemplo de Request

```bash
curl -X GET https://api.appzucropay.com/api/v1/charges/abc123-def456 \
  -H "X-API-Key: zp_sua_api_key_aqui"
```

## Response

```json
{
  "id": "abc123-def456-ghi789",
  "object": "charge",
  "billing_type": "PIX",
  "status": "RECEIVED",
  "value": 99.90,
  "net_value": 93.91,
  "description": "Produto Premium",
  "pix": {
    "txid": "zp1234567890abcdefghijklmnop",
    "qr_code": "...",
    "copy_paste": "..."
  },
  "payment_date": "2026-01-20T13:05:00.000Z",
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Listar Cobranças <a name="api-charges-list"></a>

`/api/v1/charges`

# Listar Cobranças

Lista todas as cobranças com filtros opcionais

## Query Parameters

status
string
Filtrar por status: `PENDING`, `RECEIVED`, `OVERDUE`, `REFUNDED`

billing_type
string
Filtrar por tipo: `PIX`, `CREDIT_CARD`, `BOLETO`

limit
number
Número máximo de resultados (máx: 100, padrão: 50)

offset
number
Offset para paginação (padrão: 0)

## Exemplo de Request

```bash
curl -X GET "https://api.appzucropay.com/api/v1/charges?status=RECEIVED&limit=10" \
  -H "X-API-Key: zp_sua_api_key_aqui"
```

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "abc123-def456",
      "billing_type": "PIX",
      "status": "RECEIVED",
      "value": 99.90,
      "description": "Produto A",
      "created_at": "2026-01-20T13:00:00.000Z"
    },
    {
      "id": "xyz789-uvw123",
      "billing_type": "CREDIT_CARD",
      "status": "RECEIVED",
      "value": 149.90,
      "description": "Produto B",
      "created_at": "2026-01-19T10:30:00.000Z"
    }
  ],
  "total": 156,
  "has_more": true
}
```

## Consultar Saldo <a name="api-balance"></a>

`/api/v1/balance`

# Consultar Saldo

Consulta o saldo disponível, reservado e total da conta

## Exemplo de Request

```bash
curl -X GET https://api.appzucropay.com/api/v1/balance \
  -H "X-API-Key: zp_sua_api_key_aqui"
```

## Response

```json
{
  "object": "balance",
  "available": 1500.00,
  "reserved": 75.00,
  "total": 1575.00
}
```

## Sobre o Saldo

### Saldo Disponível

É o valor que você pode sacar a qualquer momento.

### Saldo Reservado

5% de cada venda fica em reserva por 30 dias como garantia contra chargebacks e estornos. Após esse período, o valor é automaticamente liberado para o saldo disponível.

          O saldo reservado é uma medida de segurança padrão do mercado de pagamentos. Ele protege tanto você quanto a plataforma contra fraudes.
        

## Criar Webhook <a name="api-webhooks-create"></a>

`/api/webhooks`

# Criar Webhook

Registra um novo endpoint de webhook para receber notificações

## Request Body

url 
string
URL do endpoint que receberá as notificações

events 
array
Lista de eventos: `payment.received`, `payment.failed`, `payment.expired`, `withdrawal.approved`, `withdrawal.rejected`

secret
string
Chave secreta para validar assinaturas (gerada automaticamente se não fornecida)

## Exemplo de Request

```bash
curl -X POST https://api.appzucropay.com/api/webhooks \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://seusite.com/webhooks/zucropay",
    "events": ["payment.received", "payment.failed"]
  }'
```

## Response

```json
{
  "success": true,
  "webhook": {
    "id": "wh_abc123",
    "url": "https://seusite.com/webhooks/zucropay",
    "events": ["payment.received", "payment.failed"],
    "secret": "whsec_xyz789",
    "active": true
  }
}
```

## JavaScript / Node.js <a name="sdk-javascript"></a>

# JavaScript / Node.js

Integração com JavaScript e Node.js

## Instalação

Você pode usar fetch nativo ou axios para integrar com a API ZucroPay.

```bash
npm install axios
```

## Configuração

```javascript
const ZUCROPAY_API_KEY = 'sua_api_key';
const ZUCROPAY_BASE_URL = 'https://api.appzucropay.com';

const api = axios.create({
  baseURL: ZUCROPAY_BASE_URL,
  headers: {
    'X-API-Key': ZUCROPAY_API_KEY,
    'Content-Type': 'application/json'
  }
});
```

## Criar Cobrança PIX

```javascript
async function criarCobrancaPix(valor, descricao, cliente) {
  try {
    const response = await api.post('/api/v1/charges', {
      value: valor,
      description: descricao,
      billing_type: 'PIX',
      customer: {
        name: cliente.nome,
        cpf_cnpj: cliente.cpf,
        email: cliente.email
      }
    });

    console.log('QR Code:', response.data.pix.qr_code);
    console.log('Copia e Cola:', response.data.pix.copy_paste);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cobrança:', error.response?.data);
    throw error;
  }
}

// Uso
const cobranca = await criarCobrancaPix(
  99.90, 
  'Produto XYZ',
  { nome: 'João Silva', cpf: '12345678900', email: 'joao@email.com' }
);
```

## Classe Completa

```javascript
class ZucroPay {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.appzucropay.com';
  }

  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    return response.json();
  }

  // Cobranças
  async criarCobranca(data) {
    return this.request('POST', '/api/v1/charges', data);
  }

  async buscarCobranca(id) {
    return this.request('GET', `/api/v1/charges/${id}`);
  }

  async listarCobrancas() {
    return this.request('GET', '/api/v1/charges');
  }

  async estornarCobranca(id, amount) {
    return this.request('POST', `/api/v1/charges/${id}/refund`, { amount });
  }

  // Produtos
  async criarProduto(data) {
    return this.request('POST', '/api/v1/products', data);
  }

  async listarProdutos() {
    return this.request('GET', '/api/v1/products');
  }

  // Links de Pagamento
  async criarLink(data) {
    return this.request('POST', '/api/v1/payment-links', data);
  }

  async listarLinks() {
    return this.request('GET', '/api/v1/payment-links');
  }

  // Saldo e Saques
  async saldo() {
    return this.request('GET', '/api/v1/balance');
  }

  async solicitarSaque(amount, pix_key) {
    return this.request('POST', '/api/v1/withdrawals', { amount, pix_key });
  }
}

// Uso
const zucropay = new ZucroPay('zp_sua_api_key');
const cobranca = await zucropay.criarCobranca({
  value: 100,
  description: 'Teste',
  billing_type: 'PIX',
  customer: { name: 'Cliente', cpf_cnpj: '12345678900' }
});
```

## Estornar Cobrança <a name="api-charges-refund"></a>

`/api/v1/charges/{id}/refund`

# Estornar Cobrança

Estorna uma cobrança já paga

## Path Parameters

id 
string
ID da cobrança a ser estornada

## Request Body

amount
number
Valor a estornar (se não informado, estorna o valor total)

reason
string
Motivo do estorno

## Exemplo de Request

```bash
curl -X POST https://api.appzucropay.com/api/v1/charges/abc123/refund \
  -H "Content-Type: application/json" \
  -H "X-API-Key: zp_sua_api_key_aqui" \
  -d '{
    "amount": 50.00,
    "reason": "Cliente solicitou devolução"
  }'
```

## Response

```json
{
  "object": "refund",
  "id": "ref_a1b2c3d4e5f6",
  "charge_id": "abc123",
  "amount": 50.00,
  "reason": "Cliente solicitou devolução",
  "status": "succeeded",
  "created_at": "2026-01-20T14:00:00.000Z"
}
```

## Criar Cliente <a name="api-customers-create"></a>

`/api/v1/customers`

# Criar Cliente

Cadastra um novo cliente

## Request Body

name 
string
Nome do cliente

email
string
Email do cliente

cpf_cnpj
string
CPF ou CNPJ (apenas números)

phone
string
Telefone

## Response

```json
{
  "object": "customer",
  "id": "cus_abc123def456",
  "name": "João Silva",
  "email": "joao@email.com",
  "cpf_cnpj": "12345678900",
  "phone": "11999999999",
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Listar Clientes <a name="api-customers-list"></a>

`/api/v1/customers`

# Listar Clientes

Lista todos os clientes cadastrados

## Response

```json
{
  "object": "list",
  "data": [],
  "total": 0,
  "has_more": false
}
```

## Criar Link de Pagamento <a name="api-links-create"></a>

`/api/v1/payment-links`

# Criar Link de Pagamento

Cria um novo link de pagamento

## Request Body

name 
string
Nome do link

value 
number
Valor do pagamento

description
string
Descrição do link

billing_type
string
Tipo de pagamento: PIX, CREDIT_CARD ou UNDEFINED

## Response

```json
{
  "object": "payment_link",
  "id": "abc123-def456",
  "name": "Produto Premium",
  "description": "Acesso vitalício",
  "value": 299.90,
  "billing_type": "UNDEFINED",
  "checkout_url": "https://dashboard.appzucropay.com/checkout/abc123-def456",
  "active": true,
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Listar Links de Pagamento <a name="api-links-list"></a>

`/api/v1/payment-links`

# Listar Links de Pagamento

Lista todos os links de pagamento

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "abc123-def456",
      "name": "Produto Premium",
      "value": 299.90,
      "billing_type": "UNDEFINED",
      "checkout_url": "https://dashboard.appzucropay.com/checkout/abc123-def456",
      "active": true,
      "total_received": 1500.00,
      "created_at": "2026-01-20T13:00:00.000Z"
    }
  ],
  "total": 1
}
```

## Desativar Link <a name="api-links-delete"></a>

`/api/v1/payment-links/{id}`

# Desativar Link

Desativa um link de pagamento

## Response

```json
{
  "success": true,
  "message": "Link desativado"
}
```

## Criar Produto <a name="api-products-create"></a>

`/api/v1/products`

# Criar Produto

Cadastra um novo produto

## Request Body

name 
string
Nome do produto

price 
number
Preço do produto

description
string
Descrição do produto

image_url
string
URL da imagem

stock
number
Quantidade em estoque

## Response

```json
{
  "object": "product",
  "id": "prod_abc123",
  "name": "Curso Premium",
  "description": "Acesso vitalício ao curso",
  "price": 497.00,
  "image_url": "https://exemplo.com/imagem.jpg",
  "stock": null,
  "active": true,
  "created_at": "2026-01-20T13:00:00.000Z"
}
```

## Listar Produtos <a name="api-products-list"></a>

`/api/v1/products`

# Listar Produtos

Lista todos os produtos

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "prod_abc123",
      "name": "Curso Premium",
      "description": "Acesso vitalício",
      "price": 497.00,
      "image_url": "https://exemplo.com/imagem.jpg",
      "stock": null,
      "active": true,
      "created_at": "2026-01-20T13:00:00.000Z"
    }
  ],
  "total": 1
}
```

## Atualizar Produto <a name="api-products-update"></a>

`/api/v1/products/{id}`

# Atualizar Produto

Atualiza um produto existente

## Request Body

name
string
Novo nome

price
number
Novo preço

description
string
Nova descrição

active
boolean
Ativar/desativar produto

## Response

```json
{
  "object": "product",
  "id": "prod_abc123",
  "name": "Curso Premium Atualizado",
  "price": 597.00,
  "active": true
}
```

## Excluir Produto <a name="api-products-delete"></a>

`/api/v1/products/{id}`

# Excluir Produto

Remove um produto

## Response

```json
{
  "success": true,
  "message": "Produto excluído"
}
```

## Listar Transações <a name="api-transactions-list"></a>

`/api/v1/transactions`

# Listar Transações

Lista o histórico de transações

## Query Parameters

type
string
Filtrar por tipo de transação

limit
number
Limite de resultados (máx: 100)

offset
number
Offset para paginação

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "txn_abc123",
      "type": "credit",
      "amount": 99.90,
      "status": "completed",
      "description": "Pagamento recebido",
      "created_at": "2026-01-20T13:05:00.000Z"
    }
  ],
  "total": 1
}
```

## Solicitar Saque <a name="api-withdrawals-create"></a>

`/api/v1/withdrawals`

# Solicitar Saque

Solicita um novo saque

## Request Body

amount 
number
Valor do saque

pix_key
string
Chave PIX para receber o saque

## Response

```json
{
  "object": "withdrawal",
  "id": "wd_abc123",
  "amount": 500.00,
  "status": "pending",
  "created_at": "2026-01-20T14:00:00.000Z"
}
```

## Listar Saques <a name="api-withdrawals-list"></a>

`/api/v1/withdrawals`

# Listar Saques

Lista todos os saques solicitados

## Query Parameters

status
string
Filtrar por status: pending, approved, rejected

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "wd_abc123",
      "amount": 500.00,
      "status": "approved",
      "pix_key": "email@exemplo.com",
      "created_at": "2026-01-20T14:00:00.000Z"
    }
  ],
  "total": 1
}
```

## Listar Webhooks <a name="api-webhooks-list"></a>

`/api/v1/webhooks`

# Listar Webhooks

Lista todos os webhooks configurados

## Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "wh_abc123",
      "url": "https://seusite.com/webhook",
      "events": ["payment.received", "payment.refunded"],
      "status": "active",
      "created_at": "2026-01-20T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

## Remover Webhook <a name="api-webhooks-delete"></a>

`/api/v1/webhooks/{id}`

# Remover Webhook

Remove um webhook configurado

## Response

```json
{
  "success": true,
  "message": "Webhook removido"
}
```

## Criar API Key <a name="api-keys-create"></a>

`/api/v1/keys`

# Criar API Key

Gera uma nova API Key (requer autenticação JWT)

## Request Body

name
string
Nome descritivo para a API Key

## Response

```json
{
  "success": true,
  "id": "key_abc123",
  "name": "Minha API Key",
  "api_key": "zp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  "created_at": "2026-01-20T10:00:00.000Z",
  "warning": "Guarde esta chave em local seguro. Ela não será exibida novamente."
}
```

**Importante:** A API Key completa só é exibida uma vez no momento da criação. Guarde-a em local seguro!
        

## Listar API Keys <a name="api-keys-list"></a>

`/api/v1/keys`

# Listar API Keys

Lista todas as API Keys (requer autenticação JWT)

## Response

```json
{
  "keys": [
    {
      "id": "key_abc123",
      "name": "Minha API Key",
      "api_key": "zp_a1b2...t0",
      "status": "active",
      "last_used_at": "2026-01-20T15:30:00.000Z",
      "created_at": "2026-01-20T10:00:00.000Z"
    }
  ]
}
```

## Revogar API Key <a name="api-keys-revoke"></a>

`/api/v1/keys/{id}`

# Revogar API Key

Revoga uma API Key (requer autenticação JWT)

## Response

```json
{
  "success": true,
  "message": "API Key revogada"
}
```

          API Keys revogadas param de funcionar imediatamente. Certifique-se de atualizar suas integrações antes de revogar.
        
