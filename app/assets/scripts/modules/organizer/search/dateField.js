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

    this.inputField.addEventListener('pointerdown', () => this.userSelection = true)

    this.inputField.addEventListener('pointerup', () => {

      this.timer = setTimeout(() => {

        this.expandSelection()

        this.select()

      }, 200)

    })

    this.inputField.addEventListener('select', () => {

      clearTimeout(this.timer)

      if(this.userSelection) this.roundSelection()

    })

    this.inputField.addEventListener('keydown', e => {

      if(isNaN(e.key) || e.key === ' ') e.preventDefault()

    })

    this.inputField.addEventListener('beforeinput', e => {

      e.preventDefault()
 
      if(e.inputType === 'insertText' && this.isValid(e.data)) {

        this.insertNumber(e.data)

        this.selectionStart++

        this.select()
        
      } 

    })

    this.inputField.addEventListener('input', this.reset.bind(this))

    this.inputField.addEventListener('blur', () => {

      if(this.selectionStart !== this.selectionEnd) this.reset()
      else  this.correctDate()

      this.emit('dateInput', this.inputField.value)

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

    if(start > this.selectionStart) start = this.selectionStart

    if(end < this.selectionEnd) end = this.selectionEnd

    this.inputField.selectionStart = this.selectionStart = start

    this.inputField.selectionEnd = this.selectionEnd = end

    if(this.selectionStart === 0 && this.selectionEnd === this.format.length) {

      this.inputField.value = ''

      this.inputField.style.textAlign = 'left'

    } else this.placeholderSelection()

  }

  placeholderSelection() {

    this.inputField.setRangeText(this.format.substring(this.selectionStart, this.selectionEnd))

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

    if(!(this.selectionStart === 0 && this.selectionEnd === this.format.length)) {

      this.inputField.setSelectionRange(this.selectionStart, this.selectionEnd)

      this.placeholderSelection()

    }

    if(this.selectionStart === this.selectionEnd) this.inputField.blur()

  }

  isValid(char) {

    const isNumber = !isNaN(char) && char !== ' '

    const inRange = this[`validateAt_${this.selectionStart}`](char)

    return  isNumber && inRange
  }

  validateAt_0(char) {

    if(parseInt(char) > 1) {

      this.inputField.setRangeText('0', this.selectionStart, this.selectionStart + 1)

      this.selectionStart++

      this.select()

    }

    return true
  }

  validateAt_1(char) {

    const prevNum = parseInt(this.inputField.value.charAt(0))

    const num = parseInt(char)

    if(prevNum === 0 && num === 0) return false

    if(prevNum === 1 && num > 2) return false

    return true

  }

  validateAt_3(char) {

    const num = parseInt(char)

    if(num > 3 || this.inputField.value.substring(0, 2) === '02' && num > 2) {

      this.inputField.setRangeText('0', this.selectionStart, this.selectionStart + 1)

      this.selectionStart++

      this.select()

    }

    return true

  }

  validateAt_4(char) {

    const prevNum = parseInt(this.inputField.value.charAt(3))

    const num = parseInt(char)

    if(prevNum === 0 && num === 0) return false

    if(prevNum > 1) {

      const testResult = this.dateTest(
        parseInt(this.inputField.value.substring(0, 2)),
        parseInt(this.inputField.value.charAt(3) + char))

      return typeof testResult === 'number' ? false : true

    }

    return true

  }

  validateAt_6() {return true}

  validateAt_7() {return true}

  dateTest(month, date, year = 2024 ) { // leap year

    const dateObj = new Date(year, month - 1, date)

    if(dateObj.getMonth() !== month - 1) {

      dateObj.setDate(0)

      return dateObj.getDate()

    } else return true
  }
  
  correctDate() {

    const testResult = this.dateTest(
      parseInt(this.inputField.value.substring(0, 2)),
      parseInt(this.inputField.value.substring(3, 5)),
      parseInt('20' + this.inputField.value.substring(6))
    )
    
    if(typeof testResult === 'number') this.inputField.setRangeText(testResult, 3, 5)

  }

  write(miliseconds) {

    const dateObj = new Date(miliseconds)

    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')

    const date = (dateObj.getDate()).toString().padStart(2, '0')

    const year = dateObj.getFullYear().toString().substring(2)

    this.inputField.value = `${month}/${date}/${year}`

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