import topBarTemplate from '/app/assets/templates/components/sub-menu/_top-bar.ejs'

class TopBar {
  constructor() {
    this.hook = document.querySelector('.layout__control--a .layout__control__inner')
  }

  mail() {
    this.hook.innerHTML = topBarTemplate({route: 'mail'})
  }
}

export default TopBar