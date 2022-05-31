import ee from 'event-emitter'
import DateField from './dateField'

ee(DateField.prototype)

class DateFilter {

  beforeField = new DateField(document.querySelector('#date-filter__input--between'))

  afterField = new DateField(document.querySelector('#date-filter__input--and'))

  before = -Infinity

  after = Infinity

  error = ''

  constructor() {



    //this.before.setSelectionRange(3, 3)
    //this.before.focus()
  }

}

ee(DateFilter.prototype)

export default new DateFilter()