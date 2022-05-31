import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'
import debounce from 'lodash/debounce'

class CalendarSlider {

  replacement = document.createElement('DIV')

  calendarCard = document.querySelector('.calendar .calendar-card')

  dateCols = document.querySelectorAll('.calendar-card__weekday-col')

  dateContainers = document.querySelectorAll('.calendar-card__date-container')

  title = document.querySelector('.calendar-card__title')

  month = this.title.querySelector('.calendar-card__month')

  year = this.title.querySelector('.calendar-card__year')

  calendarWidth = getComputedStyle(this.calendarCard).getPropertyValue('width')

  constructor(localItemModel, callback) {

    this.localItemModel = localItemModel
    this.callback = callback

    this.calendarCard.style.setProperty('--calendar-width', this.calendarWidth)

    addEventListener('resize', debounce(() => {

      this.calendarWidth = getComputedStyle(this.calendarCard).getPropertyValue('width')

      this.calendarCard.style.setProperty('--calendar-width', this.calendarWidth)

    }, 500).bind(this))
    
  }

  async prev(date, today) {

    date.setDate(0)
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth(),
      today,
      dots: this.localItemModel.dots(date)
    })

    this.beforeTransition('ltr')

    this.updateMonth(date)

    await this.transition('prev')
    
    this.afterTransition()

    this.callback(date)
  }

  async next(date, today) {
    
    date.setDate(32)
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth(),
      today,
      dots: this.localItemModel.dots(date)
    })

    this.beforeTransition('rtl')

    this.updateMonth(date)

    await this.transition('next')
    
    this.afterTransition()

    this.callback(date)
  }

  afterTransition() {

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

      const date = document.querySelector('.calendar-card__date')

      date.ontransitionend = res

      date.ontransitioncancel = res

      setTimeout(() => {

        this.calendarCard.classList.add(`calendar-card--${direction}`)

      }, 1)

    })
  }

  updateMonth(date) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    new Promise(res => {

      this.title.ontransitionend = res
      this.title.ontransitioncance = res

      this.title.classList.add('calendar-card__title--faded')

    }).then(() => {

      this.month.textContent = months[date.getMonth()]
      this.year.textContent = date.getFullYear()

      this.title.classList.remove('calendar-card__title--faded')

    })
  }

  beforeTransition(direction) {

    const replacementDateCols = this.replacement.querySelectorAll('.calendar-card__weekday-col')

    for(const [weekday, dayCol] of [...this.dateCols].entries()) {

      for(const [week, dateContainer]  of [...dayCol.querySelector('.calendar-card__dates').children].entries()) {

        const replacementDate = document.createElement('H6')
        const replacementDots = document.createElement('DIV')

        replacementDate.className = `calendar-card__date calendar-card__date--replacement-${direction}`

        replacementDots.className = `calendar-card__item-dots calendar-card__item-dots--replacement-${direction}`

        replacementDate.textContent = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week]. querySelector('.calendar-card__date').textContent

        replacementDots.innerHTML = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week]. querySelector('.calendar-card__item-dots').innerHTML

        dateContainer.appendChild(replacementDate).insertAdjacentElement('afterend', replacementDots)

        setTimeout(() => {

          dateContainer.className = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week].className

        }, 5)

        dateContainer.dataset.id = replacementDateCols[weekday].querySelector('.calendar-card__dates').children[week].dataset.id
      }
    }
  }
}

export default CalendarSlider