import openpgp from 'openpgp'
import fs from 'fs'

const publicKey = await openpgp.readKey({ armoredKey: fs.readFileSync('public-key.asc', {encoding: 'utf8'}) }) 
const fileToEncrypt = 'sample_data.json'

const encryptStream = async () => {
  const readableStream = fs.createReadStream(fileToEncrypt);

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: readableStream }),
    encryptionKeys: publicKey
  });

  const ws = fs.createWriteStream(`${fileToEncrypt}.enc`)
  encrypted.pipe(ws);
  encrypted.on('end', () => console.log(`wrote file ${fileToEncrypt}.enc`));
}

encryptStream()