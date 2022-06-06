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

    this.listenTo(this.form)

    this.events()

  }

  listenTo(form) {

    form.addEventListener('submit', e => {

      e.preventDefault()

      const action = e.submitter.value

      if(['inProgress', 'snooze'].includes(action)) this.emit('keep')

      if(action === 'done') this.emit('done', this.item.id)

      if(['accept', 'tentative', 'deny'].includes(action)) this.emit('mtgResponse', this.item.id, action)

      if(action === 'dismiss') this.emit('remove')

    })

  }

  events() {

    this.itemModel.on('itemEdit', item => {

      if(item.id == this.item.id) {

        this.render(item)

        setTimeout(() => this.emit('edit', item), 1)
      }

    })

    this.itemModel.on('itemRemoved', itemToRemove => {

      if(itemToRemove.id == this.item.id) {

        this.emit('remove')
      }

    })

  }

  render(item) {

    this.cardHTML = itemCardTemplate({item})

    this.div.innerHTML = templates.get(item.type)({cardHTML: this.cardHTML})
    
    const replacement = this.div.querySelector('li.notification-display__item')

    this.node.replaceWith(replacement)

    this.node = replacement

    this.form = this.node.querySelector('form')

    this.listenTo(this.form)

    this.item = item

    display.init()

  }

}

ee(Notification.prototype)

export default Notification