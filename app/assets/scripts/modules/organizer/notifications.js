class Notifications {

  bells = []

  constructor(views) {

    this.views = views

    this.bells.push(document.querySelector('.top-bar-organizer__notifier-tap-area'))

    this.bells.push(document.querySelector('.slider-bar__notifier-tap-area'))

    this.bells.push(document.querySelector('.notifications__notifier-tap-area'))

    this.events()
  }

  events() {

    this.bells.forEach(bell => {

      bell.addEventListener('click', e => {

        e.stopPropagation()

        this.toggle()
      })
    })
  }

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
}

export default Notifications