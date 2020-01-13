const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

const PATHS =  {
  src: path.join(__dirname, './src/'),
  dist: path.join(__dirname, './dist/')
}

module.exports = {
  entry: {
    app: `${PATHS.src}js/index.js`
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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
    new ExtractTextPlugin('style.css'),
    new BrowserSyncPlugin({
      server: { 
        baseDir: ['dist']
     }
    }),
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
