/**
 * 根据文件入口与环境自动生成多页htmlPlugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 文件入口
const templates = require('./entries').htmlEntries
// 是否是生产环境
const IS_PROD = process.env.NODE_ENV === 'production'
// htmlPlugin实例集合
const htmlPlugins = []

for (let name in templates) {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      title: 'vue-cli',
      inject: true,
      filename: name + '.html',
      template: templates[name],
      chunks: ['commons', name],
      minify: IS_PROD ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : {}
    })
  )
}

module.exports = htmlPlugins
