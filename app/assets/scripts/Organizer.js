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
import CalendarDisplay from './modules/organizer/calendarDisplay.js'
import Form from './modules/organizer/form.js'

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
const calendar = new Calendar(views, localItemModel)

ee(CalendarDisplay.prototype)
const calendarDisplay = new CalendarDisplay(views, localItemModel)

ee(Form.prototype)
const form = new Form(views, localItemModel)

itemCard.events()

form.on('newItem', async item => {

  localItemModel.push(item)

  const itemsCards = items.update()

  itemCard.events(itemsCards)

  const calendarCards = calendarDisplay.update(item)

  itemCard.events(calendarCards)

  const updateIterator = calendar.updateItemGroups(item.date)

  await views.render(form.backTo)

  if(updateIterator) calendar.updateIterator()
})

form.on('discard', () => {

  views.render(form.backTo)
})

bottomNav.on('newItem', type => {

  form.backTo = views.viewState.colOnTop === 'central' ? form.backTo : views.viewState.colOnTop

  let selectedDate

  if(views.viewState.colOnTop === 'left' && views.viewState.leftColIndex === '1') {

    selectedDate = calendar.selectedDate ? calendar.selectedDate.dataset.id : calendar.today.date
  }

  views.render('central', form.createNode({type, selectedDate}))
})

bottomNav.on('selectItems', type => {

  items.select(type)
})

itemCard.on('itemRead', cardId => {

  const item = localItemModel.getItemById(cardId)

  views.render('right', itemRead.createNode(item))
})

itemCard.on('delete', cardId => {
  
  localItemModel.pop(cardId)

  items.pop(cardId)

  calendarDisplay.pop(cardId)

  if(itemRead.currentId == cardId) itemRead.emit('close')
})

itemRead.on('close', () => {

  views.render('left')
})

itemRead.on('delete', itemId => {

  views.render('left')

  localItemModel.pop(itemId)

  items.pop(itemId)

  calendarDisplay.pop(itemId)
})

calendarDisplay.on('emptyGroup', () => {

  calendar.updateItemGroups()

  calendar.selectDate()
})

calendarDisplay.on('updateIterator', date => {

  if(localItemModel.itemCountOn(date) < calendar.selectedItemGroups.index) calendar.selectedItemGroups.index--

  calendar.updateIterator()

})


/** view */

/** models */

/** controler */

  /** controler */
  /** controler */
  /** controler */

  /** events */

/** events */