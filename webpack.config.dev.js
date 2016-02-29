var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loader: 'json',
      include: path.join(__dirname, 'data')
    }, {
      test: /\.scss$/,
      loader: 'style!css?modules&sourceMap&localIdentName=[hash:base64:3]!sass?sourceMap',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style?insertAt=top!css',
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules', 'normalize.css')
      ]
    }]
  }
}
