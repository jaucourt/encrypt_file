import aesjs from 'aes-js'
import fs from 'fs'
import crypto from 'crypto'

const AES_KEY = 'snortingBuffaloWyldThingGruffalo'

const encodeFile = (key, inputFileName, outputFileName) => {
  const iv = 'qwertyuiop123456' // Buffer.from(crypto.randomBytes(16))
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv)
  const text = fs.readFileSync(inputFileName, { encoding: 'utf8' })
  const output = `${cipher.update(text, 'utf8', 'base64')}${cipher.final('base64')}`
  fs.writeFileSync(outputFileName, output, { encoding: 'utf8' })
}

encodeFile(AES_KEY, './sample_text', './sample_text_encoded')
