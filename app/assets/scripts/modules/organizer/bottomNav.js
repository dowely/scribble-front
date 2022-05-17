class BottomNavigation {

  bottomNav = document.querySelector('.bottom-navigation')

  plus = document.querySelector('.bottom-navigation__plus-btn')

  selectors = {
    note: document.querySelector('.bottom-navigation__icons--pen'),
    task: document.querySelector('.bottom-navigation__icons--list-check'),
    event: document.querySelector('.bottom-navigation__icons--calendar'),
    meeting: document.querySelector('.bottom-navigation__icons--user-group')
  }

  constructor() {

    for(const selector in this.selectors) {

      this.selectors[selector].action = selector
    }

    this.lastSelected = 'note'

    this.events()

  }

  events() {

    this.plus.addEventListener('click', () => {

      if(this.bottomNav.dataset.selected) {

        this.emit('newItem', this.bottomNav.dataset.selected)

      } else {

        this.bottomNav.setAttribute('data-selected', '')

      }
    })

    for(const selector in this.selectors) {

      this.selectors[selector].addEventListener('click', () => {

        if(this.bottomNav.hasAttribute('data-selected')) {

          if(this.bottomNav.dataset.selected) {

            this.bottomNav.dataset.selected = selector

            this.lastSelected = selector

            this.emit('selectItems', selector)

          } else {

            this.bottomNav.dataset.selected = selector

            setTimeout(() => {

              this.emit('newItem', selector)

              this.reset()

            }, 200)
          }

        }
      })
    }
  }

  select() {

    this.bottomNav.dataset.selected = this.lastSelected
  }

  reset() {

    this.bottomNav.removeAttribute('data-selected')
  }
}

export default BottomNavigation