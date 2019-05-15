const getUrl = require('../../src/helpers/getUrl')

describe('function getUrl', () => {
  const sandbox = createSandbox()
  const url = 'http://web.site'
  beforeEach(() => {
    sandbox.stub(process, 'exit')
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should exit when no url is provided', () => {
    process.argv = ['node', 'index.js']
    getUrl()
    expect(process.exit.calledWith(1)).to.equal(true)
  })
  it('should exit when no url is provided and node is not declared', () => {
    process.argv = ['index.js']
    getUrl()
    expect(process.exit.calledWith(1)).to.equal(true)
  })
  it('should return the url', () => {
    process.argv = ['node', 'index.js', url]
    expect(getUrl()).to.equal(url)
  })
  it('should return the url when node is not declared', () => {
    process.argv = ['index.js', url]
    expect(getUrl()).to.equal(url)
  })
})
