import topBarTemplate from '/app/assets/templates/components/sub-menu/_top-bar.ejs'
import MailNotifier from '../mail/_mailNotifier'

class TopBar {
  constructor() {
    this.hook = document.querySelector('.layout__control--a .layout__control__inner')

    this.mailNotifier = new MailNotifier()
  }

  mail() {
    this.hook.innerHTML = topBarTemplate({route: 'mail'})

    this.mailNotifier.render(this.hook.querySelector('.top-bar__tool-2'), 3)
  }
}

export default TopBar