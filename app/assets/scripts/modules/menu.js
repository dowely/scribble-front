import menuTemplate from '/app/assets/templates/modules/menu.ejs'

class Menu {
  constructor(subMenu) {
    this.hook = document.querySelector('.layout__menu-container')
    this.subMenu = subMenu
  }

  mail() {
    this.hook.innerHTML = menuTemplate({route: 'mail'})
    this.subMenu.mail()
  }
}

export default Menu