import pool from './pool'

class Display {

  node = document.querySelector('ul.notification-display')

  constructor() {this.events()}

  init() {

    this.node.innerHTML = ''

    pool.notifications.forEach((notification, i) => {

      if(i === pool.index) notification.node.classList.add('notification-display__item--visible')

      this.node.appendChild(notification.node)

    })
  }

  events() {

    pool.on('changed', change => {

      if(change === 'index') this.transition(this.changeIndex.bind(this))

      //if(change === 'collection') this.transition(this.render.bind(this))

    })

  }

  transition(action) {

    new Promise(res => {

      this.node.ontransitionend = res

      setTimeout(() => this.node.ontransitioncancel = res, 50)

      this.node.classList.add('notification-display--faded')

    }).then(action)

  }

  changeIndex() {

    [...this.node.children].forEach((li, index) => {

      li.classList.remove('notification-display__item--visible')

      if(index === pool.index) li.classList.add('notification-display__item--visible')

    })

    this.node.classList.remove('notification-display--faded')

  }

  render() {

  }

}

export default new Display()