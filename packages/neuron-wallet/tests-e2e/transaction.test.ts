import Application from './application'
import { importWallet } from './operations'

describe('transaction tests', () => {
  let app: Application

  beforeAll(() => {
    app = new Application()
    return app.start()
  })

  afterAll(() => {
    return app.stop()
  })

  it('import wallet', async () => {
    const { client } = app.spectron
    await app.waitUntilLoaded()

    // Go to import wallet page
    const createWalletButton = await app.getElementByTagName('button', 'Import Mnemonic Seed')
    expect(createWalletButton).not.toBeNull()
    await client.elementIdClick(createWalletButton!.ELEMENT)

    const mnemonicText = 'refuse ecology globe virus demand gentle couch scrub bulk project chronic dog'
    await importWallet(app, mnemonicText)
    await app.waitUntilLoaded()
  })

})
