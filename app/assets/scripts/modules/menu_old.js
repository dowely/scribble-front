class Menu {
  constructor(route, callback) {
    this.route = route
    this.callback = callback

    this.menu = document.querySelector('.menu')

    __CONNECTOR__.speak()

  }

  render() {
    this.highlightRoute()
  }

  highlightRoute() {
    
    let currentLi = this.menu.querySelector(`li[data-route="${this.route}"]`)

    currentLi.classList.add('menu__item--active')
  }

  fetchUserData() {

  }
}

export default Menu