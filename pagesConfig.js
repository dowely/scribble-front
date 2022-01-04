const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'signin.html',
    template: './app/pages/welcome.html',
    title: 'Scribble App | Sign In',
    templateParameters: {
      route: 'signin'
    },
    chunks: ['main', 'welcome']
  }),
  new HtmlWebpackPlugin({
    filename: 'signup.html',
    template: './app/pages/welcome.html',
    title: 'Scribble App | Sign Up',
    templateParameters: {
      route: 'signup'
    },
    chunks: ['main', 'welcome']
  })
]