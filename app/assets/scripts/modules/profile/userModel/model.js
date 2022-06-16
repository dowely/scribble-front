const User = require('./user')
const userData = require('./userData.json')

exports.static = new User(userData)

try {

  let user

  const storedUserData = localStorage.getItem('profile')

  if(storedUserData) {

    const userData = JSON.parse(storedUserData)

    user = new User(userData)

  } else {

    user = new User(userData)

    localStorage.setItem('profile', '{}')

  }

  addEventListener('beforeunload', () => saveUserData(user))

  exports.local = user

} catch(e) {

  console.log('Local user model ran with ', e.message)

}

const saveUserData = (user) => {

  const keyExists = localStorage.getItem('profile')

  if(keyExists) {

    const obj = {}

    for(const key in user) {

      obj[key] = user[key]

    }

    obj.image = user.image

    localStorage.setItem('profile', JSON.stringify(obj))
  }
}