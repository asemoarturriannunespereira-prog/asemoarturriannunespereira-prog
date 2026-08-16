# 🎛️ Catálogo de Comandos WhatsApp — BotChatBotia



> Catálogo público na raiz do repositório. Os exemplos abaixo são didáticos e seguros. Comandos marcados como **exemplo** precisam ser conectados ao seu transporte WhatsApp e testados antes do uso.
> 


## ✅ Comandos implementados no perfil



| Comando | Função | Acesso |

|---|---|---|

| `/ping` | Verifica se o bot está online | Todos |

| `/ajuda` | Mostra o menu de ajuda | Todos |

| `/menu` | Abre o menu principal | Todos |

| `/info` | Exibe identidade e versão do bot | Todos |

| `/eco texto` | Repete texto com limite de tamanho | Todos |

| `/status` | Mostra o estado do serviço | Todos |

| `/figurinhas` | Mostra o menu de stickers | Todos |

| `/sticker` | Converte mídia autorizada respondida | Todos |



## 🎯 Botões interativos — Cloud API oficial



A Cloud API aceita mensagens interativas do tipo `button` com até três botões de resposta e do tipo `list` com até dez linhas. Use-as dentro da janela de atendimento permitida pela plataforma e trate o retorno recebido pelo webhook. Consulte a documentação oficial da Meta antes de alterar os limites.



```js

// exemplo-botao-interativo.mjs

export function buildQuickButtons() {

  return {

    messaging_product: 'whatsapp',

    recipient_type: 'individual',

    to: process.env.WA_TO,

    type: 'interactive',

    interactive: {

      type: 'button',

      body: { text: '🤖 Como posso ajudar?' },

      footer: { text: 'BotChatBotia • escolha uma opção' },

      action: {

        buttons: [

          { type: 'reply', reply: { id: 'menu_bots', title: '🤖 Ver bots' } },

          { type: 'reply', reply: { id: 'menu_stickers', title: '🎨 Figurinhas' } },

          { type: 'reply', reply: { id: 'abrir_ticket', title: '🎫 Abrir ticket' } }

        ]

      }

    }

  }

}

```



## 📋 Menus e listas



```js

// exemplo-menu-lista.mjs

export function buildMenuList(to) {

  return {

    messaging_product: 'whatsapp',

    to,

    type: 'interactive',

    interactive: {

      type: 'list',

      header: { type: 'text', text: '🧭 Central BotChatBotia' },

      body: { text: 'Selecione uma área para continuar.' },

      footer: { text: 'Responda apenas pelo menu.' },

      action: {

        button: 'Abrir menu',

        sections: [{

          title: 'Opções',

          rows: [

            { id: 'bot_criar', title: '🤖 Criar bot', description: 'Passo a passo seguro' },

            { id: 'bot_status', title: '📡 Status', description: 'Ver disponibilidade' },

            { id: 'bot_ticket', title: '🎫 Ticket', description: 'Solicitar atendimento' },

            { id: 'bot_sticker', title: '🎨 Sticker', description: 'Ver instruções de figurinha' }

          ]

        }]

      }

    }

  }

}

```



## 🎫 Tickets de atendimento



| Comando | Ação |

|---|---|

| `/ticket abrir assunto` | Cria uma solicitação com identificador único |

| `/ticket ver` | Mostra o ticket do próprio usuário |

| `/ticket adicionar texto` | Acrescenta informação ao próprio ticket |

| `/ticket fechar` | Solicita encerramento do ticket |

| `/ticket ajuda` | Explica o fluxo de atendimento |



```js

// ticket.mjs — exemplo de estado local

const tickets = new Map()



export function openTicket(userId, subject = 'Atendimento') {

  const id = `T-${Date.now()}`

  tickets.set(id, { id, userId, subject, status: 'aberto', messages: [] })

  return `🎫 Ticket ${id} criado. Status: aberto.`

}



export function closeTicket(userId, id) {

  const ticket = tickets.get(id)

  if (!ticket || ticket.userId !== userId) return 'Não encontrei um ticket seu.'

  ticket.status = 'fechado'

  return `✅ Ticket ${id} fechado.`

}

```



## 🎨 Emojis e comandos de figurinha



| Comando | Resposta visual sugerida |

|---|---|

| `/figurinha feliz` | 😄✨🎨 |

| `/figurinha bot` | 🤖⚙️💡 |

| `/figurinha aprovado` | ✅🟢🏆 |

| `/figurinha alerta` | ⚠️🚧🔔 |

| `/figurinha suporte` | 🛠️🎫💬 |

| `/figurinha deploy` | 🚀📦🟣 |

| `/figurinha café` | ☕🧠💻 |

| `/figurinha sucesso` | 🎉✅🌟 |

| `/figurinha foco` | 🎯🧩📚 |

| `/figurinha segurança` | 🔐🛡️🔒 |



> Os emojis acima são respostas textuais. Para enviar imagens WebP como stickers, use os scripts da pasta [`figurinhas/`](./figurinhas) e somente mídias próprias, licenciadas ou autorizadas.
> 


## 🧰 Categorias para expansão



| Categoria | Exemplos de comandos |

|---|---|

| Ajuda | `/ajuda`, `/comandos`, `/atalhos`, `/sobre` |

| Bot | `/bot`, `/bot-info`, `/bot-versao`, `/bot-status` |

| Menus | `/menu`, `/menu-bots`, `/menu-suporte`, `/menu-config` |

| Atendimento | `/ticket`, `/fila`, `/atendente`, `/protocolo` |

| Figurinhas | `/sticker`, `/figurinhas`, `/sticker-info`, `/sticker-pack` |

| Mídia autorizada | `/imagem`, `/audio`, `/documento`, `/converter` |

| Projeto | `/roadmap`, `/changelog`, `/contribuir`, `/issues` |

| Segurança | `/privacidade`, `/seguranca`, `/consentimento`, `/sair` |

| Administração | `/admin-status`, `/admin-logs`, `/admin-config` |

| Aprendizagem | `/tutorial`, `/exemplo`, `/desafio`, `/quiz` |



## 🧪 Trat

