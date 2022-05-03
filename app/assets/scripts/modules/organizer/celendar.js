import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'
import displayTemplate from '/app/assets/templates/organizer/_calendar-display.ejs'
import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'

class Calendar {

  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    get date() {
      return new Date(this.year, this.month, this.day)
    }
  }

  selectedDate

  cardHook = document.querySelector('.calendar__calendar-card-container')

  displayHookLeft = document.querySelector('.calendar__calendar-display-container')

  displayHookRight = document.querySelector('.content__right-col .content__viewer')

  constructor(localItemModel) {

    this.localItemModel = localItemModel

    this.cardHook.innerHTML = cardTemplate({
      year: this.today.year,
      month: this.today.month,
      today: this.today.date,
      dots: this.localItemModel.dots(this.today.month)
    })

    this.displayHookLeft.innerHTML = displayTemplate({
      target: 'left',
      itemCount: this.localItemModel.itemCountOn(this.today.date),
      itemGroups: this.localItemModel.groupedItems(this.today.month),
      itemCardTemplate
    })

    this.itemGroups = document.querySelectorAll('.calendar-display__item-group')

    this.itemGroupEmpty = document.querySelector('.calendar-display__item-group[data-id="empty"]')

    this.dateContainers = document.querySelectorAll('.calendar-card__date-container')

    this.selectedItemGroup = document.querySelector('.calendar-display__item-group[data-id="empty"]')

    this.items = document.querySelector('.calendar-display__items')

    this.timeDistance = document.querySelector('.calendar-display__time-distance')

    this.cardIteratorLeft = document.querySelector('.calendar-display[data-target="left"] .calendar-display__card-iterator')

    this.itemGroups.forEach(itemGroup => {

      if(itemGroup.dataset.id === this.localItemModel.simpleDate(this.today.date)) {

        itemGroup.classList.add('calendar-display__item-group--selected')

        this.selectedItemGroup = itemGroup

        this.itemGroupEmpty.classList.remove('calendar-display__item-group--selected')
      }
    })

    this.events()

  }

  events() {

    this.dateContainers.forEach(dateContainer => {

      dateContainer.onclick = this.selectDate.bind(this)
    })
  }

  selectDate(e) {
    
    const target = e.target.closest('.calendar-card__date-container')

    if(target.classList.contains('calendar-card__date-container--current')) {

      if(this.selectedDate) this.selectedDate.classList.remove('calendar-card__date-container--selected')

      this.selectedDate = target

      this.selectedDate.classList.add('calendar-card__date-container--selected')

      this.showItems(this.selectedDate.dataset.id)

      this.updateTimeDistance(this.selectedDate.dataset.id)

      this.updateIterator(this.selectedDate.dataset.id)

    }
  }

  async showItems(date) {
    
    const match = [...this.itemGroups].find(itemGroup => itemGroup.dataset.id === date)

    if(match) {

      await new Promise(res => {

        this.items.ontransitionend = res

        this.items.classList.add('calendar-display__items--hidden')
      })
      
      this.selectedItemGroup.classList.remove('calendar-display__item-group--selected')

      match.classList.add('calendar-display__item-group--selected')

      this.items.classList.remove('calendar-display__items--hidden')

      this.selectedItemGroup = match

    } else {

      await new Promise(res => {

        this.items.ontransitionend = res

        this.items.classList.add('calendar-display__items--hidden')
      })

      this.selectedItemGroup.classList.remove('calendar-display__item-group--selected')

      this.itemGroupEmpty.classList.add('calendar-display__item-group--selected')

      this.items.classList.remove('calendar-display__items--hidden')

      this.selectedItemGroup = this.itemGroupEmpty
    }
  }

  async updateTimeDistance(date) {

    const offset = (new Date(date) - this.today.date) / 8.64e+7
    
    let str

    switch(offset) {
      
      case 0:

        str = 'today'
        break

      case -1:

        str = 'yesterday'
        break

      case 1:

        str = 'tomorrow'
        break

      default:

        if(offset < -1) {

          str = `${-offset} days ago`

        } else {

          str = `in ${offset} days`
        }
    }

    await new Promise(res => {

      this.timeDistance.ontransitionend = res

      this.timeDistance.classList.add('calendar-display__time-distance--faded')
    })

    this.timeDistance.textContent = str

    this.timeDistance.classList.remove('calendar-display__time-distance--faded')
  }

  updateIterator(date) {

    this.cardIteratorLeft.textContent = this.localItemModel.itemCountOn(date)
  }
}

export default Calendar