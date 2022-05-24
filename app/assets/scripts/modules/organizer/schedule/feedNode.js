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
  }
}

export default FeedNode

/*
<% ribons.forEach(ribon => { %>

  <li class="schedule__ribon-container">

    <%- ribon.html %>

  </li>

<% }) %>
*/