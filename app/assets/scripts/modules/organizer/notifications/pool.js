import ee from 'event-emitter'
import Notification from './notification'

class Pool {

  notifications = []

  constructor() {this.events()}

  events() {

    addEventListener('beforeunload', () => this.storePool())

  }

  storePool() {

    const ids = this.notifications.map(notification => notification.item.id)

    localStorage.setItem('notifications', JSON.stringify(ids))

  }

  load(itemModel) {

    const storedPool = localStorage.getItem('notifications')

    if(storedPool) {

      const itemsId = JSON.parse(storedPool)

      itemsId.forEach(id => this.notifications.push(new Notification(itemModel.getItemById(id))))

    }
  }

  add(itemModel) {

    const tasks = itemModel.getItemsByType('task').filter(item => !item.notified).filter(item => new Date(item.date).getTime() < Date.now() + 8.64e+7).map(item => new Notification(item))

    const events = itemModel.getItemsByType('event').filter(item => !item.notified).filter(item => this.inReminderZone(item)).map(item => new Notification(item))

    const meetings = itemModel.getItemsByType('meeting').filter(item => !item.notified).filter(item => item.status !== 'accepted' || this.inReminderZone(item)).map(item => new Notification(item))

    this.notifications.push(...tasks, ...events, ...meetings)

  }

  inReminderZone(item) {

    const itemTime = new Date(item.date)

    const itemHour = parseInt(item[`${item.type}Start`].substring(0, item[`${item.type}Start`].indexOf(':'))) + (item[`${item.type}Start`].slice(-2) === 'PM' ? 12 : 0)

    const itemMinutes = parseInt(item[`${item.type}Start`].substring(item[`${item.type}Start`].indexOf(':') + 1, item[`${item.type}Start`].indexOf(':') + 3))

    itemTime.setHours(itemHour, itemMinutes)

    const before = parseInt(item.reminder.substring(0, item.reminder.indexOf(' '))) * (item.reminder.charAt(item.reminder.indexOf(' ') + 1) === 'm' ? 60000 : item.reminder.charAt(item.reminder.indexOf(' ') + 1) === 'h' ? 3600000 : 8.64e+7)

    return itemTime.getTime() - before < Date.now()

  }
  
}

ee(Pool.prototype)

export default new Pool()