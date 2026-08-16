// figurinhas/enviar-sticker.mjs



import { readFile, stat } from 'node:fs/promises'



const MAX_BYTES = 1024 * 1024



export async function sendSticker(sock, jid, filePath) {
  
  if (!sock?.sendMessage) throw new Error('Socket do WhatsApp não configurado.')
  
  if (!jid || !filePath) throw new Error('Informe o chat e o caminho da figurinha.')
  

  
  const file = await stat(filePath)
  
  if (file.size > MAX_BYTES) throw new Error('A figurinha excede 1 MB.')
  

  
  const sticker = await readFile(filePath)
  
  if (!sticker.length) throw new Error('O arquivo está vazio.')
  

  
  return sock.sendMessage(jid, { sticker })
  
}



export function stickerHelp() {
  
  return [
    
    '🎨 Figurinhas',
    
    '/sticker — converte a mídia respondida',
    
    '/figurinhas — mostra este menu',
    
    'Use apenas mídia própria ou autorizada.'
    
  ].join('\n')
  
}



















