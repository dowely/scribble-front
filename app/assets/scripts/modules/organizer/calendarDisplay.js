class CalendarDisplay {

  left = document.querySelector('.calendar-display[data-target="left"]')

  right = document.querySelector('.calendar-display[data-target="left"]')

  constructor(views) {

    this.views = views
  }

  pop(itemId) {

    let cardsToRemove = [...document.querySelectorAll('.calendar-display .item-card')]

    cardsToRemove = cardsToRemove.filter(card => card.dataset.itemId === itemId)

    const leftSequence = this.generateSequence(cardsToRemove[0])
    const rightSequence = this.generateSequence(cardsToRemove[1])

    leftSequence('left')
    rightSequence('right')

  }

  generateSequence(card) {

    const funcStack = []

    if(this.cardVisible(card)) {

      this.fadeOut(card, funcStack)

      this.collapse(card, funcStack)

      this.fadeIn(card, funcStack)

    }

    this.remove(card, funcStack)

    this.updateIterator(card, funcStack)

    this.onEmptyGroup(card, funcStack)

    return async function(target) {

      console.log('Sequence on the ', target);

      for(let step = 0; step < funcStack.length; step++) {

        await funcStack[step](card)
      }
    }
  }

  cardVisible(card) {

    if(this.views.viewState.leftColIndex !== '1') return false

    if(card.closest('.calendar__calendar-display-container') && getComputedStyle(card.closest('.calendar__calendar-display-container')).getPropertyValue('display') === 'none') return false //left side hidden

    if(card.closest('.calendar-display[data-target="right"]') && !this.views.viewState.twoCols && this.views.viewState.colOnTop === 'left') return false

    if(!card.parentElement.classList.contains('calendar-display__card-container--visible')) return false

    return true

  }

  fadeOut(card, sequence) {
    
    sequence.push(card => new Promise(res => {

      console.log('Hi from fade out')

      res()
    }))
  }

  collapse(card, sequence) {

    if(card.parentElement.nextElementSibling && card.parentElement.nextElementSibling.classList.contains('calendar-display__card-container--visible')) {

      sequence.push(card => new Promise(res => {

        console.log('Hi from collapse')

        res()

      }))
    }
  }

  fadeIn(card, sequence) {

  }

  remove(card, sequence) {

  }

  updateIterator(card, sequence) {

  }

  onEmptyGroup(card, funcStack) {

  }

}

export default CalendarDisplay