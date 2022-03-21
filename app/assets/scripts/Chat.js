import SliderBar from './modules/sub-menu/sliderBar'
import ViewController from './base/viewController'
import ChatRooms from './modules/chat/chatRooms'
import NewChat from './modules/chat/newChat'
import Messages from './modules/chat/messages'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/chat', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const subMenu = document.querySelector('.sub-menu-chat')
const chatContainers = document.querySelectorAll('.content__viewer--chat > div')
const search = document.querySelector('#search-field__input')
const userItems = document.querySelectorAll('.chat-users__user-item')
const users = document.querySelectorAll('.chat-users')

const sliderBar = new SliderBar(onSliderBar)

let index = sliderBar.index

const viewController = new ViewController()

const newChat = new NewChat(onNewChat)

const chatRooms = new ChatRooms(newChat.reset.bind(newChat), Messages.scrollToBottom, Messages.events.bind(Messages))

if(index == '1') {
  chatContainers[0].style.display = 'flex'
} else {
  chatContainers[1].style.display = 'block'
}

search.addEventListener('keyup', filter)

function filter() {

  let count = 0

  userItems.forEach(item => {

    let name = item.querySelector('.chat-users__name').textContent
    let title = item.querySelector('.chat-users__title').textContent

    if(
      match(name) ||
      match(title)
    ) {
      item.style.display = 'flex'
      count++

    } else {

      item.style.display = 'none'
    }
    
    users.forEach(container => {

      container.lastElementChild.classList.remove('chat-users__no-match--pop')
    })
  })

  users.forEach(container => {

    if(count === 0) container.lastElementChild.classList.add('chat-users__no-match--pop')
  })
}

function match(userStr) {

  let input = search.value.toLowerCase()
  let str = userStr.toLowerCase()

  return str.indexOf(input) !== -1 ? true : false
}

async function onNewChat(userName) {
  
  let target = index === '2' ? 'group' : 'priv'

  let expand = await chatRooms.add(target, userName)

  if(!expand) newChat.toggleState()
}

async function onSliderBar(event) {

  if(event.index === '1') {

    if(index !== '1') {

      index = event.index

      subMenu.classList.remove('sub-menu-chat--expanded')

      await viewController.render(1)

      chatRooms.clear()
      newChat.reset()

      chatRooms.collapsed.group = true
      chatRooms.collapsed.priv = true
    }
  } else if(event.index === '2') {

    if(index === '1') {

      index = event.index

      subMenu.classList.add('sub-menu-chat--expanded')

      chatRooms.inject('group')
      chatRooms.inflate()

      viewController.render(2)

    } else if(index === '3') {
      
      index = event.index

      if(chatRooms.collapsed.priv) {

        await chatRooms.deflate()
        chatRooms.clear()
        newChat.reset()
        chatRooms.inject('group')
        setTimeout(() => chatRooms.inflate(), 20)

      } else {

        await viewController.fadeOut(2)
        chatRooms.clear()
        newChat.reset()
        chatRooms.inject('group')
        setTimeout(() => chatRooms.inflate(), 20)
        viewController.fadeIn(2)

        chatRooms.collapsed.priv = true
      }
    }

    Messages.events()

  } else {

    if(index === '1') {

      index = event.index

      subMenu.classList.add('sub-menu-chat--expanded')

      chatRooms.inject('priv')
      chatRooms.inflate()

      viewController.render(2)

    } else if(index === '2') {

      index = event.index

      if(chatRooms.collapsed.group) {

        await chatRooms.deflate()
        chatRooms.clear()
        newChat.reset()
        chatRooms.inject('priv')
        setTimeout(() => chatRooms.inflate(), 20)

      } else {

        await viewController.fadeOut(2)
        chatRooms.clear()
        newChat.reset()
        chatRooms.inject('priv')
        setTimeout(() => chatRooms.inflate(), 20)
        viewController.fadeIn(2)

        chatRooms.collapsed.group = true

      } 
    }

    Messages.events()
  }
}

Messages.events()
Messages.scrollToBottom()