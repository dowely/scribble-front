import SliderBar from './modules/sub-menu/sliderBar'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/chat', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const subMenu = document.querySelector('.sub-menu-chat')

new SliderBar(onSliderBar)

function onSliderBar(event) {

  if(event.index == 2 || event.index == 3) {
    subMenu.classList.add('sub-menu-chat--expanded')
  } else {
    subMenu.classList.remove('sub-menu-chat--expanded')
  }

}