import profileEditTemplate from './templates/profile-edit.ejs'
import glass from '../glass/glass'
import {local as user} from '../userModel/model'
import {create as cardNode} from '../card/card'

class Form {

  static create() {

    const div = document.createElement('DIV')

    div.innerHTML = profileEditTemplate({
      name: user.name,
      jobPosition: user.jobPosition,
      phoneNumber: user.phoneNumber,
      bio: user.bio
    })

    const node = div.querySelector('.profile-edit')

    Form.events(node)

    return node

  }

  static events(node) {

    const exits = [
      node.querySelector('.profile-edit__close__tap-area'),
      node.querySelector('input[value="Discard"]')
    ] 

    exits.forEach(btn => {

      btn.addEventListener('click', () => glass.render('left'))
    })

    const form = node.querySelector('form')

    form.addEventListener('submit', e => {

      e.preventDefault()

      const fields = e.target.elements

      user.name = fields['userName'].value
      user.jobPosition = fields['jobPosition'].value
      user.phoneNumber = fields['phoneNumber'].value
      user.bio = fields['bio'].value

      glass.viewers['left'].innerHTML = ''
      glass.viewers['right'].innerHTML = ''
      
      glass.viewers['left'].appendChild(cardNode('left'))
      glass.viewers['right'].appendChild(cardNode('right'))

      glass.render('left')

      user.emit('textUpdate')

    })

  }

}

export default Form