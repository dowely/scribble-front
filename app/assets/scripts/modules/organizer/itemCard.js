import itemReadTemplate from '/app/assets/templates/organizer/_item-read.ejs'

class ItemCard {

  itemCardCollections = document.querySelectorAll('.calendar-display__items, .items__list')

  constructor(views, localItemModel) {

    this.views = views
    this.localItemModel = localItemModel

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

      this.views.render('right', this.itemReadNode(cardId))
    }
  }

  itemReadNode(id) {

    const container = document.createElement('DIV')
    const itemObj = this.localItemModel.getItemById(id)
    console.log(itemObj);
    container.innerHTML = itemReadTemplate({item: itemObj})

    return container.querySelector('.item-read')
  }
}

export default ItemCard