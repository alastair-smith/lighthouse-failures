const checkLighthouse = require('rewire')('../src/checkLighthouse')

describe('function checkLighthouse', () => {
  const sandbox = createSandbox()
  let getLighthouseReport, logResults
  const url = 'http://website.dev'
  const report = {
    audits: {
      A: { title: 'a', score: 0 },
      B: { title: 'b', score: 1 },
      C: { title: 'c', score: 0 },
      D: { title: 'd', score: null }
    }
  }
  beforeEach(() => {
    sandbox.stub(process, 'exit')

    getLighthouseReport = sandbox.stub()
    getLighthouseReport
      .withArgs(url)
      .resolves(report)
    getLighthouseReport
      .rejects(Error('getLighthouseReport: invalid url'))

    logResults = sandbox.spy()

    checkLighthouse.__set__('getLighthouseReport', getLighthouseReport)
    checkLighthouse.__set__('logResults', logResults)
    checkLighthouse.__set__('getUrl', () => url)

    process.argv = ['node', 'index.js', url]
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should exit with an error code if the report contains issues', () => {
    return checkLighthouse().then(() => {
      expect(process.exit.calledWith(1)).to.equal(true)
    })
  })
  it('should log the failures from the report', () => {
    return checkLighthouse().then(() => {
      expect(logResults.getCall(0).args[0]).to.deep.equal([
        { title: 'a', score: 0 },
        { title: 'c', score: 0 }
      ])
    })
  })
  it('should not exit with an error if the report has no issues', () => {
    report.audits = {
      A: { title: 'a', score: null },
      B: { title: 'b', score: 1 },
      C: { title: 'c', score: 1 }
    }
    return checkLighthouse().then(() => {
      expect(process.exit.calledWith(1)).to.not.equal(true)
    })
  })
  it('should log a message when the report has no issues', () => {
    report.audits = {
      A: { title: 'a', score: null },
      B: { title: 'b', score: 1 },
      C: { title: 'c', score: 1 }
    }
    return checkLighthouse().then(() => {
      expect(logResults.getCall(0).args[0]).to.deep.equal([])
    })
  })
})
