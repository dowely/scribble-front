import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'

class Items {

  items = document.querySelector('.items')

  heading = document.querySelector('.items__heading')

  cardContainers = document.querySelectorAll('.items__list__card-container')

  itemCards = document.querySelectorAll('.items .item-card')

  itemsCount = {
    note: 0,
    task: 0,
    event: 0,
    meeting: 0
  }

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

    this.localizeItems()

  }

  localizeItems() {

    const container = document.createElement('DIV')

    for(const itemCard of this.itemCards) {

      const cardId = itemCard.dataset.itemId
      const cardType = itemCard.dataset.cardType

      this.itemsCount[cardType]++

      const item = this.localItemModel.getItemById(cardId)

      container.innerHTML = itemCardTemplate({item})

      itemCard.replaceWith(container.querySelector('.item-card'))
    }

    for(const count in this.itemsCount) {

      this.heading.style.setProperty(`--${count}-count`, `"${this.itemsCount[count]}"`)
    }

  }

  async select(itemType) {

    await this.views.fadeOut('left', 'viewer')

    this.items.dataset.itemsType = itemType

    this.views.fadeIn('left', 'viewer')
  }

  async pop(itemId) {
    
    let containerToRemove

    for(const cardContainer of this.cardContainers) {

      const card = cardContainer.querySelector('.item-card')

      const cardId = card.dataset.itemId

      if(cardId === itemId) {

        const cardType = card.dataset.cardType

        containerToRemove = cardContainer

        containerToRemove.type = cardType

        break
      }
    }

    if(containerToRemove.type === this.items.dataset.itemsType) {

      await this.fadeOut(containerToRemove)

      await this.collapse(containerToRemove)
    }

    containerToRemove.remove()

    this.updateCount(containerToRemove.type, -1)

  }

  fadeOut(container) {
    return new Promise(res => {

      container.ontransitionend = container.ontransitioncancel = res

      container.style.cssText = `
        transition: opacity .2s ease-out, height .3s ease-in;
        opacity: 0;
      `
    })
  }

  collapse(container) {
    return new Promise(res => {

      container.ontransitionend = container.ontransitioncancel = res

      container.style.height = getComputedStyle(container).getPropertyValue('height')

      setTimeout(() => {

        container.style.height = 0

      }, 1)

    })
  }

  updateCount(itemsType, operator) {

    new Promise(res => {

      this.itemsCount[itemsType] += operator

      this.heading.ontransitionend = this.heading.ontransitioncancel = res

      this.heading.classList.add('items__heading--faded')

    }).then(() => {

      this.heading.style.setProperty(`--${itemsType}-count`, `"${this.itemsCount[itemsType]}"`)

      this.heading.classList.remove('items__heading--faded')
    })
  }
}

export default Items