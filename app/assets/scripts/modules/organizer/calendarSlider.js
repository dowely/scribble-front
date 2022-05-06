import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'

class CalendarSlider {

  replacement = document.createElement('DIV')

  calendarCard = document.querySelector('.calendar .calendar-card')

  dateCols = document.querySelectorAll('.calendar-card__weekday-col')

  dateContainers = document.querySelectorAll('.calendar-card__date-container')

  title = document.querySelector('.calendar-card__title')

  month = this.title.querySelector('.calendar-card__month')

  constructor(localItemModel, callback) {

    this.localItemModel = localItemModel
    this.callback = callback
  }

  async prev(date, today) {

    date.setMonth(date.getMonth() - 1)
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth(),
      today,
      dots: this.localItemModel.dots(date.getMonth())
    })

    this.beforeTransition('ltr')

    this.updateMonth(date.getMonth())

    await this.transition('prev')
    
    this.afterTransition()

    this.callback(date)
  }

  async next(date, today) {
    
    date.setMonth(date.getMonth() + 1)
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth(),
      today,
      dots: this.localItemModel.dots(date.getMonth())
    })

    this.beforeTransition('rtl')

    this.updateMonth(date.getMonth())

    await this.transition('next')
    
    this.afterTransition()

    this.callback(date)
  }

  afterTransition() {
    console.log('aftertransition', new Date().getTime())

    for(const dateContainer of this.dateContainers) {

      dateContainer.children[0].remove()
      dateContainer.children[0].remove()

      dateContainer.children[0].className = 'calendar-card__date'
      dateContainer.children[1].className = 'calendar-card__item-dots'
    }

    this.calendarCard.className = 'calendar-card'

  }

  transition (direction) {
    
    return new Promise(res => {
      console.log('transition', new Date().getTime())
      const date = document.querySelector('.calendar-card__date')

      date.ontransitionend = res

      date.ontransitioncancel = res

      setTimeout(() => {

        this.calendarCard.classList.add(`calendar-card--${direction}`)

      }, 1)

    })
  }

  updateMonth(month) {
    console.log('updateMonth')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    this.month.textContent = months[month]

  }

  beforeTransition(direction) {
    console.log('beforeTransition')
    const replacementDateCols = this.replacement.querySelectorAll('.calendar-card__weekday-col')

    for(const [weekday, dayCol] of [...this.dateCols].entries()) {

      for(const [week, dateContainer]  of [...dayCol.querySelector('.calendar-card__dates').children].entries()) {

        const replacementDate = document.createElement('H6')
        const replacementDots = document.createElement('DIV')

        replacementDate.className = `calendar-card__date calendar-card__date--replacement-${direction}`

        replacementDate.dataset.foo = 'bar'

        replacementDots.className = `calendar-card__item-dots calendar-card__item-dots--replacement-${direction}`

        replacementDate.textContent = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week]. querySelector('.calendar-card__date').textContent

        dateContainer.appendChild(replacementDate).insertAdjacentElement('afterend', replacementDots)

        dateContainer.className = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week].className

        dateContainer.dataset.id = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week].dataset.id
      }
    }
  }
}

export default CalendarSlider