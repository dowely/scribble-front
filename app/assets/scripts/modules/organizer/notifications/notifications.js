import display from './display'
import pool from './pool'
import navigator from './navigator'


class Notifications {

  bells = [
    document.querySelector('.top-bar-organizer__notifier-tap-area'),
    document.querySelector('.slider-bar__notifier-tap-area'),
    document.querySelector('.notifications__notifier-tap-area')
  ]

  bellNotifiers = document.querySelectorAll('.bell-notifier')

  flashMsg = false

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

    this.events()

    pool.load(localItemModel)

    pool.add(localItemModel)

    setInterval(() => pool.add(localItemModel), 5000)

  }

  events() {

    this.bells.forEach(bell => {

      bell.addEventListener('click', e => {

        e.stopPropagation()

        if(!this.flashMsg) this.toggle()
        
      })
    })

    pool.on('changed', change => {
      
      if(change === 'collection') {

        if(pool.notifications.length > 0) {

          [...this.bellNotifiers].forEach(bell => {
            bell.classList.add('bell-notifier--yes')
          })

        } else {

          [...this.bellNotifiers].forEach(bell => {
            bell.classList.remove('bell-notifier--yes')
          })

        } 
      }
    })

    pool.on('empty', () => {

      this.flashMsg = true

      setTimeout(() => {

        this.flashMsg = false

        this.toggle()

      }, 3000)

    })

    pool.on('newCard', cardNode => {
      
      setTimeout(() => this.emit('newCard', cardNode), 1)
    })

    pool.on('done', id => setTimeout(this.emit('done', id), 1))

    pool.on('mtgResponse', (id, response) => setTimeout(this.emit('mtgResponse', id, response), 1))

  }

  async toggle() {

    const action = this.views.viewState.subMenu === 'notifications' ? 'close' : 'open'
    
    switch(action) {

      case 'open':

        if(pool.notifications.length) {

          navigator.init()

          display.init()

          this.views.notifications()

          await this.views.fadeOut('left', 'viewer')

          this.views.columns.left.dataset.index = '4'

          this.views.fadeIn('left', 'viewer')

        } else {

          this.flashMsg = true

          this.views.notifications()

          setTimeout(() => {

            this.views.notifications()

            this.flashMsg = false

          }, 3000)

        }      

        break

      case 'close':

        this.views.notifications()

        await this.views.fadeOut('left', 'viewer')

        this.views.columns.left.dataset.index = this.views.viewState.leftColIndex

        this.views.fadeIn('left', 'viewer')

        break

      default:

        console.log('Error in toggle function')

    }

  }
  
}

export default Notifications
    