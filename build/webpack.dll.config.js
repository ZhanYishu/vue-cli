const webpack = require('webpack')
const resolve = require('./utils').resolve
const dependencies = require('../package').dependencies

module.exports = {
  mode: 'development',
  entry: Object.keys(dependencies),
  output: {
    filename: "dll.js",
    path: resolve('dist/dll'),
    library: '__dll__'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/),
    new webpack.DllPlugin({
      name: '__dll__',
      path: resolve('dist/dll/dll-manifest.json')
    })
  ]
}
