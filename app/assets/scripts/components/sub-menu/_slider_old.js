import sliderTemplate from '/app/assets/templates/sub-menu/_slider.ejs'

class Slider {
  constructor(route, callback) {
   this.route = route
   this.callback = callback

   this.hook
   this.component
   this.index
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = sliderTemplate({route: this.route})
    
    this.component = this.hook.querySelector('.slider')

    this.readIndex()
    this.events()

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

  events() {
    this.component.addEventListener('click', event => {

      let element = event.target.classList.contains('slider__item') ? event.target : event.target.parentElement

      this.index = Number(element.dataset.index)
      this.updateModyfierClass()
      this.callback(this.index)
    })
  }

  updateModyfierClass() {
    for(let i = 1; i <= 3; i++) {
      this.component.classList.remove(`slider--${i}`)
    }
    this.component.classList.add(`slider--${this.index}`)
  }
}

export default Slider