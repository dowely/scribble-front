import pool from './pool'

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

    pool.load(localItemModel)

    pool.add(localItemModel)

    this.events()
    console.log(pool.notifications);
  }

  events() {

    this.bells.forEach(bell => {

      bell.addEventListener('click', e => {

        e.stopPropagation()

        
      })
    })
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