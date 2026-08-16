# Mensagem interativa do WhatsApp em carrossel



> Guia prático para criar, editar e testar carrosséis horizontais com cartões de mídia.


> Este material separa a integração oficial da Meta do uso experimental do fork Baileys recuperado. Não coloque tokens, números pessoais ou credenciais dentro do código público.
> 


## 1. O que é um carrossel



Um carrossel é uma mensagem com cartões que o usuário desliza horizontalmente no WhatsApp. Cada cartão pode ter uma imagem ou vídeo, um texto curto e uma ação.



Na WhatsApp Business Platform, o carrossel de mídia usa `type: "interactive"` e `interactive.type: "carousel"`.



A API oficial exige entre 2 e 10 cartões. O corpo principal da mensagem é obrigatório. Cada cartão precisa de imagem ou vídeo no cabeçalho e deve usar um botão de URL ou botões de resposta rápida.



Os cartões devem manter o mesmo tipo e a mesma quantidade de botões. Um cartão não deve ter dois botões se os demais têm apenas um.



## 2. Escolha o caminho correto



| Caminho | Quando usar | Nível de garantia |

|---|---|---|

| WhatsApp Cloud API | Produção, negócios, templates e suporte oficial | Caminho recomendado pela Meta |

| Baileys recuperado | Estudos, protótipos e automação controlada | Depende da versão do fork e do cliente |

| Botões ou lista | Quando carrossel não está disponível | Alternativa mais simples |



O fork `@itsliaaa/baileys` declara suporte a mensagens interativas, incluindo carrosséis, mas o próprio projeto informa que possui escopo limitado e não substitui o Baileys upstream. Por isso, teste cada versão antes de usar em produção.



## 3. Requisitos da Cloud API



Você precisa de um aplicativo Meta configurado para WhatsApp Business Platform, um número comercial, um identificador de telefone, um token de acesso e um destinatário autorizado para testes.



O token deve ficar em variável de ambiente. Nunca publique o token no README, em Issues ou em um arquivo JavaScript enviado ao GitHub.



Exemplo de arquivo `.env` local:



```env

WHATSAPP_ACCESS_TOKEN=cole_o_token_apenas_no_ambiente_local

WHATSAPP_PHONE_NUMBER_ID=seu_id_de_telefone

WHATSAPP_API_VERSION=v23.0

WHATSAPP_TO=numero_de_teste_com_codigo_do_pais

```



Adicione `.env` ao `.gitignore`:



```gitignore

.env

.env.*

!.env.example

session/

credentials/

```



Crie um exemplo seguro para outras pessoas:



```env

WHATSAPP_ACCESS_TOKEN=

WHATSAPP_PHONE_NUMBER_ID=

WHATSAPP_API_VERSION=v23.0

WHATSAPP_TO=

```



## 4. Payload oficial com URL



O exemplo a seguir envia três cartões com imagem, texto e botão de URL. Substitua todos os valores de demonstração pelos seus próprios dados antes de testar.



```json

{

  "messaging_product": "whatsapp",

  "recipient_type": "individual",

  "to": "16505551234",

  "type": "interactive",

  "interactive": {

    "type": "carousel",

    "body": {

      "text": "Escolha uma opção para conhecer os projetos do bot:"

    },

    "action": {

      "cards": [

        {

          "card_index": 0,

          "type": "cta_url",

          "header": {"type": "image", "image": {"link": "https://example.com/cards/fluxo.png"}},

          "body": {"text": "Fluxo do bot\\n\\nVeja como uma mensagem entra, é validada e recebe uma resposta."},

          "action": {"name": "cta_url", "parameters": {"display_text": "Ver fluxo", "url": "https://example.com/fluxo"}}

        },

        {

          "card_index": 1,

          "type": "cta_url",

          "header": {"type": "image", "image": {"link": "https://example.com/cards/api.png"}},

          "body": {"text": "Integração com API\\n\\nConecte o bot a serviços externos com validação e logs."},

          "action": {"name": "cta_url", "parameters": {"display_text": "Ver API", "url": "https://example.com/api"}}

        },

        {

          "card_index": 2,

          "type": "cta_url",

          "header": {"type": "image", "image": {"link": "https://example.com/cards/testes.png"}},

          "body": {"text": "Testes e segurança\\n\\nUse variáveis de ambiente e teste os caminhos de erro."},

          "action": {"name": "cta_url", "parameters": {"display_text": "Ver testes", "url": "https://example.com/testes"}}

        }

      ]

    }

  }

}

```



## 5. Envio com Node.js e `fetch`



Crie `send-carousel.mjs` em um projeto local. O script não contém token real.



```js

import 'dotenv/config'



const version = process.env.WHATSAPP_API_VERSION || 'v23.0'

const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

const token = process.env.WHATSAPP_ACCESS_TOKEN

const recipient = process.env.WHATSAPP_TO



if (!phoneNumberId || !token || !recipient) {

  throw new Error('Defina WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN e WHATSAPP_TO')

}



const endpoint = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`



function makeCard(index, title, imageUrl, destination) {

  return {

    card_index: index,

    type: 'cta_url',

    header: { type: 'image', image: { link: imageUrl } },

    body: { text: `${title}\\n\\nEtapa documentada do fluxo do bot.` },

    action: { name: 'cta_url', parameters: { display_text: 'Abrir guia', url: destination } }

  }

}



const payload = {

  messaging_product: 'whatsapp',

  recipient_type: 'individual',

  to: recipient,

  type: 'interactive',

  interactive: {

    type: 'carousel',

    body: { text: 'Conheça três etapas para criar um bot confiável:' },

    action: { cards: [



