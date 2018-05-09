const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

/**
 * 启动mock server
 * @param {string} dir mock文件目录
 */
function start(dir) {
  dir = dir || 'mock'
  const mockDir = path.join(process.cwd(), dir)
  console.info('mock dir is', mockDir)

  // 打印请求记录
  app.use(morgan('tiny'))

  app.use((req, res, next) => {
    const reqPath = req.path
    const filePath = transferCamelCaseToKebabCase(
      path.join(mockDir, reqPath.slice(1))
    )
    try {
      // 强制加载文件
      delete require.cache[filePath]
      const result = require(filePath)
      res.json(result)
    } catch (e) {
      res.status(404).send('404 Not Found')
    }
  })

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500 Internal Server Error')
  })

  app.listen(3000, () => {
    console.info('mock server is running at: http://localhost:3000')
  })
}

/**
 * 驼峰转中横线
 * @param text
 * @returns {string} 中横线格式字符串
 */
function transferCamelCaseToKebabCase(text) {
  // 匹配中横线
  const lineReg = /([a-z])([A-Z])/g
  return text.replace(lineReg, (matched, p1, p2) => `${p1}-${p2.toLowerCase()}`)
}

module.exports = start