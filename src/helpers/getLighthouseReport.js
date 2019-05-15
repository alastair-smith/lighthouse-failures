const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const chromeFlags = ['--headless', '--no-sandbox']

module.exports = async url => {
  try {
    const browser = await chromeLauncher.launch({ chromeFlags })
    const auditResults = (
      await lighthouse(url, { chromeFlags, port: browser.port })
    ).lhr
    await browser.kill()

    return auditResults
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
