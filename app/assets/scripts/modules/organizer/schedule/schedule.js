import Feed from './feed'

class Schedule {
  constructor(itemModel) {

    this.feed = new Feed(itemModel)
  }
}

export default Schedule