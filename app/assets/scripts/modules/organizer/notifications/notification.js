import ee from 'event-emitter'
import itemCardTemplate from '/app/assets/templates/organizer/_item-card.ejs'
import taskNotificationTemplate from './templates/_task-notification.ejs'
import eventNotificationTemplate from './templates/_event-notification.ejs'
import meetingNotificationTemplate from './templates/_meeting-notification.ejs'
import display from './display'

const templates = new Map()

templates.set('task', taskNotificationTemplate)
templates.set('event', eventNotificationTemplate)
templates.set('meeting', meetingNotificationTemplate)

class Notification {

  div = document.createElement('DIV')

  item

  cardHTML

  node

  form

  constructor(item, itemModel) {

    this.item = item

    this.itemModel = itemModel

    this.item.notified = true

    this.cardHTML = itemCardTemplate({item})

    this.div.innerHTML = templates.get(item.type)({cardHTML: this.cardHTML})

    this.node = this.div.querySelector('li.notification-display__item')

    this.form = this.node.querySelector('form')

    this.events()

  }

  events() {

    this.form.addEventListener('submit', e => {

      e.preventDefault()

      const action = e.submitter.value

      if(['inProgress', 'tentative'].includes(action)) this.emit('keep')

      if(action === 'done') this.emit('done')

    })

    this.itemModel.on('itemEdit', item => {

      if(item.id == this.item.id) {

        this.render(item)

        setTimeout(() => this.emit('edit'), 1)
      }

    })

  }

  render(item) {

    this.cardHTML = itemCardTemplate({item})

    this.div.innerHTML = templates.get(item.type)({cardHTML: this.cardHTML})
    
    const replacement = this.div.querySelector('li.notification-display__item')

    this.node.replaceWith(replacement)

    this.node = replacement

    this.item = item

    display.init()

  }

  //emit keep, edit, remove 

}

ee(Notification.prototype)

export default Notification