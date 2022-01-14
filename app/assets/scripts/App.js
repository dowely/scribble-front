import '../styles/styles.css'
import './base/noScroll'
import SubMenu from './modules/subMenu'
import Menu from './modules/menu'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/app', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

let viewerLeft
let viewerRight
let subMenu = new SubMenu()
let menu = new Menu(subMenu)

menu.mail()