import throttle from 'lodash/throttle'
import FeedNode from "./feedNode"
import ee from 'event-emitter'

ee(FeedNode.prototype)

class Feed {

  node = document.querySelector('ul.schedule__list')

  prevScrollTop

  monthRange = [0, 0] //miliseconds

  noLaterItems = false

  noPriorItems = false

  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    get date() {
      return new Date(this.year, this.month, this.day)
      //return new Date(2022, 4, 9)
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

      this.node.innerHTML = ''

      this.feedNodes.forEach(feedNode => this.node.appendChild(feedNode.node))

    }

    this.events()

  }

  events() {

    this.node.addEventListener('scroll', throttle(this.onScroll, 200, { 'trailing': true }).bind(this))

    this.node.addEventListener('scrolledToTop', this.prependFeedNode.bind(this))

    this.node.addEventListener('scrolledToBottom', this.appendFeedNode.bind(this))

    this.itemModel.on('newItem', this.addNewItem.bind(this))

    this.itemModel.on('itemEdit', this.editItem.bind(this))

    this.addFeedNodeEventListeners(this.feedNodes)

  }

  addFeedNodeEventListeners(feedNodes) {

    feedNodes.forEach(feedNode => {

      feedNode.on('done', itemId => this.emit('done', itemId))

      feedNode.on('read', itemId => this.emit('read', itemId))

    })
  }

  deleteItem(info) {

    const hostingNode = this.feedNodes.find(feedNode => feedNode.simpleDate === info.removedItem.date)

    try {

      if(hostingNode.ribbons.length < 2) this.removeFeedNode({feedNode: hostingNode, transition: info.transition})

      else hostingNode.removeItem({item: info.removedItem, transition: info.transition})

    } catch(e) {

      console.error(e.message)

    }
  }

  removeFeedNode(info) {

    const atIndex = this.feedNodes.indexOf(info.feedNode)

    this.feedNodes.splice(atIndex, 1)

    if(!info.transition) info.feedNode.node.remove()
    else info.feedNode.transitionOut()

  }

  editItem(editedItem) {

    const hostingNode = this.feedNodes.find(feedNode => feedNode.simpleDate === editedItem.date)

    try {

      hostingNode.editItem(editedItem)

    } catch {

      console.error('Failed to establish hosting node')

    }
  }

  addNewItem(newItem) {

    let hostingNode = this.feedNodes.find(feedNode => feedNode.simpleDate === newItem.date)

    if(hostingNode) hostingNode.appendItem(newItem)
    else {

      const newNode = new FeedNode([newItem], newItem.date, false)

      this.addFeedNodeEventListeners([newNode])

      const atIndex = this.feedNodes.findIndex(feedNode => feedNode.date > newNode.date)

      if(atIndex < 0) { // at the end
        
        const prevSibling = this.feedNodes.at(-1).node

        this.feedNodes.push(newNode)

        prevSibling.after(newNode.node)

      } else {

        const nextSibling = this.feedNodes[atIndex].node

        this.feedNodes.splice(atIndex, 0, newNode)

        this.node.insertBefore(newNode.node, nextSibling)

      }
    }
  }

  prependFeedNode() {

    const newGroup = this.itemModel.getPrevGroup(this.feedNodes[0].date)

    if(!newGroup && !this.noPriorItems) this.startOfItems()
    else if(newGroup) {

      const newFeedNode = new FeedNode([...newGroup], newGroup.date, false)

      this.addFeedNodeEventListeners([newFeedNode])

      this.feedNodes.unshift(newFeedNode)

      this.node.prepend(this.feedNodes[0].node)

      const marginOffset = getComputedStyle(this.node.children[0].lastElementChild).getPropertyValue('margin-top').slice(0, -2)

      this.node.scrollTop = this.node.children[1].offsetTop - Number(marginOffset)

    }
  }

  appendFeedNode() {

    const newGroup = this.itemModel.getNextGroup(this.feedNodes[this.feedNodes.length - 1].date)

    if(!newGroup && !this.noLaterItems) this.endOfItems()
    else if(newGroup) {

      const newFeedNode = new FeedNode([...newGroup], newGroup.date, false)

      this.addFeedNodeEventListeners([newFeedNode])

      this.feedNodes.push(newFeedNode)

      this.node.appendChild(this.feedNodes.at(-1).node)

    }
  }

  onScroll() {

    if(this.node.scrollTop > this.prevScrollTop) this.checkIfScrolledToBottom()

    if(this.node.scrollTop < this.prevScrollTop) this.checkIfScrolledToTop()

    this.updateMonthRange()

    this.prevScrollTop = this.node.scrollTop

  }

  updateMonthRange() {

    const visibleNodes = this.flagVisibleNodes()

    const startDate = new Date(visibleNodes.at(0).date).setDate(1)
    const endDate = new Date(visibleNodes.at(-1).date).setDate(1)
    
    if(
      this.monthRange[0] !== startDate ||
      this.monthRange[1] !== endDate
    ) {

      this.monthRange[0] = startDate

      this.monthRange[1] = endDate

      this.emit('monthChange', [startDate, endDate])

    }
  }

  flagVisibleNodes() {

    this.feedNodes.forEach(feedNode => {

      const aboveBottom = this.node.scrollTop + this.node.offsetHeight > feedNode.node.offsetTop

      const belowTop = this.node.scrollTop < feedNode.node.offsetTop + feedNode.node.offsetHeight

      feedNode.isVisible = aboveBottom && belowTop ? true : false

    })

    return this.feedNodes.filter(feedNode => feedNode.isVisible)

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

  scrollToSelectedNode() {

    const selectedNode = this.feedNodes.find(feedNode => feedNode.selected).node

    const offsetTop = Math.ceil(selectedNode.offsetTop) + 1

    this.node.scrollTop = this.prevScrollTop = offsetTop

    if(this.node.scrollTop < offsetTop) this.node.scrollBy({top: -100})

  }

  endOfItems() {

    this.noLaterItems = true

    const lastLi = document.createElement('LI')

    lastLi.className = 'schedule__list-end'

    lastLi.textContent = 'There are no later items'

    this.node.appendChild(lastLi)

  }

  startOfItems() {

    this.noPriorItems = true

    const firstLi = document.createElement('LI')

    firstLi.className = 'schedule__list-start'

    firstLi.textContent = 'There are no prior items'

    const marginOffset = getComputedStyle(this.node.children[0].lastElementChild).getPropertyValue('margin-top').slice(0, -2)

    this.node.prepend(firstLi)

    this.node.scrollTop = this.node.children[1].offsetTop - Number(marginOffset)

  }

  checkIfScrolledToTop() {

    if(this.node.scrollTop < 1) this.node.dispatchEvent(new Event('scrolledToTop'))

  }

  checkIfScrolledToBottom() {

    const lastElOffset = this.node.lastElementChild.offsetTop

    const lastElHeight = this.node.lastElementChild.offsetHeight

    const parentHeight = this.node.offsetHeight

    const parentScrollTop = this.node.scrollTop

    if((lastElOffset + lastElHeight) - (parentHeight + parentScrollTop) < 1) this.node.dispatchEvent(new Event('scrolledToBottom'))

  }
}

export default Feed