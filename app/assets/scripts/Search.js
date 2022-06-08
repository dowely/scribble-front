function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/search', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}