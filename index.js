import aesjs from 'aes-js'
import fs from 'fs'

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
  const text = fs.readFileSync(inputFileName, { encoding: 'utf-8' })
  const aesCtr = new aesjs.ModeOfOperation.ctr(key)
  const textBytes = aesjs.utils.utf8.toBytes(text)
  const encryptedBytes = aesCtr.encrypt(textBytes)
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  fs.writeFileSync(outputFileName, encryptedHex, { encoding: 'utf-8' })
}

encodeFile(getKey(AES_KEY, BUFFER_ENCRYPTION), './sample_text', './sample_text_encoded')
