module.exports = () => {
  const urlPosition = process.argv[0].includes('node') ? 2 : 1
  const url = process.argv[urlPosition]

  if (!url) {
    console.error('no url provided')
    process.exit(1)
  }

  return url
}
