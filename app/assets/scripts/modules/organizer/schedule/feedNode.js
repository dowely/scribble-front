import feedNodeTemplate from './templates/_feed-node.ejs'
import Ribbon from './ribbon'

class FeedNode {

  node

  ribons

  container = document.createElement('DIV')

  constructor(items, date, selected = false) {

    this.items = items

    this.date = new Date(date)

    this.selected = selected

    this.simpleDate = date

    this.ribons = items.map(item => new Ribbon(item))

    this.container.innerHTML = feedNodeTemplate({simpleDate: this.simpleDate, date: this.date, selected: this.selected})

    this.node = this.container.querySelector('li.schedule__list-item')

    this.ribons.forEach(this.mountRibbons.bind(this))

  }

  mountRibbons(ribbon) {

    const hook = this.node.querySelector('ul.schedule__ribons')

    const container = document.createElement('LI')

    container.className = 'schedule__ribon-container'

    container.appendChild(ribbon.node)

    hook.appendChild(container)

  }

}

export default FeedNode