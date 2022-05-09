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

  constructor() {

    this.viewState.leftColIndex = this.sliderBar.dataset.index

    this.viewState.twoCols = this.signalTwoColumns()

    this.events()
  }

  render(target, node) {

    function stepOne() {
      
    }

    function stepTwo() {
  
      stepOne()

    }

    function stepThree() {
      
      stepTwo()

    }

    stepThree()

    if(this.viewState.twoCols && this.viewState.leftColIndex === '1') {
      
      if(this.viewState.colOnTop === 'left') {

        if(target === 'right') {



        } else if(target === 'central') {



        } else {

          

        }

      } else if(this.viewState.colOnTop === 'right') {
        
        await this.fadeOut('right')

        this.dynamicContent(node)

        this.fadeIn('right')

      } else if(this.viewState.colOnTop === 'central') {


      }

    } else if(this.viewState.twoCols) {

      if(this.viewState.colOnTop === 'left') {


      } else if(this.viewState.colOnTop === 'right') {


      } else if(this.viewState.colOnTop === 'central') {


      }

    } else {

      if(this.viewState.colOnTop === 'left') {


      } else if(this.viewState.colOnTop === 'right') {


      } else if(this.viewState.colOnTop === 'central') {


      } 
    }
  }

  events() {

    this.sliderBar.addEventListener('click', async e => {

      const item = e.target.closest('.slider-bar__item')
      const index = item.dataset.index

      if(this.viewState.leftColIndex != index) {

        this.viewState.leftColIndex = this.sliderBar.dataset.index = index

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
    //restore right display
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
      }

    }
  }

  signalTwoColumns() {

    return getComputedStyle(this.content).getPropertyValue('grid-template-columns').indexOf(' ') !== -1
  }
}

export default Views