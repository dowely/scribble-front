import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'

class Result {

  div = document.createElement('DIV')

  node

  constructor(item) {

    this.div.innerHTML = itemCardTemplate({item})

    this.node = this.div.querySelector('.item-card')

    this.item = item

  }

  render(item) {

    this.div.innerHTML = itemCardTemplate({item})

    const replacement = this.div.querySelector('.item-card')

    this.node.replaceWith(replacement)

    this.node = replacement

    this.item = item

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

        if(!container.nextElementSibling) {

          if(container.parentElement.scrollTop === 0) res()

          const heightToScroll = Number(getComputedStyle(container).getPropertyValue('height').slice(0, -2)) + Number(getComputedStyle(container.previousElementSibling).getPropertyValue('margin-bottom').slice(0, -2))

          container.parentElement.scrollBy({top: -heightToScroll, behavior: 'smooth'})

        } else {

          setTimeout(() => {

            container.ontransitionend = container.ontransitioncancel = e => {
  
              e.stopPropagation()
  
              res()
            }
  
          }, 50)
  
          container.style.cssText = `
            transition: all ${duration}ms ease-out;
            height: 0;
            opacity: 0;
            margin: 0;
          `

        }

      })
    }

    fadeOut
      .then(collapse)
      .then(() => container.remove())

  }
}

export default Result