import ee from 'event-emitter'
import pool from './pool'

class Navigator {

  index = document.querySelector('span.notifications__msg-index')

  count = document.querySelector('span.notifications__msg-count')

  prevBtn = document.querySelector('.notifications__arrow--left')
  
  nextBtn = document.querySelector('.notifications__arrow--right')

  constructor() {this.events()}

  events() {

    [this.prevBtn, this.nextBtn].forEach((btn, i) => {

      btn.addEventListener('pointerdown', () => pool.changeIndex(-1 + 2 * i))

    })

    pool.on('changed', change => {

      if(change === 'index') this.transition(this.index, pool.index + 1)

    })

  }

  transition(span, newText) {
    
    new Promise(res => {

      span.ontransitionend = res

      setTimeout(() => span.ontransitioncancel = res, 50)

      span.classList.add('notifications__msg-span--faded')

    }).then(() => {

      span.textContent = newText

      span.classList.remove('notifications__msg-span--faded')

    })
  }

  init() {

    this.count.textContent = pool.notifications.length

  }

}

ee(Navigator.prototype)

export default new Navigator()