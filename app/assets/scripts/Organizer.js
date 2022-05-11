import LocalItemModel from './modules/organizer/localItemModel.js'
import Views from './modules/organizer/views.js'
import Notifications from './modules/organizer/notifications'
import Search from './modules/organizer/search'
import Calendar from './modules/organizer/celendar.js'
import ItemCard from './modules/organizer/itemCard.js'
import BottomNavigation from './modules/organizer/bottomNav.js'
import ee from 'event-emitter'
import Items from './modules/organizer/items.js'
import ItemRead from './modules/organizer/itemRead.js'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/organizer', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

ee(BottomNavigation.prototype)
ee(ItemCard.prototype)
ee(ItemRead.prototype)

const bottomNav = new BottomNavigation()
const itemCard = new ItemCard()
const itemRead = new ItemRead()

const views = new Views(bottomNav)
const localItemModel = new LocalItemModel()
const items = new Items(views, localItemModel)

new Notifications(views)
new Search(views)
new Calendar(views, localItemModel)

itemCard.events()

bottomNav.on('newItem', type => {

  console.log('create new ', type);
})

bottomNav.on('selectItems', type => {

  items.select(type)
})

itemCard.on('itemRead', cardId => {

  const item = localItemModel.getItemById(cardId)

  views.render('right', itemRead.createNode(item))
})

itemRead.on('close', () => {

  views.render('left')
})

itemRead.on('delete', itemId => {

  views.render('left')

  items.pop(itemId)
})