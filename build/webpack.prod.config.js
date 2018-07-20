const baseWebpackConfig = require('./webpack.base.config')
const merge =  require('webpack-merge')
const htmlPlugins = require('./html-plugins.config')
const { resolve } = require('./utils')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.prod.assetsRoot,
    // 打包出来后出口文件目录
    filename: 'js/[name].[chunkhash:8].js',
    // 懒加载模块文件目录
    chunkFilename: 'js/chunk.[name].[chunkhash:8].js',
    // 注入html公共引用路径
    publicPath: config.prod.publicPath
  },
  mode: 'production',
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('dist/static'),
        ignore: ['.*']
      }
    ])
  ]
})
if (config.prod.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig