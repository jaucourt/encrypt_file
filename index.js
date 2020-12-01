import aesjs from 'aes-js'
import fs from 'fs'
import crypto from 'crypto'

const AES_KEY = 'snortingBuffaloWyldThingGruffalo'
const IV = 'qwertyuiop123456'

const encodeFile = (key, inputFileName, outputFileName) => {
  const cipher = crypto.createCipheriv(algorithm, key, IV);
  const input = fs.createReadStream(inputFileName);
  const output = fs.createWriteStream(outputFileName);
  input 
    .pipe(cipher)  
    .pipe(output)
}

encodeFile(AES_KEY, './sample_text', './sample_text_encoded')
