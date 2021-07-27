import { createHash } from 'crypto'
import { pipeline } from 'stream'
import fs from 'fs'

const hashCooker = createHash('sha256').setEncoding('hex')
pipeline(
  fs.createReadStream('decrypted-EAFF202107240001.json'),
  hashCooker,
  fs.createWriteStream('decrypted-EAFF202107240001.json.sha256'),
  () => console.log('wrote sha')
)