const entriesConfig = require('./entries')
const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const eslintFormatter = require('eslint-friendly-formatter')
const resolve = require('./utils').resolve
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 多进程处理loader
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
  entry: entriesConfig.entries,
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'styles': resolve('src/styles')
    }
  },
  optimization: {
    splitChunks: {
      // 抽离入口文件公共模块为commmons模块
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'happypack/loader?id=babel',
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: 'happypack/loader?id=eslint',
        include: resolve('src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10240,
          name: 'img/[name]-[hash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true
    }),
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
    // 移除moment.js语言包
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/),
  ]
}
