const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  mode: 'development',  
  entry: './demo/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {},
  resolve: {
    extensions: ['.ts', '.js', '.cjs', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
    }),
    new AssetsPlugin({fileTypes: ['js', 'jpg','jpeg']})
  ],
}