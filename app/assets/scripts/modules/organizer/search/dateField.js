class DateField {

  selectionStart = 0

  selectionEnd = 8

  format = 'mm/dd/yy'

  constructor(inputField) {

    this.inputField = inputField

    this.events()

  }

  events() {
    
    this.inputField.addEventListener('pointerdown', () => {

      if(this.inputField.value === '') console.log('empty')

    })

    this.inputField.addEventListener('beforeinput', e => {

      e.preventDefault()
 
      if(e.inputType === 'insertText' && this.isValid(e.data)) {
        
        this.insertNumber(e.data)

        //update selection start
        
      }

    })

  }

  isNumber(char) {

  }

  validateAt_0() {

    
  }
}

export default DateField

// correctDate() on month/date/year input
// on blur check if selectionStart == selectionEnd
// on collapsed selection blur
// selected part is undefinded and faded
// selection may be expanded by clicking or selecting
// selection may be reduced only by input
// when selectionStart == selectionEnd calculate date and blur
// on partial select replace numbers from part of format string