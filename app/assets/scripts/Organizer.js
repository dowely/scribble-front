import LocalItemModel from './modules/organizer/localItemModel.js'
import Views from './modules/organizer/views.js'
import Notifications from './modules/organizer/notifications'
import Search from './modules/organizer/search'
import Calendar from './modules/organizer/celendar.js'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/organizer', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const views = new Views()
const localItemModel = new LocalItemModel()

new Notifications(views)
new Search(views)
new Calendar(views, localItemModel)

