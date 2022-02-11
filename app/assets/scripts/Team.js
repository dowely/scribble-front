import TeamList from './modules/team/teamList'
import UserRead from './modules/team/userRead'
import ViewController from './base/viewController'

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