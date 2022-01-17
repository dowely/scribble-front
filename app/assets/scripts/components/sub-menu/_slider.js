import sliderTemplate from '/app/assets/templates/components/sub-menu/_slider.ejs'

class Slider {
  constructor(callback) {
   this.callback = callback
  }

  events() {
    this.sliderItems = this.component.querySelectorAll('.slider__item')
    
  }

  render(hook, route) {
    hook.innerHTML = sliderTemplate({route: route})
    this.component = hook.querySelector('.slider')
    this.events()
  }
}

export default Slider