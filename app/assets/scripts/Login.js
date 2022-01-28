import '../styles/styles.css'
import './base/noScroll'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/login', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const formWrapper = document.querySelector('.login__form-wrapper')

const signInForm = document.querySelector('.entry-form[data-mode="signin"]')
const signUpForm = document.querySelector('.entry-form[data-mode="signup"]')

const createLink = signInForm.querySelector('.entry-form__link')
const logLink = signUpForm.querySelector('.entry-form__link')

createLink.addEventListener('click', (e) => {

  e.preventDefault()

  toggleForm(signInForm, signUpForm)

})

logLink.addEventListener('click', (e) => {

  e.preventDefault()

  toggleForm(signUpForm, signInForm)
})

async function toggleForm(oldForm, newForm) {

  await fadeOut(oldForm)

  await adjustSize(oldForm, newForm)

  newForm.style.opacity = 1

  formWrapper.style.height = 'auto'

}

function fadeOut(form) {
  return new Promise((res, rej) => {

    form.ontransitionend = res
    form.ontransitioncancel = rej

    form.style.opacity = 0
  })
}

function adjustSize(oldForm, newForm) {
  return new Promise((res, rej) => {

    let oldHeight = oldForm.offsetHeight

    formWrapper.style.height = `${oldHeight + 2}px` /* 2px for border */

    oldForm.style.display = 'none'
    newForm.style.display = 'block'

    let newHeight = newForm.offsetHeight

    setTimeout(() => {
      formWrapper.ontransitionend = res
      formWrapper.ontransitioncancel = rej
      formWrapper.style.height = `${newHeight + 2}px`
    }, 20)
  })
}