// figurinhas/converter-sticker.mjs



import sharp from 'sharp'



const [, , input, output = 'sticker.webp'] = process.argv

const MAX_BYTES = 10 * 1024 * 1024



if (!input) {
  
  console.error('Uso: node converter-sticker.mjs entrada.png saida.webp')
  
  process.exit(1)
  
}



const metadata = await sharp(input).metadata()

const stats = await sharp(input).clone().toBuffer({ resolveWithObject: true })



if (stats.info.size > MAX_BYTES) {
  
  throw new Error('A mídia excede o limite de 10 MB.')
  
}



await sharp(input)

  .resize(512, 512, {
    
    fit: 'contain',
    
    background: { r: 0, g: 0, b: 0, alpha: 0 }
      
  })

  .webp({ quality: 82 })

  .toFile(output)



console.log(`Figurinha criada: ${output}`)

console.log(`Formato original: ${metadata.format || 'desconhecido'}`)









