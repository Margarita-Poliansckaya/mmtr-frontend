const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src/'),
  dist: path.join(__dirname, './dist/')
}

module.exports = {
  entry: {
    main: `${PATHS.src}js/index.js`
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:  /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.img$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: `${PATHS.src}img`, to: `img` },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: `${PATHS.src}index.html`,
      filename: 'index.html'
    })
  ]
};
