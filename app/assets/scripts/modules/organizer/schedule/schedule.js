import Feed from './feed'
import header from './header'
import ee from 'event-emitter'

ee(Feed.prototype)

class Schedule {

  feed

  header

  constructor(views, itemModel) {

    this.views = views

    this.itemModel = itemModel

    this.events()

  }

  events() {

    this.views.once('schedule', () => {

      this.feed = new Feed(this.itemModel)

      header.hideInitially()

      this.feed.scrollToSelectedNode()

      this.feed.on('monthChange', monthRange => header.render(monthRange))

      this.feed.on('done', itemId => this.emit('done', itemId))

      this.feed.on('read', itemId => this.emit('read', itemId))

      this.itemModel.on('itemRemoved', removedItem => {

        if(this.views.viewState.twoCols && this.views.viewState.leftColIndex === '2') {
  
          this.feed.deleteItem({removedItem, transition: true})
  
        } else this.feed.deleteItem({removedItem, transition: false})
  
      })

    })

  }
}

export default Schedule