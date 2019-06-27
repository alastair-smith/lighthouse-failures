const {
  SUCCESS_MESSAGE
} = require('../constants')

module.exports = (failedResults, numberOfIgnoredRules) => {
  if (failedResults.length) {
    console.log('The following rules had failures:\n')
    failedResults
      .map(({ title }) => `❌ ${title}`)
      .forEach(message => console.log(message))
    console.log(`\nTotal lighthouse failures: ${failedResults.length}`)
  } else {
    console.log(SUCCESS_MESSAGE)
  }
  if (numberOfIgnoredRules > 0) console.log(`🤫 Ignored ${numberOfIgnoredRules} rules`)
}
