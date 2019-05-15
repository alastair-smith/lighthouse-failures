const logResults = require('rewire')('../../src/helpers/logResults')

describe('function logResults', () => {
  const sandbox = createSandbox()
  const SUCCESS_MESSAGE = 'success'
  beforeEach(() => {
    sandbox.stub(console, 'log')
    logResults.__set__('SUCCESS_MESSAGE', SUCCESS_MESSAGE)
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should log a message about all the lighthouse rules passing', () => {
    const failedResults = []
    logResults(failedResults)
    expect(console.log).to.have.property('callCount', 1)
    expect(console.log.getCall(0).args[0]).to.equal(SUCCESS_MESSAGE)
  })
  it('should log the rule failures', () => {
    const failedResults = [{
      title: 'bad seo'
    }, {
      title: 'no meta description'
    }]
    logResults(failedResults)
    expect(console.log.calledWith('❌ bad seo')).to.equal(true)
    expect(console.log.calledWith('❌ no meta description')).to.equal(true)
  })
})
