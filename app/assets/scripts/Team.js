import TeamList from './modules/team/teamList'
import UserRead from './modules/team/userRead'
import ViewController from './base/viewController'
import {local as user} from './modules/profile/userModel/model'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/team', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

new TeamList(onTeamList)

const userRead = new UserRead()

const viewController = new ViewController()

async function onTeamList(userName) {

  await viewController.render('right', userRead.html(userName))

  let close = document.querySelector('.user-read__close__tap-area')

  close.addEventListener('click', () => {

    viewController.render('left')
  })
}

const avatar = document.querySelector('.sub-menu-team__my-profile__avatar img')

if(user.image) avatar.src = user.image

