const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'login.html',
    template: './app/pages/login.ejs',
    title: 'Scribble App | Log in',
    chunks: ['login']
  }),
  new HtmlWebpackPlugin({
    filename: 'mail.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Mail',
    chunks: ['app', 'mail'],
    templateParameters: {
      route: 'mail'
    }
  })
]