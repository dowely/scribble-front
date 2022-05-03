import staticDB from '/app/db/items.json'

class LocalItemModel {

  data
  volatileMemory

  constructor() {
    
    this.data = localStorage.getItem('items') || this.init(staticDB)

    this.volatileMemory = this.load()

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

  dots(month) {

    const dots = {}
    
    this.filterByMonth(this.volatileMemory, month).forEach(item => {
  
      let day = item.date.substring(0, item.date.indexOf(' '))
  
      if(!dots[day]) dots[day] = [item.type]
      else dots[day].push(item.type)
    }) 
    
    return dots
  }

  groupedItems (month) {

    const groupedItems = {}
  
    this.filterByMonth(this.volatileMemory, month).forEach(item => {
  
      if(!groupedItems[item.date]) groupedItems[item.date] = [item]
      else groupedItems[item.date].push(item)
    })
  
    return this.sortByDate(groupedItems, 1)
    /* 1 for ascending, -1 for descending */
  }

  filterByMonth(items, month) {

    return items.filter(item => {
  
      return new Date(item.date).getMonth() === month
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

  getFullDate(date) {

  }

  simpleDate(dateObj) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return `${dateObj.getDate()} ${months[dateObj.getMonth()].substring(0, 3)} ${dateObj.getFullYear()}`
  }

  itemCountOn(date) {

    return this.volatileMemory.filter(item => item.date === date).length
  }
}

export default LocalItemModel