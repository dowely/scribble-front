import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'
import displayTemplate from '/app/assets/templates/organizer/_calendar-display.ejs'
import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'
import CalendarSlider from './calendarSlider'

class Calendar {

  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    get date() {
      return new Date(this.year, this.month, this.day)
    }
  }

  displayedMonth = this.today.date

  sliderTransition = false

  selectedDate

  cardHook = document.querySelector('.calendar__calendar-card-container')

  displayHookLeft = document.querySelector('.calendar__calendar-display-container')

  displayHookRight = document.querySelector('.content__right-col .content__viewer')

  constructor(views, localItemModel, itemCard) {

    this.localItemModel = localItemModel
    this.views = views
    this.itemCard = itemCard

    this.cardHook.innerHTML = cardTemplate({
      year: this.today.year,
      month: this.today.month,
      today: this.today.date,
      dots: this.localItemModel.dots(this.today.date)
    })

    this.displayHookLeft.innerHTML = displayTemplate({
      target: 'left',
      itemCount: this.localItemModel.itemCountOn(this.localItemModel.simpleDate(this.today.date)),
      itemGroups: this.localItemModel.groupedItems(this.today.date),
      itemCardTemplate
    })

    this.displayHookRight.innerHTML = displayTemplate({
      target: 'right',
      itemCount: this.localItemModel.itemCountOn(this.localItemModel.simpleDate(this.today.date)),
      itemGroups: this.localItemModel.groupedItems(this.today.date),
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

    this.prevMonth = document.querySelector('.calendar-card__nav-btn:nth-child(1)')

    this.nextMonth = document.querySelector('.calendar-card__nav-btn:nth-child(2)')

    this.itemGroups.forEach(itemGroup => {

      this.selectItemGroup(itemGroup)
    })

    this.calendarSlider = new CalendarSlider(this.localItemModel, this.afterMonthChange.bind(this))

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

    this.prevMonth.addEventListener('click', () => {

      if(!this.sliderTransition) {

        this.beforeMonthChange(-1)

        this.calendarSlider.prev(this.displayedMonth, this.today.date)

        this.sliderTransition = true
      }
    })

    this.nextMonth.addEventListener('click', () => {

      if(!this.sliderTransition) {

        this.beforeMonthChange(1)

        this.calendarSlider.next(this.displayedMonth, this.today.date)

        this.sliderTransition = true
      }
    })
  }

  selectItemGroup(itemGroup) {

    if(itemGroup.dataset.id === this.localItemModel.simpleDate(this.today.date)) {

      itemGroup.classList.add('calendar-display__item-group--selected')

      if(itemGroup.closest('.calendar-display').dataset.target === 'left') {

        this.selectedItemGroups[0] = itemGroup

        this.itemGroupsEmpty[0].classList.remove('calendar-display__item-group--selected')

      } else {

        this.selectedItemGroups[1] = itemGroup

        this.itemGroupsEmpty[1].classList.remove('calendar-display__item-group--selected')

      }    
    }
  }

  async beforeMonthChange(direction) {

    const displayReplacementLeft = document.createElement('DIV')
    const displayReplacementRight = document.createElement('DIV')

    const newDate = new Date(this.displayedMonth)
    newDate.setDate(direction < 0 ? 0 : 32)

    displayReplacementLeft.innerHTML = displayTemplate({
      target: 'left',
      itemCount: this.localItemModel.itemCountOn(this.localItemModel.simpleDate(this.today.date)),
      itemGroups: this.localItemModel.groupedItems(newDate, this.localItemModel.simpleDate(this.today.date)),
      itemCardTemplate
    })

    displayReplacementRight.innerHTML = displayTemplate({
      target: 'right',
      itemCount: this.localItemModel.itemCountOn(this.localItemModel.simpleDate(this.today.date)),
      itemGroups: this.localItemModel.groupedItems(newDate, this.localItemModel.simpleDate(this.today.date)),
      itemCardTemplate
    })

    const newItemsLeft = displayReplacementLeft.querySelector('.calendar-display__items')
    const newItemsRight = displayReplacementRight.querySelector('.calendar-display__items')

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    await new Promise(res => {

      if(this.timeDistances[0].textContent === 'today') res()
      else {

        this.items[onTheRight].ontransitionend = res

        this.items[onTheRight].classList.add('calendar-display__items--hidden')

        this.updateTimeDistance(this.localItemModel.simpleDate(this.today.date))

        this.updateIterator(this.localItemModel.simpleDate(this.today.date))
      }
    })

    this.items[0].innerHTML = newItemsLeft.innerHTML
    this.items[1].innerHTML = newItemsRight.innerHTML

    this.itemGroups = document.querySelectorAll('.calendar-display__item-group')

    this.selectedItemGroups = [...document.querySelectorAll('.calendar-display__item-group[data-id="empty"]')]

    this.itemGroupsEmpty = document.querySelectorAll('.calendar-display__item-group[data-id="empty"]')

    this.selectedDate = undefined

    this.showItems(this.localItemModel.simpleDate(this.today.date), true)

    if(this.timeDistances[0].textContent !== 'Today') {

      this.items[onTheRight].classList.remove('calendar-display__items--hidden')
    }
  }

  afterMonthChange(date) {

    this.displayedMonth = date

    this.selectedDate = undefined

    this.sliderTransition = false

    this.itemCard.events([...this.items[0].querySelectorAll('.item-card'), ...this.items[1].querySelectorAll('.item-card')])

  }

  anotherCard(e) {

    const count = this.selectedItemGroups[0].children.length

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    if(count > 2 || count > 1 && !onTheRight) {

      const direction = e.target.closest('div').classList.contains('calendar-display__next-container') ? 'next' : 'prev'

      const step = e.target.closest('.calendar-display').dataset.target === 'left' ? 'one' : 'two'

      switch(direction) {

        case 'next':

          if(this.selectedItemGroups.index === count) {

            this.selectedItemGroups.index = 1

          } else if(this.selectedItemGroups.index === count - 1) {

            this.selectedItemGroups.index = step === 'one' ? count : count % 2 === 0 ? 1 : this.selectedItemGroups.index + 1

          } else if(this.selectedItemGroups.index) {

            if(step === 'one' || this.selectedItemGroups.index % 2 === 0) {

              this.selectedItemGroups.index +=1

            } else {

              this.selectedItemGroups.index +=2
            }

          } else {

            this.selectedItemGroups.index = step === 'one' ? 2 : count > 2 ? 3 : 1

          }

          break

        case 'prev':

          if(this.selectedItemGroups.index === 1) {

            this.selectedItemGroups.index = count

          } else if(this.selectedItemGroups.index === 2) {

            this.selectedItemGroups.index = step === 'one' ? 1 : count

          } else if(this.selectedItemGroups.index) {

            if(step === 'one' || this.selectedItemGroups.index % 2 !== 0) {

              this.selectedItemGroups.index -=1

            } else {

              this.selectedItemGroups.index -=2
            }

          } else {

            this.selectedItemGroups.index = count

          }

          break
      }

      this.updateCardsView(this.selectedItemGroups.index)

    }

  }

  async updateCardsView(index) {

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    const leftCards = this.selectedItemGroups[0].children

    const rightCards = this.selectedItemGroups[1].children

    if(index) {

      await new Promise(res => {

      this.items[onTheRight].ontransitionend = res

      this.items[onTheRight].classList.add('calendar-display__items--hidden')
    })

    } else {

      var index = 1
    }

    [...leftCards].forEach((cardContainer, i) => {

      cardContainer.classList.remove('calendar-display__card-container--visible')

      if(index === i + 1) cardContainer.classList.add('calendar-display__card-container--visible')

    });

    [...rightCards].forEach((cardContainer, i) => {

      cardContainer.classList.remove('calendar-display__card-container--visible')

      if(index === i + 1) cardContainer.classList.add('calendar-display__card-container--visible')

      if(index === i && (i + 1) % 2 === 0) {
        
        cardContainer.classList.add('calendar-display__card-container--visible')

      }

      if(index === i + 2 && (i + 1) % 2 !== 0) {
        
        cardContainer.classList.add('calendar-display__card-container--visible')

      }

    })

    this.tickIterator(index)

    this.items[onTheRight].classList.remove('calendar-display__items--hidden')

  }

  tickIterator(index) {

    this.cardIterators[0].firstElementChild.textContent = index

    this.cardIterators[1].firstElementChild.textContent = index % 2 === 0 ? index / 2 : (index + 1) / 2

  }

  selectDate(e) {
    
    const target = e ? e.target.closest('.calendar-card__date-container') : document.querySelector('.calendar-card__date-container--selected') || document.querySelector('.calendar-card__date-container--today')

    if(target.classList.contains('calendar-card__date-container--current')) {

      if(this.selectedDate) this.selectedDate.classList.remove('calendar-card__date-container--selected')

      this.selectedDate = target

      this.selectedDate.classList.add('calendar-card__date-container--selected')

      this.updateTimeDistance(this.selectedDate.dataset.id)

      this.selectedItemGroups.index = undefined

      this.updateIterator(this.selectedDate.dataset.id)

      this.showItems(this.selectedDate.dataset.id)

      if(this.views.viewState.colOnTop === 'right' && !this.views.viewers.right.querySelector('.item-search')) this.views.render('left')

    }
  }

  async showItems(date, noTransition) {
  
    const onTheRight = this.views.viewState.twoCols ? 1 : 0
    
    const matches = [...this.itemGroups].filter(itemGroup => itemGroup.dataset.id === date)

    if(matches.length > 0) {

      await new Promise(res => {

        if(noTransition) {

          res()

        } else {

          this.items[onTheRight].ontransitionend = res

          this.items[onTheRight].classList.add('calendar-display__items--hidden')

        }
      })
      
      this.selectedItemGroups[0].classList.remove('calendar-display__item-group--selected')

      this.selectedItemGroups[1].classList.remove('calendar-display__item-group--selected')

      matches[0].classList.add('calendar-display__item-group--selected')

      matches[matches.length - 1].classList.add('calendar-display__item-group--selected')

      this.selectedItemGroups[0] = matches[0]
      
      this.selectedItemGroups[1] = matches[matches.length - 1]

      this.updateCardsView()

      if(!noTransition) {

        this.items[onTheRight].classList.remove('calendar-display__items--hidden')
      }

    } else {

      await new Promise(res => {

        if(noTransition) {

          res()

        } else {

          this.items[onTheRight].ontransitionend = res

          this.items[onTheRight].classList.add('calendar-display__items--hidden')
        }
      })

      this.selectedItemGroups[0].classList.remove('calendar-display__item-group--selected')

      this.selectedItemGroups[1].classList.remove('calendar-display__item-group--selected')

      this.itemGroupsEmpty[0].classList.add('calendar-display__item-group--selected')

      this.itemGroupsEmpty[1].classList.add('calendar-display__item-group--selected')

      if(!noTransition) {

        this.items[onTheRight].classList.remove('calendar-display__items--hidden')
      }

      this.selectedItemGroups[0] = this.itemGroupsEmpty[0]

      this.selectedItemGroups[1] = this.itemGroupsEmpty[1]

    }
  }

  async updateTimeDistance(date) {

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    const offset = Math.ceil((new Date(date) - this.today.date) / 8.64e+7)
    
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

      this.timeDistances[onTheRight].ontransitionend = this.timeDistances[onTheRight].ontransitioncancel = res

      this.timeDistances[onTheRight].classList.add('calendar-display__time-distance--faded')

    })

    this.timeDistances[0].textContent = str
    
    this.timeDistances[1].textContent = str

    this.timeDistances[onTheRight].classList.remove('calendar-display__time-distance--faded')

  }

  async updateIterator(date) {

    try {

      date = typeof date === 'string' ? date : (document.querySelector('.calendar-card__date-container--selected') || document.querySelector('.calendar-card__date-container--today')).dataset.id

    } catch {

      date = this.localItemModel.simpleDate(this.today.date)

    }

    const onTheRight = this.views.viewState.twoCols ? 1 : 0

    const itemCount = this.localItemModel.itemCountOn(date)

    const strLeft = itemCount === 0 ? `<span></span>` : `<span>${this.selectedItemGroups.index || 1}</span> / <span>${itemCount}</span>`

    const strRight = itemCount === 0 ? `<span></span>` : `<span>${this.selectedItemGroups.index ? Math.ceil(this.selectedItemGroups.index / 2) : 1}</span> / <span>${itemCount % 2 === 0 ? itemCount / 2 : Math.ceil(itemCount / 2)}</span>`

    await new Promise(res => {

      this.cardIterators[onTheRight].ontransitionend = res

      this.cardIterators[onTheRight].classList.add('calendar-display__card-iterator--faded')
    })

    this.cardIterators[0].innerHTML = strLeft

    this.cardIterators[1].innerHTML = strRight

    this.cardIterators[onTheRight].classList.remove('calendar-display__card-iterator--faded')
  }

  updateItemGroups(itemDate) {
    this.itemGroups = document.querySelectorAll('.calendar-display__item-group')
    
    const displayedContainer = document.querySelector('.calendar-card__date-container--selected') || document.querySelector('.calendar-card__date-container--today')

    const dateId = displayedContainer ? displayedContainer.dataset.id : this.localItemModel.simpleDate(this.today.date)

    const updateIterator = itemDate === dateId ? true : false

    this.itemGroups.forEach(group => {
      
      if(group.dataset.id === dateId) {

        group.classList.add('calendar-display__item-group--selected')

        if(group.closest('.calendar-display').dataset.target === 'left') {

          this.selectedItemGroups[0] = group

          this.itemGroupsEmpty[0].classList.remove('calendar-display__item-group--selected')

          group.firstElementChild.classList.add('calendar-display__card-container--visible')

        } else {

          this.selectedItemGroups[1] = group

          this.itemGroupsEmpty[1].classList.remove('calendar-display__item-group--selected')

          for(let i = 0; i < group.children.length; i++) {

            group.children[i].classList.add('calendar-display__card-container--visible')

            if(i === 1) break
          }

        }

      }
    })

    return updateIterator

  }
}

export default Calendar