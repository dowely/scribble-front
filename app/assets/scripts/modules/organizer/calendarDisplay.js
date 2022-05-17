import CalendarDots from "./calendarDots"
import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'

class CalendarDisplay {

  left = document.querySelector('.calendar-display[data-target="left"]')

  right = document.querySelector('.calendar-display[data-target="right"]')

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel
  }

  update(item) {

    let groups = document.querySelectorAll(`.calendar-display__item-group[data-id="${item.date}"]`)

    if(groups.length === 0) {

      groups = [document.createElement('DIV'), document.createElement('DIV')]

      groups.forEach(group => {

        group.className = 'calendar-display__item-group'

        group.setAttribute('data-id', item.date)
      })

      this.left.querySelector('.calendar-display__items').appendChild(groups[0])

      this.right.querySelector('.calendar-display__items').appendChild(groups[1])

    }

    groups.forEach((group, i) => {

      const cardContainer = document.createElement('DIV')

      item.shortened = i === 0 ? true : false

      cardContainer.innerHTML = itemCardTemplate({item})

      cardContainer.className = 'calendar-display__card-container'

      group.appendChild(cardContainer)

    })

    if(groups[1].querySelectorAll('.calendar-display__card-container--visible').length === 1) groups[1].lastElementChild.classList.add('calendar-display__card-container--visible')

    CalendarDots.update(item.date)

  }

  pop(itemId) {
    console.log(document.querySelectorAll('.calendar-display .item-card'))
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

        } else {

          this.passOnVisibility(container, target)

        }

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

    if(siblings.length && siblings.filter(sibling => sibling.visible).length < 2) {

      const successors = []

      if(!siblings.find(sibling => sibling.visible)) {

        successors[0] = siblings[siblings.next]
        successors[1] = siblings[siblings.next - 1]

      } else if(siblings[siblings.next].nextElementSibling) {
        
        successors[0] = siblings[siblings.next]
        successors[1] = siblings[siblings.next + 1]

      } else {

        successors[0] = siblings[siblings.next]
      }
      
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