class TopBarMail {
  constructor(callback) {
    this.callback = callback

    this.subMenu = document.querySelector('.sub-menu-mail')
    this.collapsingControls = document.querySelectorAll('.sub-menu-mail__control--reveal')

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

  async collapse() {
    return new Promise((resolve, reject) => {

      let collapseAnimations = []

      this.collapsingControls.forEach(control => {

        collapseAnimations.push(new Promise((res, rej) => {

          control.ontransitionend = res
          control.ontransitioncancel = rej
        }))
      })

      Promise.all(collapseAnimations)
        .then(resolve)
        .catch(reject)

      if(this.subMenu.classList.contains('sub-menu-mail--expanded') && !getComputedStyle(this.subMenu).getPropertyValue('grid-template-rows').includes('68px')) {
       
        this.subMenu.classList.remove('sub-menu-mail--expanded')

      } else resolve()

    })
  }
}

export default TopBarMail