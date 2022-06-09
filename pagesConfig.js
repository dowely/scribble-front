const mails = require('./app/db/mails.json')
const users = require('./app/db/users.json')
const items = require('./app/db/items.json')
const ItemServer = require('./app/db/itemServer.js')
const userModel = require('./app/assets/scripts/modules/profile/userModel/model').static

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    filename: 'login.html',
    template: './app/pages/login.ejs',
    title: 'Scribble App | Log in',
    chunks: ['login']
  }),
  new HtmlWebpackPlugin({
    filename: 'organizer.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Organizer',
    chunks: ['app', 'organizer'],
    templateParameters: {
      route: 'organizer',
      bell: 4,
      items,
      itemServer: new ItemServer(items)
    }
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
      users
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'chat.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Chat',
    chunks: ['app', 'chat'],
    templateParameters: {
      route: 'chat',
      users
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'search.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Not Found',
    chunks: ['app', 'search'],
    templateParameters: {
      route: 'search'
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'profile.html',
    template: './app/pages/app.ejs',
    title: 'Scribble App | Profile',
    chunks: ['app', 'profile'],
    templateParameters: {
      route: 'profile',
      userName: userModel.name,
      userInitials: userModel.initials,
      jobPosition: userModel.jobPosition,
      phoneNumber: userModel.phoneNumber,
      email: userModel.email,
      joinedDate: userModel.joinedDate,
      bio: userModel.bio
    }
  })
]