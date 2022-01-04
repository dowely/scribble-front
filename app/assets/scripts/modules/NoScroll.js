import throttle from 'lodash/throttle'

let vh = innerHeight * 0.01

document.documentElement.style.setProperty('--vh', `${vh}px`)

addEventListener('resize', throttle(() => {
  vh = innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}, 200))