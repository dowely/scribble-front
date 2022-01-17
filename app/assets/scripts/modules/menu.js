import menuTemplate from '/app/assets/templates/modules/menu.ejs'

class Menu {
  constructor(subMenu) {
    this.hook = document.querySelector('.layout__menu-container')
    this.subMenu = subMenu
  }

  render(route) {
    this.hook.innerHTML = menuTemplate({route: route})
    this.subMenu.render(route)
  }
}

export default Menu