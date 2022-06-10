import profileEditTemplate from './templates/profile-edit.ejs'

class Form {

  static create() {

    const div = document.createElement('DIV')

    div.innerHTML = profileEditTemplate({})

    const node = div.querySelector('.profile-edit')

    return node

  }
}

export default Form