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
const calendar = new Calendar(views, localItemModel, itemCard)

ee(CalendarDisplay.prototype)
const calendarDisplay = new CalendarDisplay(views, localItemModel)

ee(Form.prototype)
const form = new Form(views, localItemModel)

itemCard.events()

form.on('newItem', async item => {

  localItemModel.push(item)

  const itemsCards = items.update()

  itemCard.events(itemsCards)

  let updateIterator

  if(Form.isItemInDisplayedMonth(item, calendar.displayedMonth)) {

    const calendarCards = calendarDisplay.update(item)

    itemCard.events(calendarCards)

    updateIterator = calendar.updateItemGroups(item.date)

  }

  await views.render(form.backTo)

  if(updateIterator) calendar.updateIterator()

})

form.on('edit', async item => {

  localItemModel.edit(item)

  const itemsCards = items.update()

  itemCard.events(itemsCards)

  if(item.sameDate) {

    const calendarCards = calendarDisplay.edit(item)

    itemCard.events(calendarCards)

  } else {

     //const displayedDateContainer = document.querySelector('.calendar-card__date-container--selected') || document.querySelector('.calendar-card__date-container--today')

    //const displayedDate = displayedDateContainer ?  displayedDateContainer.dataset.id : localItemModel.simpleDate(calendar.today.date)

    await calendarDisplay.pop(item.id)//, item.date === displayedDate

    if(Form.isItemInDisplayedMonth(item, calendar.displayedMonth)) {

      const calendarCards = calendarDisplay.update(item)
  
      itemCard.events(calendarCards)
  
      calendar.updateItemGroups()
  
    }

  } 

  views.render(form.backTo)  

})

form.on('discard', () => {

  views.render(form.backTo)
})

bottomNav.on('newItem', type => {

  form.backTo = views.viewState.colOnTop === 'central' ? form.backTo : views.viewState.colOnTop

  form.mode = 'newItem'

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

itemCard.on('edit', cardId => {

  form.backTo = views.viewState.colOnTop === 'central' ? form.backTo : views.viewState.colOnTop

  form.mode = 'edit'

  const item = localItemModel.getItemById(cardId)

  views.render('central', form.createNode({type: item.type, item}))

})

itemRead.on('close', () => {

  views.render('left')
})

itemRead.on('delete', itemId => {

  localItemModel.pop(itemId)

  items.pop(itemId)

  calendarDisplay.pop(itemId)

  views.render('left')
})

calendarDisplay.on('emptyGroup', () => {

  calendar.updateItemGroups()

  calendar.selectDate()
})

calendarDisplay.on('updateIterator', date => {

  if(localItemModel.itemCountOn(date) < calendar.selectedItemGroups.index) calendar.selectedItemGroups.index--

  calendar.updateIterator()

})

/** Route/Controller */

  /** view */

  /** models */

  /** module */
  /** module */

    /** sub module */
    /** sub module */

    /** events */

  /** module */

  /** events */

  /** scripts folders
   * 
   * global
   * views
   * models
   * controllers
   * modules
   * 
   */