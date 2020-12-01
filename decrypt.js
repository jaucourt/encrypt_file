import crypto from 'crypto'
import fs from 'fs'
const AES_KEY = 'snortingBuffaloWyldThingGruffalo'
const IV = 'qwertyuiop123456'

const input = fs.createReadStream('./sample_text_encoded');
const output = fs.createWriteStream('./sample_text_decoded');
const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, IV);
input
    .pipe(decipher)
    .pipe(output)
