const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
    }),
  ],
}