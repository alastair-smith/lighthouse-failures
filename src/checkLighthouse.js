const getLighthouseReport = require('./helpers/getLighthouseReport')
const logResults = require('./helpers/logResults')

module.exports = async (url, ignoreRules = []) => {
  const lighthouseReport = await getLighthouseReport(url)
  const rules = lighthouseReport.audits
  const failedRules = Object
    .values(rules)
    .filter(rule => rule.score === 0)
    .filter(rule => !ignoreRules.includes(rule.id))
  logResults(failedRules, ignoreRules.length)
  if (failedRules.length) process.exit(1)
}
