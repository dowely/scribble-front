import sliderTemplate from '/app/assets/templates/components/sub-menu/_slider.ejs'

class Slider {
  constructor(route) {
   this.route = route
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = sliderTemplate({route: this.route})
    
    this.component = this.hook.querySelector('.slider')

    this.readIndex()

    return this.index
  }

  readIndex() {
    if(this.component.classList.contains('slider--1')) {
      this.index = 1
    } else if (this.component.classList.contains('slider--2')) {
      this.index = 2
    } else {
      this.index = 3
    }
  }
}

export default Slider