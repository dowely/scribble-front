class ViewerSwitcher {
  constructor() {
    this.columns = {
      left: document.querySelector('.content__left-col'),
      right: document.querySelector('.content__right-col')
    }
    
  }

  async switch(column) {

    let was = column == 'right' ? 'left' : 'right'

    await this.fadeOut(was)

    this.fadeIn(column)
    
  }

  fadeOut(column) {
    return new Promise((res, rej) => {

      this.columns[column].ontransitionend = res
      this.columns[column].ontransitioncancel = rej

      if(column == 'left') {
        this.columns[column].classList.add('content__left-col--hidden')
      }

      if(column == 'right') {
        this.columns[column].classList.remove('content__right-col--visible')
      }
      
    })
  }

  fadeIn(column) {

    if(column == 'left') {
      this.columns[column].classList.remove('content__left-col--hidden')
    }

    if(column == 'right') {
      this.columns[column].classList.add('content__right-col--visible')
    }

  }
}

export default ViewerSwitcher