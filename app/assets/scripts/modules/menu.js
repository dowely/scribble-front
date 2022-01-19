import menuTemplate from '/app/assets/templates/menu.ejs'

class Menu {
  constructor(route, callback) {
    this.route = route
    this.callback = callback

    this.hook = document.querySelector('.layout__menu-container')
    this.hook.innerHTML = menuTemplate({route: this.route})
  }
}

export default Menu