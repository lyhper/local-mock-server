const mock = require('./mock-server')
const commander = require('commander')
const path = require('path')
const pkg = require('./package.json')

commander.version(pkg.version)
	.option('-d, --dir [dirname]', 'assign mock dirname')
	.parse(process.argv)

mock(commander.dir)