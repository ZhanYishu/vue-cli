const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const htmlPlugins = require('./html-plugins.config')
const resolve = require('./utils').resolve

// 开发环境入口文件注入热更新
Object.keys(baseWebpackConfig.entry).map(name => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPlugins
  ]
})