import formTemplate from '/app/assets/templates/entry-form.ejs'

class EntryForm {
  constructor(mode) {
    this.mode = mode
    this.formContainer = document.querySelector('.login__form-container')

    this.mountForm()
  }

  mountForm() {

    this.formContainer.innerHTML =  formTemplate({mode: this.mode})

    this.toggleLink = document.querySelector('.entry-form__link')

    this.toggleLink.addEventListener('click', (e) => {
      e.preventDefault()

      this.mode = this.mode == 'signin' ? 'signup' : 'signin'

      this.mountForm()
    })
  }
}

export default EntryForm