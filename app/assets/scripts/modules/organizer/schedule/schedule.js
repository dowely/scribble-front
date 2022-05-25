import Feed from './feed'

class Schedule {
  constructor(views, itemModel) {

    this.views = views

    this.feed = new Feed(itemModel)

    this.events()

  }

  events() {

    this.views.once('schedule', () => this.feed.scrollToSelectedNode())
  }
}

export default Schedule