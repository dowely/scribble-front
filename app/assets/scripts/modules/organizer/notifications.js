class Notifications {

  bell = document.querySelector('.top-bar-organizer__notifier-tap-area')

  constructor(views) {

    this.views = views

    this.events()
  }

  events() {

    this.bell.addEventListener('click', async () => {

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

        }
      }
    })
  }
}

export default Notifications