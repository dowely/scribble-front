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

function onSliderBar(event) {

  if(event.index === '1') {

    if(index !== '1') {

      index = event.index

      subMenu.classList.remove('sub-menu-chat--expanded')

      viewController.render(1)
    }
  } else if(event.index === '2') {

    if(index === '1') {

      index = event.index

      subMenu.classList.add('sub-menu-chat--expanded')

      chatRooms.inject('group')
      chatRooms.pop()

      viewController.render(2)

    } else if(index === '3') {

      index = event.index

      chatRooms.clear()

    }

  } else {

    if(index === '1') {

      index = event.index

      subMenu.classList.add('sub-menu-chat--expanded')

      chatRooms.inject('priv')

      viewController.render(2)

    } else if(index === '2') {

    }
  }
}