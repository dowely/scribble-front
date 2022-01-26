class SliderBar {
  constructor(callback) {
    this.callback = callback
    this.sliderBar = document.querySelector('.slider-bar')
    this.slider = document.querySelector('.slider-bar__slider')
    
    this.index = this.sliderBar.dataset.index

    this.events()
  }

  events() {

    this.slider.addEventListener('click', this.onToggle.bind(this))
  }

  onToggle(e) {

    let item = e.target.closest('.slider-bar__item')

    if(this.index != item.dataset.index) {

      this.index = item.dataset.index

      this.sliderBar.dataset.index = this.index
    
      this.callback({index: this.index})

    }
  }
}

export default SliderBar