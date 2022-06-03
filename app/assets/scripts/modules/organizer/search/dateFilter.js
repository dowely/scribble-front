import ee from 'event-emitter'
import DateField from './dateField'

ee(DateField.prototype)

class DateFilter {

  betweenField = new DateField(document.querySelector('#date-filter__input--between'))

  andField = new DateField(document.querySelector('#date-filter__input--and'))

  before = -Infinity

  after = Infinity

  constructor() {

    this.events()

  }

  events() {

    [this.betweenField, this.andField].forEach((field, index) => {

      field.on('dateInput', string => {

        field.date = new Date(this.explicitStr(string)).getTime()
        
        if(!field.date && index === 0) field.date = -Infinity
        
        if(!field.date && index === 1) field.date = Infinity

        this.correctDates(index)

        if(index === 0) this.before = field.date

        if(index === 1) this.after = field.date

        this.emit('input', this.before, this.after)

      })
    })
  }

  correctDates(index) {

    if(index === 0 && this.betweenField.date > this.andField.date) {

      this.betweenField.date = this.andField.date

      this.betweenField.write(this.andField.date)

    }

    if(index === 1 && this.andField.date < this.betweenField.date) {

      this.andField.date = this.betweenField.date

      this.andField.write(this.andField.date)

    }

  }

  explicitStr(string) {

    return string.slice(0,6) + '20' + string.slice(6)
  }
}

ee(DateFilter.prototype)

export default new DateFilter()