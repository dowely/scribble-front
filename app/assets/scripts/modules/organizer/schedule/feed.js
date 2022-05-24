import FeedNode from "./feedNode"

class Feed {

  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    get date() {
      return new Date(this.year, this.month, this.day)
    }
  }

  initialGroups = []

  feedNodes

  constructor(itemModel) {

    this.itemModel = itemModel

    this.initialGroups[0] =
      itemModel.getTodaysGroup(this.today.date) ||
      itemModel.getNextGroup(this.today.date) ||
      itemModel.getPrevGroup(this.today.date)

    if(this.initialGroups[0] === undefined) {

      console.log('The feed is empty')

    } else {

      this.collectInitialGroups(10)
      
      this.feedNodes = this.initialGroups.map(itemGroup => new FeedNode([...itemGroup], itemGroup.date, itemGroup.selected))

    }

  }

  collectInitialGroups(totalItemCount) {

    let itemCount, iterator, earliestDate, latestDate

    itemCount = this.initialGroups[0].length
    
    iterator = 0 // increased by one each time an item group is added

    earliestDate = latestDate = this.initialGroups[0].date

    this.initialGroups[0].selected = true

    while (itemCount < totalItemCount) {

      let newGroup
      
      if(iterator % 2 === 0) {

        newGroup =
          this.itemModel.getNextGroup(new Date(latestDate)) ||
          this.itemModel.getPrevGroup(new Date(earliestDate))

      } else {

        newGroup =
          this.itemModel.getPrevGroup(new Date(earliestDate)) ||
          this.itemModel.getNextGroup(new Date(latestDate))

      }

      if(!newGroup) break

      if(newGroup.as === 'next') {

        latestDate = newGroup.date

        this.initialGroups.push(newGroup)

      }

      if(newGroup.as === 'prev') {

        earliestDate = newGroup.date

        this.initialGroups.unshift(newGroup)

      }

      itemCount += newGroup.length

      iterator++

    }
  }
}

export default Feed