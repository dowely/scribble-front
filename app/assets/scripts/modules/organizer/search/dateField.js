class DateField {

  format = 'mm/dd/yy'

  selectionStart = 0

  selectionEnd = this.format.length

  userSelection = false

  timer

  constructor(inputField) {

    this.inputField = inputField

    this.events()

  }

  events() {

    this.inputField.addEventListener('dragstart', (e) => {

      e.preventDefault()

    })

    this.inputField.addEventListener('pointerup', () => {

      this.timer = setTimeout(() => {

        this.expandSelection()

        this.select()

      }, 100)

      this.userSelection = true

    })

    this.inputField.addEventListener('select', (e) => {

      clearTimeout(this.timer)

      if(this.userSelection) this.roundSelection()

    })

    this.inputField.addEventListener('keydown', e => {

      if(isNaN(e.key) || e.key === ' ') e.preventDefault()

    })

    this.inputField.addEventListener('beforeinput', e => {

      if(!e.cancelable) {

        this.inputField.value = this.format + "     "
 
        setTimeout(() => this.reset(), 200)

        return

      }

      e.preventDefault()
 
      if(e.inputType === 'insertText' && this.isValid(e.data)) {

        this.insertNumber(e.data)

        this.selectionStart++

        this.select()
        
      } else this.reset()

    })

    this.inputField.addEventListener('blur', () => {

      if(this.selectionStart !== this.selectionEnd) this.reset()

    })

  }

  reset() {

    this.inputField.value = ''

    this.inputField.style.textAlign = 'left'

    this.selectionStart = 0

    this.selectionEnd = this.format.length

  }

  roundSelection() {

    let start = this.inputField.selectionStart

    let end = this.inputField.selectionEnd

    while(this.inputField.value.charAt(start - 1) !== '/' && start > 0) start--

    while(this.inputField.value.charAt(end) !== '/' && end < this.inputField.value.length) end++

    this.inputField.selectionStart = this.selectionStart = start

    this.inputField.selectionEnd = this.selectionEnd = end

    if(this.selectionStart === 0 && this.selectionEnd === this.format.length) {

      this.inputField.value = ''

      this.inputField.style.textAlign = 'left'

    }

  }

  insertNumber(number) {

    if(this.inputField.value === '') {

      this.inputField.value = this.format

    }

    this.inputField.setRangeText(number, this.selectionStart, this.selectionStart + 1)

    this.inputField.style.textAlign = 'center'

  }

  expandSelection() {
    
    let newStart = this.inputField.selectionStart

    let newEnd = this.inputField.selectionEnd

    while(this.inputField.value.charAt(newStart - 1) !== '/' && newStart > 0) newStart--

    while(this.inputField.value.charAt(newEnd) !== '/' && newEnd < this.inputField.value.length) newEnd++

    if(this.selectionStart === this.selectionEnd) {

      this.selectionStart = newStart

      this.selectionEnd = newEnd

    } else {

      this.selectionStart = newStart < this.selectionStart ? newStart : this.selectionStart

      this.selectionEnd = newEnd > this.selectionEnd ? newEnd : this.selectionEnd

    }

    if(this.selectionStart === 0 && this.selectionEnd === this.format.length) {

      this.inputField.value = ''

      this.inputField.style.textAlign = 'left'

    }
    
  }

  select() {

    this.userSelection = false

    if(this.inputField.value.charAt(this.selectionStart) === '/' && this.selectionStart !== this.selectionEnd) this.selectionStart++

    if(this.inputField.value.charAt(this.selectionEnd - 1) === '/') this.selectionEnd--

    this.inputField.setSelectionRange(this.selectionStart, this.selectionEnd)

    if(this.selectionStart === this.selectionEnd) this.inputField.blur()

  }

  isValid(char) {

    return !isNaN(char) && char !== ' '
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