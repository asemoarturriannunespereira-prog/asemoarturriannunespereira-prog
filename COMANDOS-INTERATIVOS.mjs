// COMANDOS-INTERATIVOS.mjs

// Exemplos para WhatsApp Cloud API. Nunca coloque tokens neste arquivo.



export function buttonMenu(to) {
  
  return {
    
    messaging_product: 'whatsapp',
    
    recipient_type: 'individual',
    
    to,
    
    type: 'interactive',
    
    interactive: {
      
      type: 'button',
      
      body: { text: '🤖 Escolha uma opção' },
      
      footer: { text: 'BotChatBotia • atendimento responsável' },
      
      action: {
        
        buttons: [
          
          { type: 'reply', reply: { id: 'bots', title: '🤖 Bots' } },
          
          { type: 'reply', reply: { id: 'tickets', title: '🎫 Tickets' } },
          
          { type: 'reply', reply: { id: 'stickers', title: '🎨 Stickers' } }
          
        ]
          
      }
        
    }
      
  }
  
}



export function listMenu(to) {
  
  return {
    
    messaging_product: 'whatsapp',
    
    to,
    
    type: 'interactive',
    
    interactive: {
      
      type: 'list',
      
      header: { type: 'text', text: '🧭 Central de comandos' },
      
      body: { text: 'Selecione um fluxo para continuar.' },
      
      action: {
        
        button: 'Abrir opções',
        
        sections: [{
          
          title: 'Fluxos',
          
          rows: [
            
            { id: 'criar_bot', title: 'Criar bot', description: 'Guia de arquitetura' },
            
            { id: 'abrir_ticket', title: 'Abrir ticket', description: 'Registrar atendimento' },
            
            { id: 'enviar_sticker', title: 'Enviar sticker', description: 'Usar mídia autorizada' }
            
          ]
            
        }]
          
      }
        
    }
      
  }
  
}



export function routeReply(id) {
  
  const routes = {
    
    bots: '🤖 Abra README-bots.md para começar.',
    
    tickets: '🎫 Use /ticket abrir <assunto>.',
    
    stickers: '🎨 Consulte figurinhas/ para usar WebP autorizado.',
    
    criar_bot: '🧩 Comece pelo fluxo e pela arquitetura do repositório.',
    
    abrir_ticket: '🎫 Informe o assunto do seu atendimento.',
    
    enviar_sticker: '✅ Responda a uma mídia autorizada e use o conversor.'
      
  }
  
  return routes[id] ?? '❔ Opção não reconhecida. Use /ajuda.'
  
}



export function openTicket(userId, subject = 'Atendimento') {
  
  if (!userId || !subject.trim()) throw new Error('userId e assunto são obrigatórios')
  
  return { id: `T-${Date.now()}`, userId, subject: subject.trim(), status: 'aberto' }
  
}



export function closeTicket(ticket, userId) {
  
  if (!ticket || ticket.userId !== userId) return { ok: false, message: 'Ticket não encontrado.' }
  
  return { ok: true, ticket: { ...ticket, status: 'fechado' }, message: '✅ Ticket encerrado.' }
  
}


























































