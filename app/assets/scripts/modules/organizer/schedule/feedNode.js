import feedNodeTemplate from './templates/_feed-node.ejs'
import Ribbon from './ribbon'
import ee from 'event-emitter'

ee(Ribbon.prototype)

class FeedNode {

  node

  ribbons

  container = document.createElement('DIV')

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

}

export default FeedNode