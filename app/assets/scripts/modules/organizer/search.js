class Search {

  ellipsis = document.querySelector('.top-bar-organizer__ellipsis-tap-area')

  constructor(views) {

    this.views = views

    this.events()
  }

  events() {

    this.ellipsis.addEventListener('click', async () => {

      this.views.search()

      if(this.views.viewState.colOnTop === 'left') {

        await this.views.fadeOut('left')

        this.views.viewers.right.innerHTML = 'foo'

        this.views.fadeIn('right')

        this.views.viewState.colOnTop = 'right'

      } else {

        if(this.views.viewState.subMenu === 'search') {

          

        } else {

          await this.views.fadeOut('right')

          this.views.viewers.right.innerHTML = ''

          // this.emit('rightEmpty')

          this.views.columns.left.dataset.index = this.views.viewState.leftColIndex

          this.views.fadeIn('left')

          this.views.viewState.colOnTop = 'left'

        }

      }
    })
  }
}

export default Search