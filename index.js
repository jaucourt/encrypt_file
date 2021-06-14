import openpgp from 'openpgp'

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
