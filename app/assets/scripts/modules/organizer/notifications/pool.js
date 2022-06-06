import ee from 'event-emitter'
import Notification from './notification'

class Pool {

  notifications = []

  index = 0

  constructor() {this.events()}

  events() {

    addEventListener('beforeunload', () => this.storePool())

  }

  changeIndex(delta) {

    this.index += delta

    if(this.index < 0) this.index = this.notifications.length - 1

    if(this.index === this.notifications.length) this.index = 0

    this.emit('changed', 'index')

  }

  storePool() {

    const keyExists = localStorage.getItem('notifications')

    if(keyExists) {

      const ids = this.notifications.map(notification => notification.item.id)

      localStorage.setItem('notifications', JSON.stringify(ids))

    }
  }

  load(itemModel) {

    const storedPool = localStorage.getItem('notifications')

    if(storedPool) {

      this.notifications = []

      const itemsId = JSON.parse(storedPool)

      itemsId.forEach(id => {

        const notification = new Notification(itemModel.getItemById(id), itemModel)

        this.listenTo(notification)

        this.notifications.push(notification)
      })

      if(this.notifications.length > 0) this.emit('changed', 'collection')

    } else localStorage.setItem('notifications', '[]')
  }

  listenTo(notification) {

    this.emit('newCard', notification.node.querySelector('.item-card'))

    notification.on('keep', () => this.changeIndex(1))

    notification.on('remove', notification.onRemove = () => this.remove(notification))

    notification.on('done', id => setTimeout(this.emit('done', id), 1))

    notification.on('edit', notification.onEdit = item => {

      if(item.status === 'done' || item.status === 'accepted' || item.status === 'tentative' || !this.inReminderZone(item) && item.event) {

        this.remove(notification)

      } else {

        this.emit('newCard', notification.node.querySelector('.item-card'))

      }

    })

    notification.on('mtgResponse', (id, response) => setTimeout(this.emit('mtgResponse', id, response), 1))

  }

  add(itemModel) {

    const tasks = itemModel.getItemsByType('task')
      .filter(item => !item.notified)
      .filter(item => !this.notifications.find(noti => noti.item.id == item.id))
      .filter(item => new Date(item.date).getTime() < Date.now() + 8.64e+7)
      .map(item => {

        const notification = new Notification(item, itemModel)

        this.listenTo(notification)

        return notification
      })

    const events = itemModel.getItemsByType('event')
      .filter(item => !item.notified)
      .filter(item => !this.notifications.find(noti => noti.item.id == item.id))
      .filter(item => this.inReminderZone(item))
      .map(item => {

        const notification = new Notification(item, itemModel)

        this.listenTo(notification)

        return notification
      })

    const meetings = itemModel.getItemsByType('meeting')
      .filter(item => !item.notified)
      .filter(item => !this.notifications.find(noti => noti.item.id == item.id))
      .filter(item => item.status === 'pending' || this.inReminderZone(item)).map(item => {

        const notification = new Notification(item, itemModel)

        this.listenTo(notification)

        return notification
      })

    if(this.notifications.length < this.notifications.push(...tasks, ...events, ...meetings)) this.emit('changed', 'collection')

  }

  remove(notification) {

    notification.off('remove', notification.onRemove)

    notification.off('edit', notification.onEdit)

    const atIndex = this.notifications.indexOf(notification)

    this.notifications.splice(atIndex, 1)

    if(this.index === this.notifications.length && this.index > 0) {

      this.index--

      this.emit('changed', 'index')
    }

    this.emit('changed', 'collection')

    if(this.notifications.length === 0) this.emit('empty')
  }

  inReminderZone(item) {

    if(item.task) return true

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