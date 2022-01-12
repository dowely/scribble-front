function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/mail', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}