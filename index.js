import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'snortingBuffaloWyldThingGruffalo'
const fileToEncode = 'sample_text'

const generateKeys = async () => {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase,
  })
  console.log(privateKeyArmored)
  console.log(publicKeyArmored)  
}

const privateKey = fs.readFileSync('sample_private.key', {encoding: 'utf8'})
const publicKey = fs.readFileSync('sample_public.key', {encoding: 'utf8'})

// const encodeFile = (key, inputFileName, outputFileName) => {
//   const iv = 'qwertyuiop123456' // Buffer.from(crypto.randomBytes(16))
//   const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv)
//   const text = fs.readFileSync(inputFileName, { encoding: 'utf8' })
//   const output = `${cipher.update(text, 'utf8', 'base64')}${cipher.final('base64')}`
//   fs.writeFileSync(outputFileName, output, { encoding: 'utf8' })
// }

// encodeFile(AES_KEY, './sample_text', './sample_text_encoded')

const encodeFile = async () => {
  const plainData = fs.readFileSync(fileToEncode);
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(plainData),
    publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
  });
  
  fs.writeFileSync(`${fileToEncode}_encoded`, encrypted.data);
}

const decodeFile = async () => {
  const { keys: [pk] } = (await openpgp.key.readArmored([privateKey]))
  await pk.decrypt(passphrase);

  const encryptedData = fs.readFileSync(`${fileToEncode}_encoded`);
  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [pk],
  });

  fs.writeFileSync(`${fileToEncode}_decoded`, decrypted.data)
}

const thereAndBackAgain = async () => {
  await encodeFile()
  await decodeFile()
}

thereAndBackAgain()
