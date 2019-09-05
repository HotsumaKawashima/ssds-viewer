const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const GasWebpackPlugin = require('gas-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {

  return [
    {
      entry: clientEntry[argv.mode],
      output: {
        filename: 'index.js'
      },

      module: {
        rules: [
          babelConfig
        ]
      },

      plugins: [
        new HtmlWebpackPlugin({
          template: './src/client/index.html',
          inlineSource: 'index.js',
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CopyWebpackPlugin(
          [
            {
              from: './src/setting',
              to: './',
            },
          ],
        )
      ]
    },

    {
      entry: './src/server/main.js',
      output: {
        filename: 'main.gs'
      },

      module: {
        rules: [
          babelConfig
        ]
      },

      plugins: [
        new GasWebpackPlugin(),
        new CopyWebpackPlugin(
          [
            {
              from: './src/server/Code.js',
              to: './Code.gs',
            },
          ],
        )
      ]

    }

  ];
}

const clientEntry = {
  production:  './src/client/index.js',
  development: './src/client/index.development.js',
}

const babelConfig = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
}
