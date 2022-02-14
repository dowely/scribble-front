class ViewController {
  constructor() {
    this.content = document.querySelector('.content')
    this.columns = {
      left: document.querySelector('.content__left-col'),
      right: document.querySelector('.content__right-col')
    }
    this.viewers = {
      left: this.columns.left.querySelector('.content__viewer'),
      right: this.columns.right.querySelector('.content__viewer')
    }
  }

  async render(hook, html) {
    
    switch(this.viewState()) {

      case 'oneCol.left':

        if(hook == 'right') {

          this.viewers.right.innerHTML = html

          await this.fadeOut('left')

          this.fadeIn('right')
        }
      break

      case 'oneCol.right':

        if(hook == 'left') {

          await this.fadeOut('right')

          this.fadeIn('left')

          this.viewers.right.innerHTML = ''
        }

      break

      case 'twoCol.empty':

        if(hook == 'right') {

          this.viewers.right.innerHTML = html

          this.fadeIn('right')
        }      

      break

      case 'twoCol.notEmpty':

        if(hook == 'left') {

          await this.fadeOut('right')

          this.viewers.right.innerHTML = ''
        }

        if(hook == 'right') {

          await this.fadeOut('right')

          this.viewers.right.innerHTML = html

          this.fadeIn('right')
        }

      break

      default:
        console.log('Failed to establish the view state')
    }
  }

  fadeOut(hook) {
    return new Promise((res, rej) => {

      this.columns[hook].ontransitionend = res
      this.columns[hook].ontransitioncancel = rej

      if(hook == 'left') {
        this.columns[hook].classList.add('content__left-col--hidden')
      }

      if(hook == 'right') {
        this.columns[hook].classList.remove('content__right-col--visible')
      }
      
    })
  }

  fadeIn(hook) {

    if(hook == 'left') {
      this.columns[hook].classList.remove('content__left-col--hidden')
    }

    if(hook == 'right') {
      this.columns[hook].classList.add('content__right-col--visible')
    }

  }

  viewState() {

    let oneColumn = getComputedStyle(this.content).getPropertyValue('grid-template-columns').indexOf(' ') == -1 ? true : false
  
    if(oneColumn) {
  
      let rightColvisible = getComputedStyle(this.columns.right).getPropertyValue('z-index') == '3' ? true : false
  
      if(rightColvisible) {
  
        return 'oneCol.right'
  
      } else {
  
        return 'oneCol.left'
      }
    } else {
  
      let rightColEmpty = this.columns.right.querySelector('.content__viewer').innerHTML == '' ? true : false
  
      if(rightColEmpty) {
  
        return 'twoCol.empty'
  
      } else {
  
        return 'twoCol.notEmpty'
      }
    }
  }
}

export default ViewController