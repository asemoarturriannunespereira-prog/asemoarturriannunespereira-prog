# Figurinhas de Bot — BotChatBotia



Esta pasta explica como transformar uma imagem ou vídeo curto em figurinha e como enviar o arquivo com segurança. Use apenas mídias próprias, licenciadas ou autorizadas.



## Estrutura



```text

figurinhas/

├── README.md

├── converter-sticker.mjs

├── enviar-sticker.mjs

└── media/.gitkeep

```



## Fluxo



1. Receba a mídia apenas quando o usuário solicitar a conversão.
2. 
2. Valide o tipo e o tamanho do arquivo.
3. 
3. Converta para WebP com fundo e dimensões adequados.
4. 
4. Envie a figurinha no chat correto.
5. 
5. Remova arquivos temporários depois do processamento.
6. 


## Comandos sugeridos



| Comando | Resultado |

|---|---|

| `/sticker` | Converte a imagem respondida em figurinha |

| `/figurinhas` | Mostra o menu de stickers |

| `/sticker-info` | Exibe formato e tamanho aceitos |

| `/sticker-pack` | Lista as figurinhas do pacote local |



## Conversão com Sharp



```bash

npm install sharp dotenv

node converter-sticker.mjs entrada.png saida.webp

```



```js

// converter-sticker.mjs

import sharp from 'sharp'



const [, , input, output = 'sticker.webp'] = process.argv

if (!input) throw new Error('Informe o arquivo de entrada')



await sharp(input)

  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })

  .webp({ quality: 82 })

  .toFile(output)



console.log(`Figurinha criada: ${output}`)

```



## Envio com Baileys



```js

// enviar-sticker.mjs

import { readFile } from 'node:fs/promises'



export async function sendSticker(sock, jid, filePath) {

  const sticker = await readFile(filePath)

  if (!jid || !sticker.length) throw new Error('Chat ou figurinha inválidos')

  return sock.sendMessage(jid, { sticker })

}

```



A forma exata de iniciar `sock` depende da versão do Baileys. Consulte os tipos da versão instalada e teste em um chat privado antes de usar em grupos.



## Respostas do bot



```js

export function stickerMenu() {

  return [

    '🎨 Menu de figurinhas',

    '',

    '1. Responda a uma imagem com /sticker',

    '2. Use /sticker-info para ver os requisitos',

    '3. Use /sticker-pack para listar o pacote',

    '',

    'Use somente mídias autorizadas.'

  ].join('\\n')

}

```



## Segurança



Limite o tamanho do upload, recuse extensões perigosas, não execute arquivos recebidos e não salve mídias indefinidamente. Nunca use o bot para coletar imagens sem consentimento ou distribuir conteúdo protegido sem autorização.






