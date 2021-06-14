import openpgp from 'openpgp'

const passphrase = 'hereIsAPassphrase'

const generateKeys = async () => {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase,
  })
  console.log('private key', privateKeyArmored)
  console.log('public key', publicKeyArmored)
}

generateKeys()