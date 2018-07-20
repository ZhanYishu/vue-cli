const fs = require('fs')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dll.config')
const resolve = require('./utils').resolve

if (!(fs.existsSync(resolve('dist/dll/dll-manifest.json')))) {
  console.log(111)
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log('  Build DLL failed with errors.\n')
      process.exit(1)
    }
  })
}
