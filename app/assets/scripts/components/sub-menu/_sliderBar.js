import sliderBarTemplate from '/app/assets/templates/components/sub-menu/_slider-bar.ejs'
import Slider from './_slider'
import MailNotifier from '../mail/_mailNotifier'

class SliderBar {
  constructor() {
    this.slider = new Slider()
    this.mailNotifier = new MailNotifier()
  }

  render(hook, route) {
    hook.innerHTML = sliderBarTemplate()
    this.slider.render(hook.querySelector('.slider-bar__slider'), route)
    this.mailNotifier.render(hook.querySelector('.slider-bar__notifier'), 45)
  }
}

export default SliderBar