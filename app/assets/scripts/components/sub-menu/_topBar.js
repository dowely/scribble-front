import topBarTemplate from '/app/assets/templates/components/sub-menu/_top-bar.ejs'
import MailNotifier from '../mail/_mailNotifier'

class TopBar {
  constructor(route) {
    this.route = route
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = topBarTemplate({route: this.route})

    if(this.route == 'mail') {
      this.mailNotifier = new MailNotifier(3)

      this.mailNotifier.render(this.hook.querySelector('.top-bar__tool-2'))
    }
  }
}

export default TopBar