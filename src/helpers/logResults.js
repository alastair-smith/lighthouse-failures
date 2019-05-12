module.exports = failedResults => {
  if (failedResults.length) {
    console.log('The following rules had failures:\n')
    failedResults
      .map(({ title }) => `❌ ${title}`)
      .forEach(message => console.log(message))
    console.log(`\nTotal lighthouse failures: ${failedResults.length}`)
  } else {
    console.log('All lighthouse rules passed')
  }
}
