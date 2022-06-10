import './modules/profile/card/card'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/profile', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}