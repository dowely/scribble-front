import '../styles/styles.css'
import './base/noScroll'
import Menu from './modules/menu'
import Mail from './modules/mail'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/app', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const user = 'John Schaffer'

const menu = new Menu('mail', onRoute)

const routes = {
  mail: new Mail(user)
}

routes[menu.route].render()

function onRoute(route) {
  routes[route].render()
}