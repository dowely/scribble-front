import LocalItemModel from './modules/organizer/localItemModel.js'
import Views from './modules/organizer/views.js'
import Notifications from './modules/organizer/notifications'
import Search from './modules/organizer/search'
import Calendar from './modules/organizer/celendar.js'
import ItemCard from './modules/organizer/itemCard.js'
import BottomNavigation from './modules/organizer/bottomNav.js'
import ee from 'event-emitter'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/organizer', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

ee(BottomNavigation.prototype)

const bottomNav = new BottomNavigation()
const views = new Views(bottomNav)
const localItemModel = new LocalItemModel()

new Notifications(views)
new Search(views)
new Calendar(views, localItemModel)
new ItemCard(views, localItemModel)

bottomNav.on('newItem', type => {

  console.log('create new ', type);
})

bottomNav.on('selectItems', type => {

  console.log(type, 'items selected')
})