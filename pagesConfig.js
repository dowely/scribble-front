const mails = require('./app/db/mails.json')
const users = require('./app/db/users.json')

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
      route: 'mail',
      unread: 3,
      mails
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'team.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Team',
    chunks: ['app', 'team'],
    templateParameters: {
      route: 'team',
      unread: 3,
      users
    }
  })
]