import Slider from './_slider'
import MailNotifier from '../mail/_mailNotifier'

class SliderBar {
  constructor(route) {
    this.route = route
    this.slider = new Slider(route)

    this.hook
    this.index
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = `
      <div class="slider-bar">
        <div class="slider-bar__notifier"></div>
        <div class="slider-bar__slider"></div>
      </div>
    `

    this.index = this.slider.render(this.hook.querySelector('.slider-bar__slider'))

    if(this.route == 'mail') {
      this.mailNotifier = new MailNotifier(45)

      this.mailNotifier.render(this.hook.querySelector('.slider-bar__notifier'))
    }
  }
}

export default SliderBar