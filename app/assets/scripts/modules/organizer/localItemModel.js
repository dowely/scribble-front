import staticDB from '/app/db/items.json'

class LocalItemModel {

  data
  volatileMemory

  constructor() {
    
    this.data = localStorage.getItem('items') || this.init(staticDB)
    console.log(this.data)
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
        localDate.setMonth(now.getMonth())

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

  filterByMonth(items, month) {

    return items.filter(item => {
  
      return new Date(item.date).getMonth() === month
    })
  }

  getFullDate(date) {

  }

  simpleDate(dateObj) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return `${dateObj.getDate()} ${months[dateObj.getMonth()].substring(0, 3)} ${dateObj.getFullYear()}`
  }
}

export default LocalItemModel