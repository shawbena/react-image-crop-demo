const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: __dirname
  },
  devtool: 'sourcemap',
  entry: {
    demo: './src/demo.js'
  },
  output: {
    path: path.join(__dirname, './'),
    filename: 'dist/[name].js',
    sourceMapFilename: 'dist/[name].js.map'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },{
      test: /\.s(c|a)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'crop image',
      filename: 'index.html'
    })
  ]
};
