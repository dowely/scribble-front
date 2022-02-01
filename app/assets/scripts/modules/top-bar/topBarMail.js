class TopBarMail {
  constructor(callback) {
    this.callback = callback

    this.subMenu = document.querySelector('.sub-menu-mail')

    this.ellipsis = document.querySelector('.top-bar-mail__ellipsis-tap-area')
    this.plus = document.querySelector('.top-bar-mail__plus')

    this.events()
  }

  events() {

    this.ellipsis.addEventListener('click', () => {

      this.subMenu.classList.toggle('sub-menu-mail--expanded')
    })

    this.plus.addEventListener('click', () => {

      this.callback({newMail: true})
    })

  }
}

export default TopBarMail