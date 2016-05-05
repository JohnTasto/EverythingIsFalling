var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public/js/'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer!sass'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public'
  },
//  devtool: 'cheap-module-eval-source-map',
  noInfo: true
};
