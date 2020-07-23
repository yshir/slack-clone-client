const path = require('path')
const HTMLwebpackplugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s?)css$/,
        // exclude: /node_modules/,
        use: ['style-loader', { loader: 'css-loader', options: { url: false } }, 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLwebpackplugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV || 'development'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: '3002',
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3001',
        secure: false,
        logLevel: 'debug',
      },
    },
  },
}
