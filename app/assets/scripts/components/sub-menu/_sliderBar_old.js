import Slider from './_slider'
import MailNotifier from '../mail/_mailNotifier'

class SliderBar {
  constructor(route, callback) {
    this.route = route
    this.callback = callback

    this.slider = new Slider(route, this.onSlider.bind(this))

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

  onSlider(index) {
    this.index = index
    this.callback({index: this.index})
  }
}

export default SliderBar