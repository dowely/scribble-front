import {local as user} from '../userModel/model'

const p = document.querySelector('.prompt p')
const span = document.querySelector('.sub-menu-profile__progress-numbers span')

class Field {

  prop

  constructor(prop) {this.prop = prop}

  get empty() {return user[this.prop] ? false : true}

}

const prompts = new Map()

prompts.set(new Field('name'), "Start by entering your name")
prompts.set(new Field('image'), "We'd love to see your avatar")
prompts.set(new Field('jobPosition'), "Job position is your next move")
prompts.set(new Field('phoneNumber'), "Others could use your number")
prompts.set(new Field('bio'), "A catchy bio makes true friends")

const progress = () => {

  let progress = 0

  for(const [field] of prompts) {

    if(!field.empty) progress++
  }

  new Promise(res => {

    span.ontransitionend = span.ontransitioncancel = res

    span.classList.add('sub-menu-profile__progress-numbers__span--faded')

  }).then(() => {

    span.textContent = progress

    span.classList.remove('sub-menu-profile__progress-numbers__span--faded')

  })

}

;['photoUpdate', 'textUpdate'].forEach(event => user.on(event, progress))

export const prompt = () => {

  new Promise(res => {

    p.ontransitionend = p.ontransitioncancel = res

    p.parentElement.classList.add('prompt--faded')

  }).then(() => {

    for(const [field, value] of prompts) {

      if(field.empty) {p.textContent = value; break}
  
      p.textContent = 'You completed your profile!'
  
    }

    p.parentElement.classList.remove('prompt--faded')

  })

}

export const hint = () => {

  const bodyWidth = parseInt(getComputedStyle(document.body).getPropertyValue('width').slice(0, -2))

  new Promise(res => {

    p.ontransitionend = p.ontransitioncancel = res

    p.parentElement.classList.add('prompt--faded')

  }).then(() => {

    p.textContent = bodyWidth >= 1255 ? "Wheel and pan to crop the image" : "Pinch and pan to crop the image"

    p.parentElement.classList.remove('prompt--faded')

  })

}

prompt()
progress()