import CalendarDots from "./calendarDots"

class CalendarDisplay {

  left = document.querySelector('.calendar-display[data-target="left"]')

  right = document.querySelector('.calendar-display[data-target="left"]')

  constructor(views) {

    this.views = views
  }

  pop(itemId) {

    let cardsToRemove = [...document.querySelectorAll('.calendar-display .item-card')]

    cardsToRemove = cardsToRemove.filter(card => card.dataset.itemId === itemId)

    const itemDate = cardsToRemove[1].parentElement.parentElement.dataset.id

    const leftSequence = this.generateSequence(cardsToRemove[0])
    const rightSequence = this.generateSequence(cardsToRemove[1])

    Promise.all([leftSequence('left'), rightSequence('right')])
      
      .then((resultArr) => {

        if(resultArr[0]) this.emit('emptyGroup')
        else this.emit('updateIterator', itemDate)

        CalendarDots.update(itemDate)
      })

  }

  generateSequence(card) {

    const funcStack = []

    const container = card.parentElement

    const group = container.parentElement

    if(this.fadeOut(card, funcStack)) {

      if(!this.collapse(card, funcStack)) {

        this.fadeIn(card, funcStack)
      }
    }

    this.remove(container, funcStack)

    if(!this.removeEmptyGroup(group, funcStack)) {

      this.updateIterator(group, funcStack)
    }

    return async function(target) {

      let emptied

      for(let step = 0; step < funcStack.length; step++) {

        const result = await funcStack[step](target)

        if(result === 'empty') emptied = true

      }

      return emptied
    }
  }

  fadeOut(card, sequence) {

    if(this.views.viewState.leftColIndex !== '1') return false

    if(card.closest('.calendar__calendar-display-container') && getComputedStyle(card.closest('.calendar__calendar-display-container')).getPropertyValue('display') === 'none') return false //left side hidden

    if(card.closest('.calendar-display[data-target="right"]') && !this.views.viewState.twoCols && this.views.viewState.colOnTop === 'left') return false

    if(!card.parentElement.classList.contains('calendar-display__card-container--visible')) return false

    sequence.push(target => new Promise(res => {

      console.log('Hi from fade out on the ', target)

      const container = card.parentElement

      container.ontransitionend = container.ontransitioncancel = e => {

        e.stopPropagation()

        res()
      }

      container.classList.add('calendar-display__card-container--faded')

    }))

    return true
    
  }

  collapse(card, sequence) {

    if(card.parentElement.nextElementSibling !== card.parentElement.parentElement.lastElementChild) return false

    if(!card.parentElement.nextElementSibling.classList.contains('calendar-display__card-container--visible')) return false

    sequence.push(target => new Promise(res => {

      console.log('Hi from collapse on the ', target)

      const container = card.parentElement

      const height = getComputedStyle(container).getPropertyValue('height')

      container.ontransitionend = container.ontransitioncancel = res

      container.style.cssText = `
        transition: height .3s ease-in;
        height: ${height};
      `
      setTimeout(() => container.style.height = 0, 5)

    }))

    return true
  }

  fadeIn(card, sequence) {

    if(!card.parentElement.nextElementSibling) return

    sequence.push(target => new Promise(res => {

      console.log('Hi from fade in on the ', target)

      const container = card.parentElement

      container.ontransitionend = container.ontransitioncancel = e => {

        e.stopPropagation()

        res()
      }

      this.replaceCardNodeIn(card.parentElement)

      container.classList.remove('calendar-display__card-container--faded')

    }))

  }

  remove(container, sequence) {

    const firstInSequence = sequence.length === 0 ? true : false

    sequence.push(target => new Promise(res => {

      console.log('Hi from remove on the ', target)
      
      if(firstInSequence || container.classList.contains('calendar-display__card-container--faded')) {

        if(target === 'left') {

          this.shuffle(container)

        }

        this.passOnVisibility(container, target)

        container.remove()

      } else {

        this.removeEmptiedContainer(container.parentElement)

      }

      res()

    }))

  }

  removeEmptyGroup(group, sequence) {

    if(group.children.length > 1) return false

    sequence.push(target => new Promise(res => {

      console.log('Hi from empty group on the ', target)

      group.remove()

      res('empty')

    }))

    return true

  }

  updateIterator(group, sequence) {

    sequence.push(target => new Promise(res => {

      console.log('Hi from update iterator on the ', target)

      res()

    }))

  }

  replaceCardNodeIn(cardContainer, replacement = cardContainer.nextElementSibling) { 

    if(replacement.classList.contains('calendar-display__card-container--visible')) {

      this.replaceCardNodeIn(cardContainer, replacement.nextElementSibling)

    } else {

      cardContainer.firstElementChild.replaceWith(replacement.firstElementChild)
    }
  }

  removeEmptiedContainer(itemGroup) {

    for(const container of itemGroup.children) {

      if(container.children.length === 0) container.remove()
    }

  }

  passOnVisibility(containerToRemove, target) {

    const containers = [...containerToRemove.parentElement.children]

    const siblings = []

    siblings.next = 0

    containers.forEach((container, index, arr) => {

      if(container === containerToRemove) {

        siblings.next = index < arr.length - 1 ? index : index - 1
      }

      if(container.classList.contains('calendar-display__card-container--visible')) container.visible = true

      if(container !== containerToRemove) siblings.push(container)

    })

    if(siblings.length && !siblings.find(sibling => sibling.visible)) {

      const successors = target === 'right' ?
        [siblings[siblings.next], siblings[siblings.next - 1]] :
        [siblings[siblings.next]]

      successors.forEach(successor => {

        successor.className = 'calendar-display__card-container calendar-display__card-container--visible calendar-display__card-container--faded'

        setTimeout(() => {

          successor.classList.remove('calendar-display__card-container--faded')

        }, 5)
      })

    } 

  }

  shuffle(container) {

    const children = [...container.parentElement.children]

    if(container.nextElementSibling && container.nextElementSibling.nextElementSibling && (children.indexOf(container) + 1 ) % 2 !== 0) {
      container.parentElement.insertBefore(container.nextElementSibling.nextElementSibling, container.nextElementSibling)
    } 

  } // for target left

}

export default CalendarDisplay