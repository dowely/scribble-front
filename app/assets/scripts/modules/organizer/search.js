class Search {

  ellipsis = document.querySelector('.top-bar-organizer__ellipsis-tap-area')

  constructor(views) {

    this.views = views

    this.events()
  }

  events() {

    this.ellipsis.addEventListener('click', () => {

      this.views.search()
    })
  }
}

export default Search