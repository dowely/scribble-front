const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'login.html',
    template: './app/pages/login.ejs',
    title: 'Scribble App | Log in',
    chunks: ['login']
  }),
  new HtmlWebpackPlugin({
    filename: 'app.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App',
    chunks: ['app']
  })
]