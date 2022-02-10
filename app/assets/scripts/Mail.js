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

async function onTopBarMail(event) {

  switch(viewState()) {

    case 'oneCol.right':

      if(event.newMail) {

        await topBarMail.collapse()
        await viewerSwitcher.fadeOut('right')
        mailWrite.clear()
        mailWrite.load()
        viewerSwitcher.fadeIn('right')
      }
      break

    case 'oneCol.left':

      if(event.newMail) {

        await topBarMail.collapse()
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

      if(event.newMail) {

        await viewerSwitcher.fadeOut('right')
        mailWrite.clear()
        mailWrite.load()
        viewerSwitcher.fadeIn('right')
      }

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

      if(event.read) {

        mailRead.load(event.read)
        viewerSwitcher.switch('right')
      }

      if(event.write) {

        await topBarMail.collapse()
        mailWrite.load(event.write, true)
        viewerSwitcher.switch('right')
      }

      break

    case 'twoCol.empty':

      if(event.read) {

        mailRead.load(event.read)
        viewerSwitcher.fadeIn('right')
        viewerSwitcher.fadeOut('left')
      }

      if(event.write) {

        mailWrite.load(event.write, true)
        viewerSwitcher.switch('right')
      }
      break

    case 'twoCol.notEmpty':

      if(event.read) {

        await viewerSwitcher.fadeOut('right')
        mailWrite.clear()
        mailRead.load(event.read)
        viewerSwitcher.fadeIn('right')
      }

      if(event.write) {

        await viewerSwitcher.fadeOut('right')
        mailWrite.load(event.write, true)
        viewerSwitcher.fadeIn('right')
      }
      break

    default:
      console.log('Failed to establish the view state')
  }
}

async function onMailRead(event) {

  switch(viewState()) {

    case 'oneCol.right':
    case 'twoCol.notEmpty':

      if(event.close) {

        await viewerSwitcher.switch('left')
        mailRead.clear()
      }

      if(event.reply) {
        
        await topBarMail.collapse()
        await viewerSwitcher.fadeOut('right')
        mailWrite.load(event.reply)
        viewerSwitcher.fadeIn('right')
      }

      if(event.replyAll) {

        await topBarMail.collapse()
        await viewerSwitcher.fadeOut('right')
        mailWrite.load(event.replyAll, true)
        viewerSwitcher.fadeIn('right')
      }

      if(event.forward) {

        await topBarMail.collapse()
        await viewerSwitcher.fadeOut('right')
        mailWrite.load(event.forward, false, true)
        viewerSwitcher.fadeIn('right')
      }

      if(event.delete) {

        mailList.delete(event.delete)
        await viewerSwitcher.switch('left')
        mailRead.clear()

      }

      break

    default:
      console.log('onMailRead func exception')
  }
}

async function onMailWrite() {

  switch(viewState()) {

    case 'oneCol.right':
    case 'twoCol.notEmpty':

      await viewerSwitcher.switch('left')
      mailWrite.clear()

      break

    default:
      console.log('onMailWrite func exception')
  }

}