const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/html/index.html' }),
    new NodePolyfillPlugin(),
  ],
  devServer: {
    compress: true,
    port: 9123,
  },
}
