import aesjs from 'aes-js'
import fs from 'fs'
import crypto from 'crypto'

const AES_KEY = 'snortingBuffaloWyldThingGruffalo'
const BUFFER_ENCRYPTION = 'utf16le'

const getKey = (aesKey, encryption) => {
  if (aesKey.length < 32) {
    throw new Error(`Key phrase isn't long enough, should be 32 characters long and it's only ${aesKey.length}`)
  }
  const keyBuffer = Buffer.from(aesKey, encryption);
  const key = new Uint16Array(
    keyBuffer.buffer,
    keyBuffer.byteOffset,
    keyBuffer.length / Uint16Array.BYTES_PER_ELEMENT);
  return key.slice(0,32)
}

const encodeFile = (key, inputFileName, outputFileName) => {
  const iv = Buffer.from(crypto.randomBytes(16))
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv)
  const text = fs.readFileSync(inputFileName, { encoding: 'utf-8' })
  const output = `${cipher.update(text, 'utf-8', 'base64')}${cipher.final('base64')}`
  fs.writeFileSync(outputFileName, output, { encoding: 'utf-8' })
}

encodeFileNew(AES_KEY, './sample_text', './sample_text_encoded-new')
