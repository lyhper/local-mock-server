const fs = require('fs')
const Module = require('module')


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

/**
 * 解析文件代码
 * @param {string} filePath 文件路径
 */
function parseFile (filePath) {
  let code
  try {
    code = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    console.error(`[error] file not found: ${filePath}`)
    return {}
  }
  
  try {
    // 利用module模块解析
    const codeModule = new Module(filePath)
    codeModule._compile(code, filePath)
    return codeModule.exports
  } catch (e) {
    console.error(`[error] parse module error: ${e}`)
    return {}
  }
}

module.exports = {
  transferCamelCaseToKebabCase,
  parseFile
}