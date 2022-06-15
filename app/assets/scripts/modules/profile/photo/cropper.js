import ee from 'event-emitter'

class Cropper {

  zoomUnit = 0.05

  transformations

  container

  pointerMoveHandler

  canvas

  constructor(container) {

    this.container = container

    this.canvas = this.container.parentElement.querySelector('canvas#profile__photo__source') 

    this.transformations = new Map()

    this.reset()

    this.events()

  }

  reset() {

    this.transformations.set('zoom', 1)
    this.transformations.set('offsetX', 0)
    this.transformations.set('offsetY', 0)

  }

  events() {

    this.container.addEventListener('wheel', e => {

      let zoom = this.transformations.get('zoom')

      zoom *= 1 + Math.sign(e.deltaY) * this.zoomUnit

      if(zoom > 0.4 && zoom < 4) {

        zoom =  Math.round(zoom * 100) / 100

        this.transformations.set('zoom', zoom)

        const transformations = {}

        for(const [key, value] of this.transformations) {

          transformations[key] = value
        }

        this.emit('transform', transformations)

      }

    }, {passive: true})

    this.container.addEventListener('pointerdown', e => {

      e.preventDefault()

      this.onPointerDown(e)

    })

    this.container.addEventListener('touchstart', e => {

      e.preventDefault()

      this.onTouchStart(e)

    })
  }

  onTouchStart(e) {

    const that = this

    let distance

    const onTouchMove = touchEvent => {

      const newDistance = Math.sqrt((touchEvent.touches[0].clientX - touchEvent.touches[1].clientX) ** 2 + (touchEvent.touches[0].clientY - touchEvent.touches[1].clientY) ** 2)

      if(Math.abs((newDistance - distance) / distance) > 0.025) {

        let zoom = this.transformations.get('zoom')

        zoom *= 1 + Math.sign(newDistance - distance) * 0.025

        if(zoom > 0.4 && zoom < 4) {

          zoom =  Math.round(zoom * 100) / 100
  
          this.transformations.set('zoom', zoom)
  
          const transformations = {}
  
          for(const [key, value] of this.transformations) {
  
            transformations[key] = value
          }
  
          this.emit('transform', transformations)

          distance = newDistance
  
        }

      }

    }

    const onTouchEnd = touchEvent => {

      if(touchEvent.touches.length === 1) {

        this.container.removeEventListener('touchmove', onTouchMove)

      }

    }

    if(e.touches.length > 1) {

      this.container.dispatchEvent(new Event('pointerleave'))

      distance = Math.sqrt((e.touches[0].clientX - e.touches[1].clientX) ** 2 + (e.touches[0].clientY - e.touches[1].clientY) ** 2)

      this.container.addEventListener('touchmove', onTouchMove)

      this.container.addEventListener('touchend', onTouchEnd)

    }

  }

  onPointerDown(e) {

    const that = this

    let prevX = e.offsetX
    let prevY = e.offsetY

    const onPointerMove = moveEvent => {

      if(
        moveEvent.pointerType === 'touch' && (
        moveEvent.offsetX < 0 + moveEvent.width / 2 ||
        moveEvent.offsetX > that.canvas.width - moveEvent.width / 2 ||
        moveEvent.offsetY < 0 + moveEvent.height / 2 ||
        moveEvent.offsetY > that.canvas.height - moveEvent.height / 2
        )
      ) {

        that.container.dispatchEvent(new Event('pointerleave'))

      }

      let offsetX = that.transformations.get('offsetX')
      let offsetY = that.transformations.get('offsetY')

      //offsetX += moveEvent.movementX
      //offsetY += moveEvent.movementY

      offsetX += moveEvent.offsetX - prevX
      offsetY += moveEvent.offsetY - prevY

      prevX = moveEvent.offsetX
      prevY = moveEvent.offsetY

      that.transformations.set('offsetX', offsetX)
      that.transformations.set('offsetY', offsetY)
      
      const transformations = {}

      for(const [key, value] of that.transformations) {

        transformations[key] = value
      }

      that.emit('transform', transformations)

    }

    const onPointerUp = () => {

      that.container.removeEventListener('pointermove', onPointerMove)

      that.container.removeEventListener('pointerleave', onPointerLeave)  

      that.container.classList.remove('profile-photo__canvas-container--pan')

    }

    const onPointerLeave = () => {

      that.container.removeEventListener('pointermove', onPointerMove)

      that.container.removeEventListener('pointerup', onPointerUp) 

      that.container.classList.remove('profile-photo__canvas-container--pan')

    }

    this.container.addEventListener('pointermove', onPointerMove)

    this.container.addEventListener('pointerup', onPointerUp, {once: true})

    this.container.addEventListener('pointerleave', onPointerLeave, {once: true})

    this.container.classList.add('profile-photo__canvas-container--pan')

  }

}

ee(Cropper.prototype)

export default Cropper