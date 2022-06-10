import debounce from 'lodash/debounce'

class Glass {

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

  state = {
    colOnTop: 'left',
    twoCols: undefined
  }

  constructor() {

    this.state.twoCols = this.signalTwoColumns()

    this.events()
  }

  signalTwoColumns() {

    return getComputedStyle(this.content).getPropertyValue('grid-template-columns').indexOf(' ') !== -1
  }

  events() {

    addEventListener('resize', debounce(() => {

      this.state.twoCols = this.signalTwoColumns()

    }, 500).bind(this))

  }

  async render(target, node) {

    const fadeOut = async function(that) {
      
      await that.fadeOut(that.state.colOnTop)
    }

    const content = async function(that) {

      that.viewers[target].innerHTML = ''

      that.viewers[target].appendChild(node)
    }

    const fadeIn = async function(that) {

      that.fadeIn(target)
    }

    const sequence = []

    if(!this.state.twoCols || target !== 'central') {

      sequence.push(fadeOut)
    } 

    sequence.push(content)

    sequence.push(fadeIn)

    let step = 0

    do{

      await sequence[step](this)

      step++

    } while(step < sequence.length)

    this.state.colOnTop = target

  }

  fadeOut(col) {
    return new Promise(res => {

      this.columns[col].ontransitionend = res
      
      setTimeout(() => {

        this.columns[col].ontransitioncancel = res

      }, 20)

      if(col === 'left') {
        this.columns[col].classList.add('content__left-col--hidden')
      }

      if(col === 'central') {
        this.columns.central.classList.remove('content__central-col--visible')
      }

    })
  }

  fadeIn(col) {

    if(col === 'left') {
      this.columns[col].classList.remove('content__left-col--hidden')
    }

    if(col === 'central') {
      this.columns[col].classList.add('content__central-col--visible')
    }

  }
}

export default new Glass()