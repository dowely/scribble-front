const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'login.html',
    template: './app/pages/login.ejs',
    title: 'Scribble App | Log in',
    chunks: ['login']
  }),
  new HtmlWebpackPlugin({
    filename: 'signin.html',
    template: './app/pages/welcome.ejs',
    title: 'Scribble App | Sign In',
    templateParameters: {
      route: 'signin'
    },
    chunks: ['main', 'welcome']
  }),
  new HtmlWebpackPlugin({
    filename: 'signup.html',
    template: './app/pages/welcome.ejs',
    title: 'Scribble App | Sign Up',
    templateParameters: {
      route: 'signup'
    },
    chunks: ['main', 'welcome']
  }),
  new HtmlWebpackPlugin({
    filename: 'mail-list.html',
    template: './app/pages/layout.ejs',
    title: 'Scribble App | Mail',
    templateParameters: {
      route: 'mail',
      rightColTop: false,
      list: 'inbox',
      unread: 3
    },
    chunks: ['main', 'mail']
  }),
  new HtmlWebpackPlugin({
    filename: 'mail-read.html',
    template: './app/pages/layout.ejs',
    title: 'Scribble App | Mail',
    templateParameters: {
      route: 'mail',
      rightColTop: true,
      list: 'drafts',
      unread: 0
    },
    chunks: ['main', 'mail']
  }),
  new HtmlWebpackPlugin({
    filename: 'mail-write.html',
    template: './app/pages/layout.ejs',
    title: 'Scribble App | Mail',
    templateParameters: {
      route: 'mail',
      rightColTop: true,
      list: 'sent',
      unread: 45
    },
    chunks: ['main', 'mail']
  })
]