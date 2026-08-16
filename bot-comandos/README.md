# Comandos de Bot — BotChatBotia



Esta pasta reúne comandos seguros e didáticos para estudar bots de WhatsApp. Cada comando tem uma responsabilidade clara: responder, informar, transformar mídia ou executar uma ação autorizada.



## Estrutura



```text

bot-comandos/

├── README.md

├── comandos-basicos.mjs

├── menu-interativo.mjs

├── respostas.mjs

└── admin-autorizado.mjs

```



## Comandos disponíveis



| Comando | Função | Acesso |

|---|---|---|

| `/ping` | Verifica se o bot está online | Todos |

| `/ajuda` | Mostra os comandos disponíveis | Todos |

| `/menu` | Abre um menu de opções | Todos |

| `/info` | Mostra informações do bot | Todos |

| `/eco` | Repete uma mensagem validada | Todos |

| `/figurinhas` | Explica como criar stickers | Todos |

| `/status` | Mostra o estado do serviço | Todos |

| `/reiniciar` | Solicita reinicialização controlada | Administrador |



## Como organizar



Cada comando deve validar a entrada, responder com uma mensagem curta e tratar erros. Não use comandos para spam, coleta de dados, invasão, burlar banimentos ou disparos sem consentimento.



## Dispatcher básico



```js

const commands = new Map([

  ['/ping', () => 'pong — bot online'],

  ['/ajuda', () => helpText],

  ['/menu', () => menuText],

  ['/info', () => 'BotChatBotia • automação responsável'],

  ['/figurinhas', () => 'Use a pasta figurinhas para converter e enviar mídia.']

])



export function dispatch(text) {

  const [name, ...args] = text.trim().split(/\\s+/)

  const command = commands.get(name.toLowerCase())

  if (!command) return 'Comando não encontrado. Use /ajuda.'

  return command(args)

}

```



## Boas práticas



Use nomes curtos, respostas previsíveis e mensagens de erro compreensíveis. Separe a lógica de negócio do transporte do WhatsApp para poder testar os comandos sem conectar uma conta real.



Consulte também `docs/WHATSAPP-CARROSSEL.md` para transformar o menu em cartões deslizáveis quando a API utilizada oferecer suporte.

