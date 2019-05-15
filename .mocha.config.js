const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { createSandbox } = require('sinon')

chai.use(chaiAsPromised)

Object.assign(
  global,
  { createSandbox, expect: chai.expect }
)
