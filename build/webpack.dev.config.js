const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const htmlPlugins = require('./html-plugins.config')
const resolve = require('./utils').resolve
const eslintFormatter = require('eslint-friendly-formatter')
// 多进程处理loader
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

// 开发环境入口文件注入热更新
Object.keys(baseWebpackConfig.entry).map(name => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: 'happypack/loader?id=eslint',
        include: resolve('src'),
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'eslint',
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            cacheDirectory: true,
            formatter: eslintFormatter,
            eslintPath: 'eslint'
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('dist/dll/dll-manifest.json'),
    }),
    new webpack.NamedModulesPlugin(),
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPlugins
  ]
})
