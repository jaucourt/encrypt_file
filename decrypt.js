import crypto from 'crypto'
import fs from 'fs'
const AES_KEY = 'snortingBuffaloWyldThingGruffalo'

const iv = 'qwertyuiop123456'
const d = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv)
const eText = fs.readFileSync('./sample_text_encoded', { encoding: 'utf8' })
const decrypted = `${d.update(eText, 'base64', 'utf8')}${d.final('utf8')}`
fs.writeFileSync('./sample_text_decoded', decrypted, { encoding: 'utf8' })