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

  constructor(views, localItemModel) {

    this.localItemModel = localItemModel
    this.views = views

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

    this.displayHookRight.innerHTML = displayTemplate({
      target: 'right',
      itemCount: this.localItemModel.itemCountOn(this.today.date),
      itemGroups: this.localItemModel.groupedItems(this.today.month),
      itemCardTemplate
    })

    this.itemGroups = document.querySelectorAll('.calendar-display__item-group')

    this.itemGroupsEmpty = document.querySelectorAll('.calendar-display__item-group[data-id="empty"]')

    this.dateContainers = document.querySelectorAll('.calendar-card__date-container')

    this.selectedItemGroups = [...document.querySelectorAll('.calendar-display__item-group[data-id="empty"]')]

    this.items = document.querySelectorAll('.calendar-display__items')

    this.timeDistances = document.querySelectorAll('.calendar-display__time-distance')

    this.cardIterators = document.querySelectorAll('.calendar-display__card-iterator')

    this.prevBtns = document.querySelectorAll('.calendar-display__prev-container')

    this.nextBtns = document.querySelectorAll('.calendar-display__next-container')

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

    const dispBtns = [...this.prevBtns, ...this.nextBtns]

    dispBtns.forEach(dispBtn => {

      dispBtn.onclick = this.anotherCard.bind(this)
    })
  }

  anotherCard(e) {

    const count = this.selectedItemGroups[0].children.length

    if(count > 1) {

      const direction = e.target.closest('div').classList.contains('calendar-display__next-container') ? 'next' : 'prev'

      const step = e.target.closest('.calendar-display').dataset.target === 'left' ? 'one' : 'two'

      switch(direction) {

        case 'next':

          if(this.selectedItemGroups.index === count) {

            this.selectedItemGroups.index = 1

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else if(this.selectedItemGroups.index === count - 1) {

            this.selectedItemGroups.index = step === 'one' ? count : 1

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else if(this.selectedItemGroups.index) {

            if(step === 'one' || this.selectedItemGroups.index % 2 === 0) {

              this.selectedItemGroups.index +=1

            } else {

              this.selectedItemGroups.index +=2
            }

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else {

            this.selectedItemGroups.index = step === 'one' ? 2 : count > 2 ? 3 : 1

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          }

          break

        case 'prev':

          if(this.selectedItemGroups.index === 1) {

            this.selectedItemGroups.index = count

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else if(this.selectedItemGroups.index === 2) {

            this.selectedItemGroups.index = step === 'one' ? 1 : count

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else if(this.selectedItemGroups.index) {

            if(step === 'one' || this.selectedItemGroups.index % 2 !== 0) {

              this.selectedItemGroups.index -=1

            } else {

              this.selectedItemGroups.index -=2
            }

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          } else {

            this.selectedItemGroups.index = count

            this.updateCardsView(this.selectedItemGroups.index)

            this.tickIterator(this.selectedItemGroups.index)

          }

          break
      }

    }

  }

  updateCardsView(index) {
    console.log('now showing ', index)
    const onTheRight = this.views.viewState.twoCols ? 1 : 0

  }

  tickIterator(index) {

    this.cardIterators[0].firstElementChild.textContent = index

    this.cardIterators[1].firstElementChild.textContent = index % 2 === 0 ? (index / 2 < 1 ? 1 : index / 2) : (index + 1) / 2

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

    const onTheRight = this.views.viewState.twoCols ? 1 : 0
    
    const matches = [...this.itemGroups].filter(itemGroup => itemGroup.dataset.id === date)

    if(matches.length > 0) {

      await new Promise(res => {

        this.items[onTheRight].ontransitionend = res

        this.items[onTheRight].classList.add('calendar-display__items--hidden')
      })
      
      this.selectedItemGroups[0].classList.remove('calendar-display__item-group--selected')

      this.selectedItemGroups[1].classList.remove('calendar-display__item-group--selected')

      matches[0].classList.add('calendar-display__item-group--selected')

      matches[1].classList.add('calendar-display__item-group--selected')

      this.items[onTheRight].classList.remove('calendar-display__items--hidden')

      this.selectedItemGroups[0] = matches[0]
      
      this.selectedItemGroups[1] = matches[1]

    } else {

      await new Promise(res => {

        this.items[onTheRight].ontransitionend = res

        this.items[onTheRight].classList.add('calendar-display__items--hidden')
      })

      this.selectedItemGroups[0].classList.remove('calendar-display__item-group--selected')

      this.selectedItemGroups[1].classList.remove('calendar-display__item-group--selected')

      this.itemGroupsEmpty[0].classList.add('calendar-display__item-group--selected')

      this.itemGroupsEmpty[1].classList.add('calendar-display__item-group--selected')

      this.items[onTheRight].classList.remove('calendar-display__items--hidden')

      this.selectedItemGroups[0] = this.itemGroupsEmpty[0]

      this.selectedItemGroups[1] = this.itemGroupsEmpty[1]
    }
  }

  async updateTimeDistance(date) {

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

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

      this.timeDistances[onTheRight].ontransitionend = res

      this.timeDistances[onTheRight].classList.add('calendar-display__time-distance--faded')
    })

    this.timeDistances[0].textContent = str
    
    this.timeDistances[1].textContent = str

    this.timeDistances[onTheRight].classList.remove('calendar-display__time-distance--faded')
  }

  async updateIterator(date) {

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    const itemCount = this.localItemModel.itemCountOn(date)

    const strLeft = itemCount === 0 ? `` : `<span>1</span> / <span>${itemCount}</span>`

    const strRight = itemCount === 0 ? `` : `<span>1</span> / <span>${itemCount % 2 === 0 ? itemCount / 2 : Math.ceil(itemCount / 2)}</span>`

    await new Promise(res => {

      this.cardIterators[onTheRight].ontransitionend = res

      this.cardIterators[onTheRight].classList.add('calendar-display__card-iterator--faded')
    })

    this.cardIterators[0].innerHTML = strLeft

    this.cardIterators[1].innerHTML = strRight

    this.cardIterators[onTheRight].classList.remove('calendar-display__card-iterator--faded')
  }
}

export default Calendar