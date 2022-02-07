class MobileMenu {
  constructor() {
    this.arrowToggle = document.querySelector('.top-bar-mail__back-tap-area')
    this.menuContainer = document.querySelector('.layout__menu-container')
    this.menu = document.querySelector('.menu')
    this.user = document.querySelector('.menu__user')
    this.menuItems = document.querySelectorAll('.menu__item')
    this.menuLinks = document.querySelectorAll('.menu__link, .menu__icon-link')
    this.notifiers = document.querySelectorAll('.menu__notifier--active')

    this.isAnimating = false

    this.events()
  }

  events() {

    this.arrowToggle.addEventListener('click', this.openMenu.bind(this))

    this.menuLinks.forEach(link => {

      link.addEventListener('click', e => {

        e.preventDefault()

        if(!this.isAnimating) {

          let route = e.target.closest('.menu__item')
          this.closeMenu(route)
        }
      })
    })
  }

  async openMenu() {

    this.isAnimating = true

    await this.expand()

    await this.fadeInUser()

    await this.animateLinks()

    await this.popNotifiers()

    this.isAnimating = false
  }

  async closeMenu(route) {

    let href = await this.fadeOutLinks(route)

    await this.rotate()

    setTimeout(() => location.href = href, 500)
  }

  expand() {
    return new Promise((res, rej) => {

      this.menuContainer.classList.add('layout__menu-container--on-top')

      this.menu.ontransitionend = res
      this.menu.ontransitioncancel = rej

      this.menu.classList.add('menu--expanded')
    })
  }

  fadeInUser() {
    return new Promise((res, rej) => {

      this.user.ontransitionend = () => {
        setTimeout(res, 100)
      }
      this.user.ontransitioncancel = rej

      this.user.classList.add('menu__user--visible')
    })
  }

  animateLinks() {
    return new Promise((resolve, reject) => {

      let lastLinks = this.menuItems[this.menuItems.length - 1].querySelectorAll('a')

      let transitions = []

      lastLinks.forEach(link => {

        transitions.push(new Promise((res, rej) => {

          link.ontransitionend = res
          link.ontransitioncancel = rej
        }))
      })

      Promise.all(transitions)
        .then(resolve)
        .catch(reject)

      this.menuItems.forEach((item, index) => {

        setTimeout(() => item.classList.add('menu__item--visible'), index * 50)
      })
    })
  }

  popNotifiers() {
    
    return new Promise((resolve, reject) => {

      let transitions = []

      this.notifiers.forEach(notifier => {
        
        
        transitions.push(new Promise((res, rej) => {

          notifier.ontransitionend = res
          notifier.onanimationcancel = rej
        }))
      })

      Promise.all(transitions)
        .then(resolve)
        .catch(reject)

      this.notifiers.forEach(notifier => {

        notifier.classList.add('menu__notifier--visible')
      })
    })
  }

  fadeOutLinks(menuItem) {
    return new Promise((resolve, reject) => {

      let itemsToFadeOut = [...this.menuItems].filter(item => item !== menuItem)

      let linksToFadeOut = itemsToFadeOut.map(item => [...item.querySelectorAll('a')]).flat()

      let notifiersToFadeOut = itemsToFadeOut.map(item => item.querySelector('.menu__notifier')).filter(notifier => notifier.classList.contains('menu__notifier--active'))

      let transitions = []

      linksToFadeOut.forEach(link => {

        transitions.push(new Promise((res, rej) => {

          link.ontransitionend = res
          link.ontransitioncancel = rej
        }))
      })

      notifiersToFadeOut.forEach(notifier => {

        transitions.push(new Promise((res, rej) => {

          notifier.ontransitionend = res
          notifier.ontransitioncancel = rej
        }))
      })

      let url = menuItem.firstElementChild.getAttribute('href')

      Promise.all(transitions)
        .then(() => resolve(url))
        .catch(reject)

      itemsToFadeOut.forEach(item => {

        item.classList.remove('menu__item--visible')
      })

      notifiersToFadeOut.forEach(notifier => {

        notifier.classList.remove('menu__notifier--visible')
      })
    })
  }

  rotate() {
    return new Promise((resolve, reject) => {

      this.menu.ontransitionend = resolve
      this.menu.ontransitioncancel = reject

      this.menu.classList.add('menu--rotated')
    })
  }
}

export default MobileMenu