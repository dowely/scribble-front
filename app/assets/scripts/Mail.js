import TopBarMail from './modules/top-bar/topBarMail'
import SliderBar from './modules/sub-menu/sliderBar'
import ViewerReloader from './base/viewerReloader'
import ViewerSwitcher from './base/viewerSwitcher'
import MailList from './modules/mail/mailList'
import MailRead from './modules/mail/mailRead'
import MailWrite from './modules/mail/mailWrite'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/mail', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const viewerReloader = new ViewerReloader()
const viewerSwitcher = new ViewerSwitcher()
const topBarMail = new TopBarMail(onTopBarMail)
const sliderBar = new SliderBar(onSliderBar)
const mailList = new MailList(sliderBar.index, onMailList)
const mailRead = new MailRead(onMailRead)
const mailWrite = new MailWrite(onMailWrite)

const content = document.querySelector('.content')
const rightCol = document.querySelector('.content__right-col')

function viewState() {

  let oneColumn = getComputedStyle(content).getPropertyValue('grid-template-columns').indexOf(' ') == -1 ? true : false

  if(oneColumn) {

    let rightColvisible = getComputedStyle(rightCol).getPropertyValue('z-index') == '3' ? true : false

    console.log(rightColvisible)

    if(rightColvisible) {

      return 'oneCol.right'

    } else {

      return 'oneCol.left'
    }
  } else {

    let rightColEmpty = rightCol.querySelector('.content__viewer').innerHTML == '' ? true : false

    if(rightColEmpty) {

      return 'twoCol.empty'

    } else {

      return 'twoCol.notEmpty'
    }
  }
}

function onTopBarMail(event) {

  switch(viewState()) {

    case 'oneCol.right':

      break

    case 'oneCol.left':

      if(event.newMail) {

        mailWrite.load()
        viewerSwitcher.switch('right')
      }
      break
    
    case 'twoCol.empty':

      if(event.newMail) {

        mailWrite.load()
        viewerSwitcher.fadeIn('right')
        viewerSwitcher.fadeOut('left')
      }

      break

    case 'twoCol.notEmpty':

      break

    default:
      console.log('onTopBarMail func exception')
  }

}

function onSliderBar(event) {

  if(event.index) {
    
    viewerReloader.reload('left', event.index)
  }
}

async function onMailList(event) {
  
  switch(viewState()) {

    case 'oneCol.left':

      if(event.read) mailRead.load(event.read)
      viewerSwitcher.switch('right')

      break

    case 'twoCol.empty':

      if(event.read) mailRead.load(event.read)
      viewerSwitcher.fadeIn('right')
      viewerSwitcher.fadeOut('left')

      break

    case 'twoCol.notEmpty':

      if(event.read) {

        await viewerSwitcher.fadeOut('right')
        mailRead.load(event.read)
        viewerSwitcher.fadeIn('right')
      }

      break

    default:
      console.log('Failed to establish the view state')
  }


  //if one col
  //  if left visible
  //    mailRead.load, viewerSwitcher.switch
  //  if right visible
  //    viewerSwitcher.fadeout(rightcol), mailRead.load, ...fadeIn
  // or two cols
  //  if right is empty
  //    mailRead.load, viewerSwitcher.fadeIn
  //  if right is not empty
  //    fadeOut(rigthcol), mailRead.load, fadeIn(rightcol)

}

async function onMailRead(event) {

  switch(viewState()) {

    case 'oneCol.right':

      await viewerSwitcher.switch('left')
      mailRead.clear()

      break

    case 'twoCol.notEmpty':

      await viewerSwitcher.switch('left')
      mailRead.clear()

      break

    default:
      console.log('onMailRead func exception')
  }
}

function onMailWrite() {

}