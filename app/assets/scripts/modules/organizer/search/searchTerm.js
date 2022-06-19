import ee from 'event-emitter'

class SearchTerm {

  inputField = document.querySelector('#search-field__input')

  term = ''

  delayId

  constructor() {

    this.events()

  }

  events() {

    this.inputField.addEventListener('input', e => {

      this.term = e.target.value.trim().toLowerCase()

      clearTimeout(this.delayId)

      this.delayId = setTimeout(() => this.emit('input', this.term), 500)

    })
  }

  clear() {

    this.inputField.value = ''

    this.term = ''
  }

}

ee(SearchTerm.prototype)

export default new SearchTerm()