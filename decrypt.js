import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'snortingBuffaloWyldThingGruffalo'
const privateKey = await openpgp.readKey({ armoredKey: fs.readFileSync('sample_private.key', {encoding: 'utf8'}) })
const fileToDecrypt = 'sample_data.json'

const decryptFile = async () => {
  await privateKey.decrypt(passphrase);

  const encryptedData = fs.readFileSync(`${fileToDecrypt}.enc`);
  const decrypted = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedData }),
    privateKeys: privateKey
  });

  fs.writeFileSync(`decrypted-${fileToDecrypt}`, decrypted.data)
}

decryptFile()