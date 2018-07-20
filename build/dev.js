process.env.NODE_ENV = 'development'

const resolve = require('./utils').resolve
// 开发环境配置
const config = require('../config')
// 代理配置
const proxy = config.dev.proxy
// 服务端口配置
const port = config.dev.port || 3000
// 是否自动打开浏览器
const autoOpenBrowser = config.dev.autoOpenBrowser
// 本地服务地址
const uri = 'http://localhost:' + port
// 打开浏览器工具
const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
// 处理webpack编译后的包中间件
const webpackDevMiddleware = require('webpack-dev-middleware')
// 代理中间件
const proxyMiddleware = require('http-proxy-middleware')
// 热加载中间件，需配合new webpack.HotModuleReplacementPlugin()与每个入口文件加上webpack-hot-middleware/client才能生效
const hotMiddleware = require('webpack-hot-middleware')

const app = express()
const webpackConfig = require('./webpack.dev.config.js')
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/'
})

app.use(devMiddleware)

app.use(hotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
}))

app.use('/dll', express.static('./dist/dll'))

// 代理配置
Object.keys(proxy).forEach(function (context) {
  var options = proxy[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 如果配置autoOpenBrowser则自动打开浏览器
  if (autoOpenBrowser) opn(uri)
})

app.listen(port, function () {
  console.log('listening on port 3000!\n')
})
