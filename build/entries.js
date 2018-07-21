const getEntries = require('./utils').getEntries

const path = require('path')
// 入口文件名
const INDEX_ENTRY_NAME = 'index.js'
const HTML_ENTRY_NAME = 'index.html'

// 按照文件目录获取入口文件地址
const entries = getEntries(path.resolve(__dirname, '../src/views'), INDEX_ENTRY_NAME)

// 按照文件目录获取入口html地址
const htmlEntries = getEntries(path.resolve(__dirname, '../src/views'), HTML_ENTRY_NAME)

module.exports = {
  entries,
  htmlEntries
}
