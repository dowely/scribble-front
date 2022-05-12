class ItemCard {

  constructor() {}

  events(cardNode) {

    if(cardNode) {



    } else {

      const itemCardCollections = document.querySelectorAll('.calendar-display__items, .items__list')

      for(const collection of itemCardCollections) {

        collection.addEventListener('click', e => {

          if(e.target.closest('.item-card')) this.onClick(e.target)
        })
      }
    }
  }

  onClick(target) {

    const cardId = target.closest('.item-card').dataset.itemId

    if(target.closest('.item-card__content')) {

      this.emit('itemRead', cardId)

    }

    if(target.closest('.item-card__icon--trash')) {

      this.emit('delete', cardId)
    }
  }

}

export default ItemCard