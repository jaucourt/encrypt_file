import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'snortingBuffaloWyldThingGruffalo'

const generateKeys = async () => {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase,
  })
  console.log(privateKeyArmored)
  console.log(publicKeyArmored)  
}

const privateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: OpenPGP.js v4.10.9
Comment: https://openpgpjs.org

xYYEX9OdDBYJKwYBBAHaRw8BAQdAu1czEHTeDD/mEyvS5AFu/wD3qGVmxy3I
lSBhrI3h6Vf+CQMIzKC3Uy4tY0zgX+VM+NBJ6z9HQMApkXbvhAEr2KGW/QMn
X5p82LiCzrODixuZX7qNSYhdHwBDT+AHVaY9YkXPaa+9wJ4QmSuMKap7VxgR
Ac0ccGVyc29uIDxwZXJzb25Ac29tZWJvZHkuY29tPsKPBBAWCgAgBQJf050M
BgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEAIQkQWblaFdAR1mIWIQQZ9TiY
IkW7WFdguPNZuVoV0BHWYhdtAP9QufpbwCoQVybIUQDQN/nRqyJUAvWt+8fP
fs83EBVOIQEAweHawkH9y/LPCkowCORJqOCXsoXZdECiYdTSzWm5+wnHiwRf
050MEgorBgEEAZdVAQUBAQdAak3PRDe3RBOntfVihdmeCDqvtWYQXlpgintI
rTD1ETIDAQgH/gkDCElXQQ86GFFP4J2da0/B/bqrDDonKpDFvWkSOVb8HepQ
vGOHtz+YK+VcmrOaDln5QhAb0MEDiLTFiS2LLS9mYXDVxWudEnGvHroDvQXO
GLrCeAQYFggACQUCX9OdDAIbDAAhCRBZuVoV0BHWYhYhBBn1OJgiRbtYV2C4
81m5WhXQEdZiFdMBAJgr1zcIUiZymkdZKzcPMFJTa00rfXR6hNFiUqa2VHNH
APwKacotUjAox36Ju/PM6yUk4TBtwykZ2KQTOYVBYmuvCQ==
=gl+M
-----END PGP PRIVATE KEY BLOCK-----`
const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.9
Comment: https://openpgpjs.org

xjMEX9OdDBYJKwYBBAHaRw8BAQdAu1czEHTeDD/mEyvS5AFu/wD3qGVmxy3I
lSBhrI3h6VfNHHBlcnNvbiA8cGVyc29uQHNvbWVib2R5LmNvbT7CjwQQFgoA
IAUCX9OdDAYLCQcIAwIEFQgKAgQWAgEAAhkBAhsDAh4BACEJEFm5WhXQEdZi
FiEEGfU4mCJFu1hXYLjzWblaFdAR1mIXbQD/ULn6W8AqEFcmyFEA0Df50asi
VAL1rfvHz37PNxAVTiEBAMHh2sJB/cvyzwpKMAjkSajgl7KF2XRAomHU0s1p
ufsJzjgEX9OdDBIKKwYBBAGXVQEFAQEHQGpNz0Q3t0QTp7X1YoXZngg6r7Vm
EF5aYIp7SK0w9REyAwEIB8J4BBgWCAAJBQJf050MAhsMACEJEFm5WhXQEdZi
FiEEGfU4mCJFu1hXYLjzWblaFdAR1mIV0wEAmCvXNwhSJnKaR1krNw8wUlNr
TSt9dHqE0WJSprZUc0cA/Appyi1SMCjHfom788zrJSThMG3DKRnYpBM5hUFi
a68J
=ptlw
-----END PGP PUBLIC KEY BLOCK-----`

// const encodeFile = (key, inputFileName, outputFileName) => {
//   const iv = 'qwertyuiop123456' // Buffer.from(crypto.randomBytes(16))
//   const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv)
//   const text = fs.readFileSync(inputFileName, { encoding: 'utf8' })
//   const output = `${cipher.update(text, 'utf8', 'base64')}${cipher.final('base64')}`
//   fs.writeFileSync(outputFileName, output, { encoding: 'utf8' })
// }

// encodeFile(AES_KEY, './sample_text', './sample_text_encoded')

const encodeFile = async () => {
  const plainData = fs.readFileSync("sample_text");
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(plainData),
    publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
  });
  
  fs.writeFileSync("sample_text_encoded", encrypted.data);
}

const decodeFile = async () => {
  const { keys: [pk] } = (await openpgp.key.readArmored([privateKey]))
  await pk.decrypt(passphrase);

  const encryptedData = fs.readFileSync("sample_text_encoded");
  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [pk],
  });

  fs.writeFileSync('sample_text_decoded', decrypted.data)
}

const thereAndBackAgain = async () => {
  await encodeFile()
  await decodeFile()
}

thereAndBackAgain()
