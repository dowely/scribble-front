import profileCardTemplate from './templates/profile-card.ejs'
import {local as user} from '../userModel/model'
import glass from '../glass/glass'
import Form from '../form/form'
import Photo from '../photo/photo'

init()

function init() {

  const div = document.createElement('DIV')

  div.innerHTML = profileCardTemplate({

    hook: 'left',
    userInitials: user.initials,
    userName: user.name,
    jobPosition: user.jobPosition,
    phoneNumber: user.phoneNumber,
    email: user.email,
    joinedDate: user.joinedDate,
    bio: user.bio

  })

  const node = div.querySelector('.profile-card')

  events(node)

  const hook = document.querySelector('.content__left-col .content__viewer')

  hook.innerHTML = ''

  hook.appendChild(node)

}

function events(node) {

  const editBtn = node.querySelector('.profile-card__edit-tap-area')

  const photoBtn = node.querySelector('.profile-card__upload-tap-area')

  editBtn.addEventListener('pointerdown', () => {

    glass.render('central', Form.create())

  })

  photoBtn.addEventListener('pointerdown', () => {

    const photo = new Photo()

    setTimeout(() => {

      glass.render('left', photo.node)

    }, 20)

  })
}