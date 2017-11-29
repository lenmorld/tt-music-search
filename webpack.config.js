const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './app/index.js'],
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '',
      filename: 'app.bundle.js'
    },
    devServer: {
      contentBase: './dist',
      // hot: true,
      port: 3001,
    },
    module: {
      loaders: [
        { test: /\.js[x]*$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },

    plugins: [HtmlWebPackPluginConfig]
  }
