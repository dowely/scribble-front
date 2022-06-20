import profileCardTemplate from './templates/profile-card.ejs'
import {local as user} from '../userModel/model'
import glass from '../glass/glass'
import Form from '../form/form'
import Photo from '../photo/photo'
import {prompt, hint} from '../prompt/prompt'

init('left')
init('right')

function init(target) {

  const div = document.createElement('DIV')

  div.innerHTML = profileCardTemplate({

    hook: target,
    userInitials: user.initials,
    userName: user.name,
    jobPosition: user.jobPosition,
    phoneNumber: user.phoneNumber,
    email: user.email,
    joinedDate: user.joinedDate,
    bio: user.bio,
  })

  const initials = div.querySelector('.profile-card__initials')

  if(user.image) {

    div.querySelector('.profile-card__photo').src = user.image

    initials.classList.add('profile-card__initials--hidden')

  } else initials.classList.remove('profile-card__initials--hidden')

  const node = div.querySelector('.profile-card')

  events(node)

  const hook = document.querySelector(`.content__${target}-col .content__viewer`)

  hook.innerHTML = ''

  hook.appendChild(node)

}

export const create = (target) => {

  const div = document.createElement('DIV')

  div.innerHTML = profileCardTemplate({

    hook: target,
    userInitials: user.initials,
    userName: user.name,
    jobPosition: user.jobPosition,
    phoneNumber: user.phoneNumber,
    email: user.email,
    joinedDate: user.joinedDate,
    bio: user.bio,
  })

  const initials = div.querySelector('.profile-card__initials')

  if(user.image) {

    div.querySelector('.profile-card__photo').src = user.image

    initials.classList.add('profile-card__initials--hidden')

  } else initials.classList.remove('profile-card__initials--hidden')

  prompt()

  const node = div.querySelector('.profile-card')

  events(node)

  return node

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

      hint()

    }, 20)

  })
}