import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'hereIsAPassphrase'
const privateKey = await openpgp.decryptKey({
  privateKey: await openpgp.readKey({ armoredKey: fs.readFileSync('private-key.asc', {encoding: 'utf8'}) }),
  passphrase
});
const publicKey = await openpgp.readKey({ armoredKey: fs.readFileSync('public-key.asc', {encoding: 'utf8'}) }) 

const readableStream = fs.createReadStream('sample_data.json');

const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: readableStream }), // input as Message object
    encryptionKeys: publicKey,
    signingKeys: privateKey // optional
});
console.log(encrypted); // ReadableStream containing '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

const message = await openpgp.readMessage({
    armoredMessage: encrypted // parse armored message
});
const decrypted = await openpgp.decrypt({
    message,
    verificationKeys: publicKey, // optional
    decryptionKeys: privateKey
});
const chunks = [];
for await (const chunk of decrypted.data) {
    chunks.push(chunk);
}
const plaintext = chunks.join('');
console.log(plaintext); // 'Hello, World!'