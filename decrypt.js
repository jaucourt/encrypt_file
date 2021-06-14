import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'hereIsAPassphrase'
const privateKey = await openpgp.decryptKey({
  privateKey: await openpgp.readKey({ armoredKey: fs.readFileSync('private-key.asc', {encoding: 'utf8'}) }),
  passphrase
});

const fileToDecrypt = 'sample_data.json'

const decryptFile = async () => {
  const encryptedData = fs.readFileSync(`${fileToDecrypt}.enc`, {encoding: 'utf8'});

  const { data: decrypted } = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: encryptedData }),
      decryptionKeys: privateKey
  });

  fs.writeFileSync(`decrypted-${fileToDecrypt}`, decrypted)
}

decryptFile()