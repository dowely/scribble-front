import '../styles/styles.css'
import './base/noScroll'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/app', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}