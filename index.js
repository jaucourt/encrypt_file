import openpgp from 'openpgp'
import fs from 'fs'

const passphrase = 'snortingBuffaloWyldThingGruffalo'
const fileToEncode = 'EAFF202105280002.json' // 'sample_data'
const fileToDecode = 'fileToDecode.json'

const generateKeys = async () => {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase,
  })
  console.log(privateKeyArmored)
  console.log(publicKeyArmored)
}

const privateKey = await openpgp.readKey({ armoredKey: fs.readFileSync('sample_private.key', {encoding: 'utf8'}) })
const publicKey = await openpgp.readKey({ armoredKey: fs.readFileSync('sample_public.key', {encoding: 'utf8'}) }) 

const encodeFile = async () => {
  const plainData = fs.readFileSync(fileToEncode);
  const encrypted = await openpgp.encrypt({
    message: openpgp.Message.fromText(plainData),
    publicKeys: publicKey
  });

  fs.writeFileSync(`${fileToEncode}.enc`, encrypted);
  console.log(`wrote file ${fileToEncode}.enc`)
}

const decodeFile = async () => {
  await privateKey.decrypt(passphrase);

  // const encryptedData = fs.readFileSync(`${fileToEncode}_encoded`);
  const encryptedData = fs.readFileSync(`${fileToDecode}.json.enc`);
  const decrypted = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedData }),
    privateKeys: privateKey
  });

  // fs.writeFileSync(`${fileToEncode}_decoded.csv`, decrypted.data)
  fs.writeFileSync(`decoded_${fileToEncode}.json`, decrypted.data)
}

const thereAndBackAgain = async () => {
  await encodeFile()
  await decodeFile()
}

// thereAndBackAgain()
// encodeFile()
decodeFile()
