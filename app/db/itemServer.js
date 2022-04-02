function ItemServer(items) {

  this.rawDB = items
  this.combinedItems = []

  for(let key in this.rawDB) {

    this.rawDB[key].forEach(item => {

      item.type = key.slice(0, -1)
      item[item.type] = true
      item.date = item.dueDate || item.eventDate || item.meetingDate || item.pinDate

      this.combinedItems.push(item)
    })
  }
}

ItemServer.prototype.dots = function(month) {

  const dots = {}

  filterByMonth(this.combinedItems, month).forEach(item => {

    let day = item.date.substring(0, item.date.indexOf(' '))

    if(!dots[day]) dots[day] = [item.type]
    else dots[day].push(item.type)
  }) 

  return dots
}

ItemServer.prototype.groupedItems = function(month) {

  const groupedItems = {}

  filterByMonth(this.combinedItems, month).forEach(item => {

    if(!groupedItems[item.date]) groupedItems[item.date] = [item]
    else groupedItems[item.date].push(item)
  })

  return sortByDate(groupedItems, 1)
  /* 1 for ascending, -1 for descending */
}

module.exports = ItemServer

/* Utility functions */

function filterByMonth(items, month) {

  return items.filter(item => {

    return new Date(item.date).getMonth() === month
  })
}

function sortByDate(obj, order) {

  return Object.fromEntries(Object.entries(obj).sort((a, b) => {

    let [keyOne] = a
    let [keyTwo] = b

    keyOne = Number(keyOne.substring(0, keyOne.indexOf(' ')))
    keyTwo = Number(keyTwo.substring(0, keyTwo.indexOf(' ')))

    return (keyOne - keyTwo) * order

  }))
}