1 - Autenticacao
Concatene o client_id e o client_secret utilizando dois pontos (:)
Exemplo: usuarioteste_63c4ff6423765as:1759dd06464041b182f2a18abae597a

Codifique a string em Base64
Resultado do exemplo acima: dXN1YXJpb3RzdGVfNjNjNGZmNjQyMzc9PToxNzU5ZGQwNi00NjQwLTQxYjEtODJmMi1hMThhYmFlNTk3YTA===

Gere seu token
Chame o endpoint /oauth/token da api da BS juntamente com essa string no header Authorization, seguindo o formato Basic Authentication.
curl --request POST \
 --url https://api.bspay.co/v2/oauth/token \
 --header 'Authorization: Basic [SUA_CHAVE_API]' \
 --header 'accept: application/json'

Veja um exemplo de código de como implementar as instruções acima:
const clientId = 'usuarioteste_63c4ff6423765as';
const clientSecret = '1759dd06464041b182f2a18abae597a';

const credentials = `${clientId}:${clientSecret}`;
const authorizationHeader = Buffer.from(credentials).toString('base64');

const headers = {
Authorization: `Basic ${authorizationHeader}`,
Accept: 'application/json',
};

axios.post('https://api.bspay.co/v2/oauth/token', null, { headers })
.then(response => {
console.log(response.data);
})
.catch(error => {
console.error('Erro ao obter token:', error.response?.data || error.message);
});

Após criar sua chave, você pode começar a integrar com nossa API. Lembre-se de incluir a chave em todas as requisições no header Authorization.

2 - Respostas HTTP

Na nossa API, utilizamos códigos de resposta HTTP para indicar o resultado de uma solicitação. A seguir, apresentamos uma tabela que resume os códigos mais comuns que você encontrará, suas significações e exemplos de situações em que podem ser retornados.

Códigos de Sucesso (2xx)
Código Descrição Exemplo de Uso
200 OK A solicitação foi bem-sucedida.
201 Created Um novo recurso foi criado com sucesso.
204 No Content A solicitação foi bem-sucedida, mas não há conteúdo a retornar.

Códigos de Erro do Cliente (4xx)
Código Descrição Exemplo de Uso
400 Bad Request Um parâmetro obrigatório foi omitido.
401 Unauthorized A autenticação falhou ou não foi fornecida.
403 Forbidden O usuário não tem permissão para acessar o recurso.
404 Not Found O recurso solicitado não foi encontrado.
422 Unprocessable Entity A solicitação está bem formada, mas não pode ser processada (ex: dados inválidos).

Códigos de Erro do Servidor (5xx)
Código Descrição Exemplo de Uso
500 Internal Server Error Ocorreu um erro inesperado no servidor.
502 Bad Gateway O servidor agindo como um gateway recebeu uma resposta inválida.
503 Service Unavailable O serviço está temporariamente indisponível.

Observações Importantes:

Respostas Detalhadas: Sempre que possível, a API retornará uma mensagem de erro detalhada no corpo da resposta, indicando a causa do problema.
Verificação de Status do Servidor: Em caso de erro 5xx, recomenda-se verificar a página de status dos servidores da Bspay para mais informações.

{
"statusCode": 401,
"message": "Credenciais Invalidas"
}

3 - Webhooks

Webhooks permitem que sua aplicação receba notificações em tempo real sobre eventos importantes de pagamento da BS PAY. Você pode usar os webhooks para acionar reações assíncronas em seu sistema, como atualizar o status de um pagamento, enviar notificações aos usuários ou iniciar processos de entrega de um produto.

Exemplo de endpoint
No exemplo abaixo você pode conferir rapidamente como criar um webhook para atualizar o status de uma compra no seu banco de dados quando você receber uma confirmação de pagamento.
import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhook/callback', async (req, res) => {
if (req.body.status !== 'PAID') {
return res.status(200).send('Received'); // Ignora notificações que não são de pagamento
}

try {
const id = req.body.external_id;
const order = await Order.find(id);

    await order.update({
      status: 'PAID',
    });

    return res.status(200).send('OK');

}
catch (err) {
console.error('Erro ao gerar QR Code:', err);
return res.status(500).send('Erro ao gerar QR Code');
}
});

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));

Agora utilize este endpoint no parâmetro postbackUrl quando for gerar um novo QR Code Pix.

app.post('/payment', async (req, res) => {
try {
const order = await Order.create({ ... });

    const response = await axios.post('https://api.bspay.co/v2/pix/qrcode', {
      amount: 100.00,
      external_id: order.id,
      postbackUrl: 'https://yourdomain.com/webhook/callback',
    }, {
      headers: {
        Authorization: 'Basic ' + process.env.BSPAY_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).send('OK');

}
catch (err) {
console.error('Erro ao gerar QR Code:', err);
return res.status(500).send('Erro ao gerar QR Code');
}
});

PASSO 1 - Gerar QR Code (Requer autenticação)

Permite que você crie um código copia-e-cola e um QR Code Pix para seu cliente fazer o pagamento.

POST https://api.bspay.co/v2/pix/qrcode

fetch('https://api.bspay.co/v2/pix/qrcode', {
method: 'POST',
headers: {
'Authorization': 'Bearer [SUA_CHAVE_API]',
'accept': 'application/json',
'content-type': 'application/json'
},
body: JSON.stringify({
amount: 100.00,
postbackUrl: 'https://example.com/webhook/callback'
})
});

Resposta 200
{
"transactionId": "4392d1d7e408d3cec04fm1zf3gv7vkq1",
"external_id": "",
"status": "PENDING",
"amount": 15,
"calendar": {
"expiration": 3000,
"dueDate": "2024-10-07 04:41:05"
},
"debtor": {
"name": "Monkey D. Luffy",
"document": "12924586666"
},
"qrcode": "00020126850014br.gov.bcb.pix2563pix.voluti.com.br/qr/v3/..."
}

Resposta 401
{
"statusCode": 401,
"message": "Unauthorized",
}

PASSO 2 - Consultar Transação

POST https://api.bspay.co/v2/consult-transaction

fetch('https://api.bspay.co/v2/consult-transaction', {
method: 'POST',
headers: {
'Authorization': 'Bearer [SUA_CHAVE_API]',
'accept': 'application/json',
'content-type': 'application/json'
},
body: JSON.stringify({
pix_id: '[ID_DA_TRANSACAO]'
})
});
