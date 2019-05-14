const getLighthouseReport = require('rewire')('../../src/helpers/getLighthouseReport')

describe('function getLighthouseReport', () => {
  const sandbox = createSandbox()
  let lighthouse, kill
  const chromeLauncher = {
    launch: () => {}
  }
  const port = 897621
  const url = 'https://website.com'
  const report = { my: 'report' }
  beforeEach(() => {
    kill = sandbox.stub()
    kill.resolves()

    sandbox.stub(chromeLauncher, 'launch')
    chromeLauncher.launch
      .withArgs({ chromeFlags: ['--headless', '--no-sandbox'] })
      .resolves({ port, kill })
    chromeLauncher.launch
      .rejects(Error('launch: invalid args'))

    lighthouse = sandbox.stub()
    lighthouse
      .withArgs(url, { chromeFlags: ['--headless', '--no-sandbox'], port })
      .resolves({ lhr: report })
    lighthouse
      .rejects(Error('lighthouse: invalid args'))

    sandbox.stub(process, 'exit')
    sandbox.stub(console, 'error')

    getLighthouseReport.__set__('chromeLauncher', chromeLauncher)
    getLighthouseReport.__set__('lighthouse', lighthouse)
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should return the lighthouse report', () => {
    return expect(getLighthouseReport(url)).to.eventually.deep.equal(report).then(() => {
      expect(lighthouse.calledAfter(chromeLauncher.launch)).to.be.equal(true)
    })
  }
  )
  it('should exit on a browser error', () => {
    const error = Error('browser error')
    chromeLauncher.launch.reset()
    chromeLauncher.launch.rejects(error)

    return getLighthouseReport(url).then(() => {
      expect(process.exit.getCall(0).args[0]).to.equal(1)
    })
  })
  it('should log a message on browser error', () => {
    const error = Error('browser error')
    chromeLauncher.launch.reset()
    chromeLauncher.launch.rejects(error)

    return getLighthouseReport(url).then(() => {
      expect(console.error.getCall(0).args[0]).to.equal(error.message)
    })
  })
  it('should exit on a browser kill error', () => {
    const error = Error('browser kill error')
    kill.reset()
    kill.rejects(error)

    return getLighthouseReport(url).then(() => {
      expect(process.exit.getCall(0).args[0]).to.equal(1)
    })
  })
  it('should log a message on browser kill error', () => {
    const error = Error('browser kill error')
    kill.reset()
    kill.rejects(error)

    return getLighthouseReport(url).then(() => {
      expect(console.error.getCall(0).args[0]).to.equal(error.message)
    })
  })
  it('should terminate the browser', () => {
    return getLighthouseReport(url).then(() => {
      expect(kill.calledAfter(lighthouse)).to.equal(true)
    })
  })
})
