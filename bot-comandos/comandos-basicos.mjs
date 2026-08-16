// bot-comandos/comandos-basicos.mjs



const MAX_ECO_LENGTH = 240



export const commands = {
  
  '/ping': () => 'pong — bot online',
  
  '/ajuda': () => [
    
    '🤖 Comandos disponíveis',
    
    '/ping — verifica o bot',
    
    '/ajuda — mostra esta ajuda',
    
    '/menu — mostra opções',
    
    '/info — mostra informações',
    
    '/eco <texto> — repete texto curto',
    
    '/figurinhas — abre o menu de stickers',
    
    '/status — mostra o estado do serviço'
    
  ].join('\n'),
  
  '/menu': () => '📚 Menu: /info • /figurinhas • /status',
  
  '/info': () => 'BotChatBotia • bots, automação e IA responsável',
  
  '/figurinhas': () => '🎨 Responda a uma imagem com /sticker para converter.',
  
  '/status': () => '✅ Serviço configurado • sem tarefas pendentes',
  
  '/eco': (...args) => {
    
    const text = args.join(' ').trim()
    
    if (!text) return 'Use: /eco <texto>'
    
    if (text.length > MAX_ECO_LENGTH) return `Limite: ${MAX_ECO_LENGTH} caracteres.`
    
    return `🔁 ${text}`
    
  }
    
}



export function dispatch(input = '') {
  
  const parts = input.trim().split(/\s+/)
  
  const name = (parts.shift() || '').toLowerCase()
  
  const command = commands[name]
  
  if (!command) return 'Comando não encontrado. Use /ajuda.'
  
  return command(...parts)
  
}



if (import.meta.url === `file://${process.argv[1]}`) {
  
  console.log(dispatch(process.argv.slice(2).join(' ')))
  
}































