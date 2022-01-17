import '../styles/styles.css'
import './base/noScroll'
import SubMenu from './modules/subMenu'
import Menu from './modules/menu'
import Viewer from './modules/viewer'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/app', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

let viewerLeft = new Viewer(document.querySelector('.layout__viewer--a .layout__viewer__inner'))
let viewerRight = new Viewer(document.querySelector('.layout__viewer--b .layout__viewer__inner'))
let subMenu = new SubMenu(viewerLeft, viewerRight)
let menu = new Menu(subMenu)

menu.render('mail')