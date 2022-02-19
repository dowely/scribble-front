import SliderBar from './modules/sub-menu/sliderBar'
import ViewController from './base/viewController'
import ChatRooms from './modules/chat/chatRooms'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/chat', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const subMenu = document.querySelector('.sub-menu-chat')
const chatContainers = document.querySelectorAll('.content__viewer--chat > div')

const sliderBar = new SliderBar(onSliderBar)

let index = sliderBar.index

const viewController = new ViewController()

const chatRooms = new ChatRooms()

if(index == '1') {
  chatContainers[0].style.display = 'block'
} else {
  chatContainers[1].style.display = 'block'
}

async function onSliderBar(event) {

  if(event.index === '1') {

    if(index !== '1') {

      index = event.index

      subMenu.classList.remove('sub-menu-chat--expanded')

      await viewController.render(1)

      chatRooms.clear()
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

      await chatRooms.deflate()
      chatRooms.clear()
      chatRooms.inject('group')
      setTimeout(() => chatRooms.inflate(), 20)
    }

  } else {

    if(index === '1') {

      index = event.index

      subMenu.classList.add('sub-menu-chat--expanded')

      chatRooms.inject('priv')
      chatRooms.inflate()

      viewController.render(2)

    } else if(index === '2') {

      index = event.index

      await chatRooms.deflate()
      chatRooms.clear()
      chatRooms.inject('priv')
      setTimeout(() => chatRooms.inflate(), 20)
    }
  }
}