class ItemCard {

  constructor() {}

  events(cardNodes) {

    const cards = cardNodes ? cardNodes : [...document.querySelectorAll('.item-card')]

    for(const card of cards) {

      card.addEventListener('click', this.onClick.bind(this))
    }
  }

  onClick(e) {

    const cardId = e.target.closest('.item-card').dataset.itemId

    if(e.target.closest('.item-card__content')) {

      this.emit('itemRead', cardId)

    }

    if(e.target.closest('.item-card__icon--trash')) {

      this.emit('delete', cardId)
    }

    if(e.target.closest('.item-card__icon--edit')) {

      this.emit('edit', cardId)
    }

    if(e.target.closest('.item-card__task-checkbox-icon')) {

      const toggle = e.target.closest('.item-card__task-toggle-container')

      if(toggle.dataset.taskStatus !== 'done') {

        toggle.dataset.taskStatus = 'done'

        toggle.lastElementChild.textContent = 'done'

        this.emit('done', cardId)
      }
     
    }

  }

}

export default ItemCard