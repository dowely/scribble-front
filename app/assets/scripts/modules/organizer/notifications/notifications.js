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

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

    this.events()

    pool.load(localItemModel)

    pool.add(localItemModel)

  }

  events() {

    this.bells.forEach(bell => {

      bell.addEventListener('click', e => {

        e.stopPropagation()

        this.toggle()
        
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

    pool.on('newCard', cardNode => {
      
      setTimeout(() => this.emit('newCard', cardNode), 1)
    }) 
  }

  async toggle() {

    const action = this.views.viewState.subMenu === 'notifications' ? 'close' : 'open'
    
    switch(action) {

      case 'open':

        navigator.init()

        display.init()

        this.views.notifications()

        await this.views.fadeOut('left', 'viewer')

        this.views.columns.left.dataset.index = '4'

        this.views.fadeIn('left', 'viewer')

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

/**

async toggle() {

    this.views.notifications()

      if(this.views.viewState.twoCols) {

      } else {

        if(this.views.viewState.colOnTop === 'left') {

          if(this.views.viewState.subMenu === 'notifications') {

            await this.views.fadeOut('left', 'viewer')

            this.views.columns.left.dataset.index = '4'

            this.views.fadeIn('left', 'viewer')

          } else {

            await this.views.fadeOut('left', 'viewer')

            this.views.columns.left.dataset.index = this.views.viewState.leftColIndex

            this.views.fadeIn('left', 'viewer')

          }

        } else {

          await this.views.fadeOut('right')

          this.views.viewers.right.innerHTML = ''

          // this.emit('rightEmpty')

          this.views.columns.left.dataset.index = '4'

          this.views.fadeIn('left')

          this.views.viewState.colOnTop = 'left'

        }
      }
  }

 */