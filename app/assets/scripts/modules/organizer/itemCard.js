class ItemCard {

  itemCardCollections = document.querySelectorAll('.calendar-display__items, .items__list')

  constructor(views, localItemModel) {

    this.views = views

    this.events()
  }

  events() {

    for(const collection of this.itemCardCollections) {

      collection.addEventListener('click', e => {

        if(e.target.closest('.item-card')) this.onClick(e.target)
      })
    }
  }

  onClick(target) {

    const cardId = target.closest('.item-card').dataset.itemId

    if(target.closest('.item-card__content')) {

      const itemRead = document.createElement('H1')
      itemRead.textContent = `Read item ${cardId}`

      this.views.render('right', itemRead)
    }
  }
}

export default ItemCard