import Views from './modules/organizer/views.js'
import Notifications from './modules/organizer/notifications'
import Search from './modules/organizer/search'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/organizer', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const views = new Views()

new Notifications(views)
new Search(views)