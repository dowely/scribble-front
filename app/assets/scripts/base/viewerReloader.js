class ViewerReloader {
  constructor() {
    this.viewers = {
      left: document.querySelector('.content__left-col .content__viewer'),
      right: document.querySelector('.content__right-col .content__viewer')
    }
  }

  async reload(viewer, newContent) {

    let contents = this.viewers[viewer].children
    
    let oldBox, newBox

    for(const box of contents) {
      
      if(box.style.display == 'block') oldBox = box
      if(box.dataset.box == newContent) newBox = box

    }

    try {

      await this.fadeOut(this.viewers[viewer])

    } catch (err) {

      return

    }

    this.switchContent(oldBox, newBox)

    this.fadeIn(this.viewers[viewer])

  }

  fadeOut(viewer) {
    return new Promise((res, rej) => {

      viewer.ontransitionend = () => res()

      setTimeout(() => {
        viewer.ontransitioncancel = () => rej()
      }, 20)

      viewer.classList.add('content__viewer--hidden')

    })
  }

  fadeIn(viewer) {
    viewer.classList.remove('content__viewer--hidden')
  }

  switchContent(oldBox, newBox) {

    oldBox.style.display = 'none'
    newBox.style.display = 'block'
  }
}

export default ViewerReloader