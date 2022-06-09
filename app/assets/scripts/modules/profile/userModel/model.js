const User = require('./user')
const userData = require('./userData.json')

exports.static = new User(userData)