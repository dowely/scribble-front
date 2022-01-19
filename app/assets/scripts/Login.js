import '../styles/styles.css'
import './base/noScroll'
import EntryForm from './modules/entryForm'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/login', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

new EntryForm('signin')