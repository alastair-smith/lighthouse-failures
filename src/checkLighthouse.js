const getLighthouseReport = require('./helpers/getLighthouseReport')
const logResults = require('./helpers/logResults')
const getUrl = require('./helpers/getUrl')

module.exports = async () => {
  const url = getUrl()
  const lighthouseReport = await getLighthouseReport(url)
  const rules = lighthouseReport.audits
  const failedRules = Object.values(rules).filter(rule => rule.score === 0)
  logResults(failedRules)
  if (failedRules.length) process.exit(1)
}
