import debounce from 'lodash/debounce'

class Views {

  viewState = {
    subMenu: 'default', /* search, notifications */
    leftColIndex: 0, /* 1 - 3 */
    colOnTop: 'left', /* right, central */
    twoCols: undefined /* true, false */
  }

  sliderBar = document.querySelector('.slider-bar')

  subMenu = document.querySelector('.sub-menu-organizer')

  content = document.querySelector('.content')

  columns = {
    left: document.querySelector('.content__left-col'),
    right: document.querySelector('.content__right-col'),
    central: document.querySelector('.content__central-col')
  }

  viewers = {
    left: document.querySelector('.content__left-col .content__viewer'),
    right: document.querySelector('.content__right-col .content__viewer'),
    central: document.querySelector('.content__central-col .content__viewer'),
  }

  constructor(bottomNav) {

    this.bottomNav = bottomNav

    this.viewState.leftColIndex = this.sliderBar.dataset.index

    this.viewState.twoCols = this.signalTwoColumns()

    this.events()
  }

  async render(target, node) {

    const fadeOut = async function(that) {

      const veil = that.viewState.twoCols && that.viewState.colOnTop === 'left' && that.viewState.leftColIndex === '1' ? 'right' : that.viewState.colOnTop
      
      await that.fadeOut(veil)
    }

    const content = async function(that) {

      if(target === 'left') that.calendar()
      if(target === 'right') that.dynamicContent(node)
      if(target === 'central') that.formLoader(node)
    }

    const fadeIn = async function(that) {

      that.fadeIn(target)
    }

    const sequence = []

    if(

      !this.viewState.twoCols ||
      this.viewState.colOnTop !== 'left' ||
      this.viewState.leftColIndex === '1'

    ) sequence.push(fadeOut)

    sequence.push(content)

    sequence.push(fadeIn)

    let step = 0

    do{

      await sequence[step](this)

      step++

    } while(step < sequence.length)

    this.viewState.colOnTop = target

  }

  events() {

    this.sliderBar.addEventListener('click', async e => {

      const item = e.target.closest('.slider-bar__item')
      const index = item.dataset.index

      if(this.viewState.leftColIndex != index) {

        this.viewState.leftColIndex = this.sliderBar.dataset.index = index

        if(index === '3') this.bottomNav.select()
        else this.bottomNav.reset()

        if(index !== '1') this.columns.right.classList.remove('content__right-col--visible-on-large')

        await this.fadeOut('left', 'viewer')

        this.columns.left.dataset.index = index

        if(index === '1') this.columns.right.classList.add('content__right-col--visible-on-large')

        this.fadeIn('left', 'viewer')
      }
    })

    addEventListener('resize', debounce(() => {

      this.viewState.twoCols = this.signalTwoColumns()

    }, 500).bind(this))
  }

  notifications() {

    if(this.viewState.subMenu === 'search') {

      this.subMenu.className = 'sub-menu-organizer sub-menu-organizer--notifications'

      this.viewState.subMenu = 'notifications'

    } else if(this.viewState.subMenu === 'notifications') {

      this.subMenu.classList.remove('sub-menu-organizer--notifications')

      this.viewState.subMenu = 'default'

    } else {

      this.subMenu.classList.add('sub-menu-organizer--notifications')

      this.viewState.subMenu = 'notifications'

    }
  }

  search() {

    if(this.viewState.subMenu === 'notifications') {

      this.subMenu.className = 'sub-menu-organizer sub-menu-organizer--search'

      this.viewState.subMenu = 'search'

    } else if(this.viewState.subMenu === 'search') {

      this.subMenu.classList.remove('sub-menu-organizer--search')

      this.viewState.subMenu = 'default'

    } else {

      this.subMenu.classList.add('sub-menu-organizer--search')

      this.viewState.subMenu = 'search'

    }
  }

  dynamicContent(node) {

    this.viewers.right.firstElementChild.classList.add('calendar-display--flat')

    if(this.viewers.right.children[1]) {

      this.viewers.right.children[1].replaceWith(node)

    } else {

      this.viewers.right.appendChild(node)
    }
  }

  calendar() {

    if(this.viewers.right.children[1]) {

      this.viewers.right.children[1].remove()

      this.viewers.right.firstElementChild.classList.remove('calendar-display--flat')

      if(this.viewState.leftColIndex === '1') {

        this.columns.right.classList.add('content__right-col--visible-on-large')
      }
    }
  }

  formLoader(node) {

  }

  fadeOut(col, viewer) {
    return new Promise((res, rej) => {

      if(viewer) {

        this.viewers[col].ontransitionend = res

        setTimeout(() => {
          this.viewers[col].ontransitioncancel = () => rej()
        }, 20)

        this.viewers.left.classList.add('content__viewer--hidden')

      } else {

        this.columns[col].ontransitionend = res
        this.columns[col].ontransitioncancel = rej
  
        if(col === 'left') {
          this.columns[col].classList.add('content__left-col--hidden')
        }
  
        if(col === 'right') {
          this.columns[col].classList.remove('content__right-col--visible')

          this.columns[col].classList.remove('content__right-col--visible-on-large')
        }
      }
    })
  }

  fadeIn(col, viewer) {

    if(viewer) {

      this.viewers[col].classList.remove('content__viewer--hidden')

    } else {

      if(col === 'left') {
        this.columns[col].classList.remove('content__left-col--hidden')
      }
  
      if(col ==='right') {
        this.columns[col].classList.add('content__right-col--visible')
        this.columns['left'].classList.add('content__left-col--hidden')
      }

    }
  }

  signalTwoColumns() {

    return getComputedStyle(this.content).getPropertyValue('grid-template-columns').indexOf(' ') !== -1
  }
}

export default Views