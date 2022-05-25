import ribonTemplate from './templates/_ribbon.ejs'

class Ribbon {

  node

  container = document.createElement('DIV')

  constructor(item) {

    this.item = item

    this.container.innerHTML = ribonTemplate({item})

    this.node = this.container.querySelector('div.schedule-ribon')

  }
}

export default Ribbon