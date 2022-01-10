import '../styles/styles.css'
import './modules/NoScroll'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/main', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}