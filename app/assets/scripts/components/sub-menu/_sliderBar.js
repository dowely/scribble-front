import sliderBarTemplate from '/app/assets/templates/components/sub-menu/_slider-bar.ejs'
import Slider from './_slider'
import MailNotifier from '../mail/_mailNotifier'

class SliderBar {
  constructor(route) {
    this.route = route
    this.slider = new Slider(route)

    this.index
  }

  render(hook) {
    hook.innerHTML = sliderBarTemplate()

    this.index = this.slider.render(hook.querySelector('.slider-bar__slider'))

    if(this.route == 'mail') {
      this.mailNotifier = new MailNotifier(45)

      this.mailNotifier.render(hook.querySelector('.slider-bar__notifier'))
    }
  }
}

export default SliderBar