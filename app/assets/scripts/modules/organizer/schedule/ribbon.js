import ribonTemplate from './templates/_ribbon.ejs'

class Ribbon {

  node

  container = document.createElement('DIV')

  constructor(item) {

    this.item = item

    this.container.innerHTML = ribonTemplate({item})

    this.node = this.container.querySelector('div.schedule-ribon')

    this.events(this.node)

  }

  events(node) {

    node.addEventListener('click', e => {

      try {

        const emptySquare = e.target.closest('.schedule-ribon__checkbox:not(.schedule-ribon__checkbox--checked)')

        emptySquare.style.display = 'none'

        emptySquare.nextElementSibling.style.display = 'block'

        this.emit('done', this.item.id)

      } catch {

        this.emit('read', this.item.id)

      }
    })
  }

  render(editedItem) {

    this.container.innerHTML = ribonTemplate({item: editedItem})

    const replacement = this.container.querySelector('div.schedule-ribon')

    this.node.replaceWith(replacement)

    this.node = replacement

    this.item = editedItem

    this.events(this.node)

  }

  transitionOut() {

    const duration = 300 // ms

    const container = this.node.parentElement

    const height = container.offsetHeight

    const fadeOut = new Promise(res => {

      container.ontransitionend = container.ontransitioncancel = e => {

        e.stopPropagation()

        res()
      }

      container.style.cssText = `
        transition: opacity ${duration}ms ease-out;
        opacity: 0;
        height: ${height}px;
      `
    })

    const collapse = () => {

      return new Promise(res => {

        setTimeout(() => {

          container.ontransitionend = container.ontransitioncancel = e => {

            e.stopPropagation()

            res()
          }

        },50)

        container.style.cssText = `
          transition: all ${duration}ms ease-out;
          height: 0;
          opacity: 0;
          padding: 0;
        `
      })
    }

    fadeOut
      .then(collapse)
      .then(() => container.remove())

  }
}

export default Ribbon