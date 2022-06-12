import profilePhotoTemplate from './profile-photo.ejs'
import defaultImage from '/app/assets/images/profile-default-450-300.png'
import debounce from 'lodash/debounce'

export default class Photo {

  node

  canvas

  ctx

  blob

  constructor() {

    const div = document.createElement('DIV')

    div.innerHTML = profilePhotoTemplate()

    this.node = div.querySelector('.profile-photo')

    this.canvas = div.querySelector('#profile__photo__source')

    this.canvas.setAttribute('width', this.calculateWidth())

    this.canvas.setAttribute('height', this.calculateWidth())

    this.ctx = this.canvas.getContext('2d')

    this.loadImage()

    this.events()

    return this.node

  }

  loadImage(transformations = {zoom: 1, offsetX: 0, offsetY: 0}) {

    const img = new Image()

    img.addEventListener('load', (e) => {

      const baselineParams = this.drawParams(e.currentTarget)

      const transformedParams = this.transform(baselineParams, transformations)

      //clearRect

      this.ctx.drawImage(img, ...transformedParams)

    })

    if(this.blob) {


    } else {

      img.src = defaultImage

    }

  }

  transform(params, transformations) {

    params[0] += transformations.offsetX + (params[2] * transformations.zoom - params[2]) / -2

    params[1] += transformations.offsetY + (params[3] * transformations.zoom - params[3]) / -2

    params[2] *= transformations.zoom
    params[3] *= transformations.zoom

    return params
  }

  drawParams(img) {

    const xScale = parseInt(this.canvas.getAttribute('width')) / img.width

    const yScale = parseInt(this.canvas.getAttribute('height')) / img.height

    const scale = Math.min(xScale, yScale)

    const xMargin = xScale === scale ? 0 : (xScale - scale) * img.width / 2

    const yMargin = yScale === scale ? 0 : (yScale - scale) * img.height / 2

    return [xMargin, yMargin, img.width * scale, img.height * scale]
  }

  events() {

    addEventListener('resize', debounce(() => {

      this.canvas.setAttribute('width', this.calculateWidth())

      this.canvas.setAttribute('height', this.calculateWidth())

    }, 500).bind(this))
  }

  calculateWidth() {

    let width

    const bodyWidth = parseInt(getComputedStyle(document.body).getPropertyValue('width').slice(0, -2))

    if(bodyWidth >= 1255) width = 440
    else if(bodyWidth >= 768) width = 500
    else if(bodyWidth >= 420) width = 400
    else width = bodyWidth - 20

    return width
  }

}