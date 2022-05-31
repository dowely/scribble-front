class DateField {

  month = 'mm'

  date = 'dd'

  year = 'yy'

  constructor(inputField) {

    this.inputField = inputField

    this.events()

  }

  events() {

    this.inputField.addEventListener('beforeinput', e => {

      e.preventDefault()

      const value = this.inputField.value

      if(value.indexOf('/') >= this.inputField.selectionEnd) {

        this.emit('monthChange', e)

      } else if(this.inputField.selectionStart > value.indexOf('/') && value.lastIndexOf('/') >= this.inputField.selectionEnd) {

        this.emit('dateChange', e)

      } else if(this.inputField.selectionStart > value.lastIndexOf('/')) {

        this.emit('yearChange', e)

      }

      console.log(this.inputField.selectionStart, this.inputField.selectionEnd)

    })

    this.on('monthChange', e => {

      console.log('month change')

    })

    this.on('dateChange', e => {

      console.log('date change')

    })

    this.on('yearChange', e => {

      console.log('year change')

    })

    this.inputField.addEventListener('select', e => {

      console.log(e)

    })

    this.inputField.addEventListener('mousedrag', e => {

      console.log(e)
    })
  }
}

export default DateField