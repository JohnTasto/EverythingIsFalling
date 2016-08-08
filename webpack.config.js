const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public/js/'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=8192&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public',
  },
//  devtool: 'cheap-module-eval-source-map',
  noInfo: true,
}
