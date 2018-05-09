const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const utils = require('./lib/utils')

/**
 * 启动mock server
 * @param {string} dir mock文件目录
 * @param {number} port 监听端口
 */
function start(dir = 'mock', port = 3000) {
  const mockDir = path.join(process.cwd(), dir)
  console.info('[info] mock dir is', mockDir)

  // 打印请求记录
  app.use(morgan('tiny'))

  app.use((req, res, next) => {
    const reqPath = req.path
    if (reqPath === '/favicon.ico') {
      res.status(404).send('404 Not Found')
      return
    }
    const filePath = utils.transferCamelCaseToKebabCase(
      path.join(mockDir, reqPath.slice(1))
    ) + '.js'
    const result = utils.parseFile(filePath)
    res.json(result)
  })

  app.use((err, req, res, next) => {
    console.error('[error]', err.stack)
    res.status(500).send('500 Internal Server Error')
  })

  app.listen(port, () => {
    console.info(`[info] mock server is running at: http://localhost:${port}`)
  })
}

module.exports = start