#!/usr/bin/env node

const getLighthouseReport = require('./helpers/getLighthouseReport')
const logResults = require('./helpers/logResults')

const getUrl = () => {
  const urlPosition = process.argv0.includes('node') ? 2 : 1
  const url = process.argv[urlPosition]

  if (!url) {
    console.error('no url provided')
    process.exit(1)
  }

  return url
}

const checkLighthouse = module.exports = async () => {
  const url = getUrl()
  const lighthouseReport = await getLighthouseReport(url)
  const rules = lighthouseReport.audits
  const failedRules = Object.values(rules).filter(rule => rule.score === 0)
  logResults(failedRules)
  if (failedRules.length) process.exit(1)
}

checkLighthouse()
