import users from '/app/db/users.json'
import readTemplate from '/app/assets/templates/team/_user-read.ejs'

class UserRead {
  constructor() {
    this.users = users
  }

  html(userName) {

    let user = this.users.find(user => user.name == userName)

    return readTemplate({user})
  }
}

export default UserRead