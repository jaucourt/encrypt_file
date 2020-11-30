import crypto from 'crypto'
import fs from 'fs'
const AES_KEY = 'snortingBuffaloWyldThingGruffalo'

const d = crypto.createDecipheriv('aes-256-cbc', AES_KEY, Buffer.from(crypto.randomBytes(16)));
const eText = fs.readFileSync('./sample_text_encoded-new', { encoding: 'utf-8' })
const decrypted = `${d.update(eText, 'base64', 'utf8')}${d.final('utf-8')}`
fs.writeFileSync('./sample_text_decoded', decrypted, { encoding: 'utf-8' })