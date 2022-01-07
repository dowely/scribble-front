const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
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
    filename: 'mail.html',
    template: './app/pages/layout.ejs',
    title: 'Scribble App | Mail',
    templateParameters: {
      foo: 'bar',
      route: 'mail'
    },
    chunks: ['main']
  })
]