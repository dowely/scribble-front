import ee from 'event-emitter'
import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'
import taskNotificationTemplate from './templates/_task-notification.ejs'
import eventNotificationTemplate from './templates/_event-notification.ejs'
import meetingNotificationTemplate from './templates/_meeting-notification.ejs'

const templates = new Map()

templates.set('task', taskNotificationTemplate)
templates.set('event', eventNotificationTemplate)
templates.set('meeting', meetingNotificationTemplate)

class Notification {

  div = document.createElement('DIV')

  item

  cardHTML

  node

  constructor(item) {

    this.item = item

    this.item.notified = true

    this.cardHTML = itemCardTemplate({item})

    this.div.innerHTML = templates.get(item.type)({cardHTML: this.cardHTML})

    this.node = this.div.querySelector('li.notification-display__item')

  }

}

ee(Notification.prototype)

export default Notification