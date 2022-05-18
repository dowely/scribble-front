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
  }

}

export default ItemCard