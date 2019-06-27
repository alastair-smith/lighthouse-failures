#!/usr/bin/env node

const program = require('commander')
const checkLighthouse = require('./checkLighthouse')

program
  .option('-u, --url <>', 'Url to test')
  .option('-i, --ignore-rules []', 'Comma delimited lighthouse rule ids to ignore', rules => rules.split(','))
  .parse(process.argv)

checkLighthouse(program.url, program.ignoreRules)
