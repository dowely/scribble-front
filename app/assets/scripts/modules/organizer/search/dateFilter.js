import ee from 'event-emitter'
import DateField from './dateField'

ee(DateField.prototype)

class DateFilter {

  beforeField = new DateField(document.querySelector('#date-filter__input--between'))

  afterField = new DateField(document.querySelector('#date-filter__input--and'))

  before = -Infinity

  after = Infinity

  constructor() {

    

  }

}

ee(DateFilter.prototype)

export default new DateFilter()