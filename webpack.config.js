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
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public'
  },
//  devtool: 'cheap-module-eval-source-map',
  noInfo: true
};
