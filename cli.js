const mock = require('./index')
const commander = require('commander')
const pkg = require('./package.json')

commander.version(pkg.version)
  .option('-d, --dir [dirname]', 'assign mock dirname')
  .parse(process.argv)

mock(commander.dir)