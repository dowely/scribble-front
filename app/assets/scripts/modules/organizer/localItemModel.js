import staticDB from '/app/db/items.json'

class LocalItemModel {

  data
  volatileMemory

  constructor() {
    
    this.data = localStorage.getItem('items') || this.init(staticDB)

    if(typeof this.data === 'string') {

      this.volatileMemory = JSON.parse(this.data)

    } else {

      this.volatileMemory = this.load()

      localStorage.setItem('items', '[]')
    }   

  }

  writeToStorage() {

    if(localStorage.getItem('items')) localStorage.setItem('items', JSON.stringify(this.volatileMemory))

  }

  init(staticDB) {

    const now = new Date()
    
    let localDB = staticDB

    for(let key in staticDB) {

      staticDB[key].forEach(item => {

        const staticDate = item.dueDate || item.eventDate || item.meetingDate || item.pinDate

        const localDate = new Date(staticDate)

        localDate.setFullYear(now.getFullYear())
        
        if(item.title === 'Car service') {
          
          localDate.setMonth(now.getMonth() + 1)

        } else {

          localDate.setMonth(now.getMonth())
        }
        
        if(key === 'tasks') item.dueDate = this.simpleDate(localDate)
        if(key === 'events') item.eventDate = this.simpleDate(localDate)
        if(key === 'meetings') item.meetingDate = this.simpleDate(localDate)
        if(key === 'notes') item.pinDate = this.simpleDate(localDate)

        if(key === 'tasks' && item.status !== 'done' && (now.getTime() > new Date(item.dueDate).getTime() + 8.64e+7)) item.status = 'overdue'
      })
    }

    return localDB
  }

  load() {

    const combinedItems = []
    
    for(let key in this.data) {

      this.data[key].forEach(item => {
  
        item.type = key.slice(0, -1)
        item[item.type] = true
        item.date = item.dueDate || item.eventDate || item.meetingDate || item.pinDate
        item.fullDate = this.getFullDate(item.date)
  
        combinedItems.push(item)
      })
    }

    return combinedItems

  }

  dots(date) {

    const dots = {}
    
    this.filterByMonth(this.volatileMemory, date).forEach(item => {
  
      let day = item.date.substring(0, item.date.indexOf(' '))
  
      if(!dots[day]) dots[day] = [item.type]
      else dots[day].push(item.type)

      dots[day] = [...new Set(dots[day])]
    }) 
    
    return dots
  }

  getTodaysGroup(dateObj) {

    let todaysGroup

    const todaysItem = this.volatileMemory.find(item => new Date(item.date).getTime() === dateObj.getTime())

    if(todaysItem) {

      todaysGroup = this.volatileMemory.filter(item => item.date === todaysItem.date)

      todaysGroup.date = todaysItem.date

      todaysGroup.as = 'today'

    }

    return todaysGroup

  }

  getNextGroup(dateObj) {

    let nextGroup

    const timeSortedItems = [...this.volatileMemory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // asc

    const nextItem = timeSortedItems.find(item => new Date(item.date).getTime() > dateObj.getTime())

    if(nextItem) {

      nextGroup = timeSortedItems.filter(item => item.date === nextItem.date)

      nextGroup.date = nextItem.date

      nextGroup.as = 'next'

    }

    return nextGroup

  }

  getPrevGroup(dateObj) {

    let prevGroup

    const timeSortedItems = [...this.volatileMemory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) //dsc

    const prevItem = timeSortedItems.find(item => new Date(item.date).getTime() < dateObj.getTime())

    if(prevItem) {

      prevGroup = timeSortedItems.filter(item => item.date === prevItem.date)

      prevGroup.date = prevItem.date

      prevGroup.as = 'prev'

    }

    return prevGroup

  }

  groupedItems(date, today) {

    const groupedItems = {}
  
    this.filterByMonth(this.volatileMemory, date).forEach(item => {
  
      if(!groupedItems[item.date]) groupedItems[item.date] = [item]
      else groupedItems[item.date].push(item)
    })
   
    if(today && !groupedItems[today]) {

      this.volatileMemory.filter(item => item.date === today).forEach(item => {

        if(!groupedItems[today]) groupedItems[today] = [item]
        else groupedItems[today].push(item)
      })
    }

    return this.sortByDate(groupedItems, 1)
    /* 1 for ascending, -1 for descending */
  }

  filterByMonth(items, date) {

    return items.filter(item => {
  
      return new Date(item.date).setDate(1) === date.setDate(1)
    })
  }

  sortByDate(obj, order) {

    return Object.fromEntries(Object.entries(obj).sort((a, b) => {
  
      let [keyOne] = a
      let [keyTwo] = b
  
      keyOne = Number(keyOne.substring(0, keyOne.indexOf(' ')))
      keyTwo = Number(keyTwo.substring(0, keyTwo.indexOf(' ')))
  
      return (keyOne - keyTwo) * order
  
    }))
  }

  getItemById(itemId) {

    return this.volatileMemory.find(item => item.id == itemId)
  }

  getFullDate(dateStr) {

    const days = ['Sunday', 'Monaday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday']

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date  = new Date(dateStr)

    const text = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()

    return text
  }

  simpleDate(dateObj) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return `${dateObj.getDate()} ${months[dateObj.getMonth()].substring(0, 3)} ${dateObj.getFullYear()}`
  }

  itemCountOn(date) {

    return this.volatileMemory.filter(item => item.date === date).length
  }

  pop(itemId) {

    const itemToRemove = this.volatileMemory.find(item => item.id == itemId)

    this.volatileMemory.splice(this.volatileMemory.indexOf(itemToRemove), 1)

    this.emit('itemRemoved', itemToRemove)

  }

  push(item) {

    let id

    do {

      id = Math.floor(1000 + Math.random() * 9000)

    } while(this.getItemById(id))

    item.id = id

    this.volatileMemory.push(item)

    this.emit('newItem', item)

  }

  edit(item) {

    const atIndex = this.volatileMemory.findIndex(el => el.id == item.id)

    this.volatileMemory.splice(atIndex, 1, item)

    this.emit('itemEdit', item)
  }

  getItemsByType(type) {

    return this.volatileMemory.filter(item => item[type]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}

export default LocalItemModel