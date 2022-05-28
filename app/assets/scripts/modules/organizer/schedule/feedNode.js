import feedNodeTemplate from './templates/_feed-node.ejs'
import Ribbon from './ribbon'
import ee from 'event-emitter'

ee(Ribbon.prototype)

class FeedNode {

  node

  ribbons

  container = document.createElement('DIV')

  isVisible

  constructor(items, date, selected = false) {

    this.items = items

    this.date = new Date(date)

    this.selected = selected

    this.simpleDate = date

    this.ribbons = items.map(item => new Ribbon(item))

    this.container.innerHTML = feedNodeTemplate({simpleDate: this.simpleDate, date: this.date, selected: this.selected})

    this.node = this.container.querySelector('li.schedule__list-item')

    this.ribbons.forEach(this.mountRibbons.bind(this))

    this.events()

  }

  events() {

    this.addRibbonEventListeners(this.ribbons)    

  }

  addRibbonEventListeners(ribbons) {

    ribbons.forEach(ribbon => {

      ribbon.on('done', itemId => this.emit('done', itemId))

      ribbon.on('read', itemId => this.emit('read', itemId))

    })

  }

  mountRibbons(ribbon) {

    const hook = this.node.querySelector('ul.schedule__ribons')

    const container = document.createElement('LI')

    container.className = 'schedule__ribon-container'

    container.appendChild(ribbon.node)

    hook.appendChild(container)

  }

  removeItem(info) {

    const ribbon = this.ribbons.find(ribbon => ribbon.item === info.item)

    const atIndex = this.ribbons.indexOf(ribbon)

    this.ribbons.splice(atIndex, 1)

    if(!info.transition) ribbon.node.parentElement.remove()
    else ribbon.transitionOut()

  }

  appendItem(newItem) {

    const newRibbon = new Ribbon(newItem)

    this.addRibbonEventListeners([newRibbon])

    this.ribbons.push(newRibbon)

    const hook = this.node.querySelector('ul.schedule__ribons')

    const container = document.createElement('LI')

    container.className = 'schedule__ribon-container'

    container.appendChild(newRibbon.node)

    hook.appendChild(container)

  }

  editItem(editedItem) {

    const ribbonToEdit = this.ribbons.find(ribbon => ribbon.item.id === editedItem.id)

    ribbonToEdit.render(editedItem)

  }

  transitionOut() {

    const duration = 300 // ms

    const height = this.node.offsetHeight

    const dayTag = this.node.querySelector('.schedule__day-tag')

    const dot = this.node.querySelector('.schedule__dot')

    const ribbon = this.node.querySelector('.schedule__ribons')

    const fadeOut = new Promise(res => {

      dayTag.ontransitionend = dayTag.ontransitioncancel = e => {

        e.stopPropagation()

        res()
      }

      dayTag.style.cssText = `
        transition: color ${duration}ms ease-out;
        color: transparent;
      `

      dot.style.cssText = `
        transition: all ${duration}ms ease-out;
        width: 0;
        height: 0;
        border-width: 0;
      `

      ribbon.style.cssText = `
        transition: opacity ${duration}ms ease-out;
        opacity: 0;
      `

      this.node.style.cssText = `
        height: ${height}px;
      `
    })

    const collapse = () => {

      return new Promise(res => {

        setTimeout(() => {

          this.node.ontransitionend = this.node.ontransitioncancel = e => {
  
            e.stopPropagation()
    
            res()
    
          }

        }, 50)
  
        this.node.style.cssText = `
          transition: height ${duration}ms ease-out;
          height: 0;
        `
      })
    }

    fadeOut
      .then(collapse)
      .then(() => this.node.remove())

  }
}

export default FeedNode