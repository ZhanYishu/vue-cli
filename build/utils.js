const path = require('path')
const fs = require('fs')

/**
 * 获取项目目录下对应的入口文件地址，自动生成多页入口文件与html地址配置
 * @param {String} entryPath: 文件入口地址
 * @param {String} file：文件名
 * @returns {{}}
 */
exports.getEntries = (entryPath, file) => {
  const entries = {}
  const files = fs.readdirSync(entryPath)
  files.forEach(function (dirName, index) {
    entries[dirName] = path.resolve(entryPath, dirName, file)
  })
  return entries
}

/**
 * 获取绝对路径
 * @param {String} path
 * @return {String}
 */
exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}