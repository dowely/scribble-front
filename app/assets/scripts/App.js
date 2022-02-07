import '../styles/styles.css'
import './base/noScroll'
import MobileMenu from './modules/mobileMenu'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/app', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

new MobileMenu()