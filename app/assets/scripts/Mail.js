import SliderBar from './modules/sub-menu/sliderBar'
import ViewerReloader from './base/viewerReloader'
import ViewerSwitcher from './base/viewerSwitcher'
import MailList from './modules/mail/mailList'
import MailRead from './modules/mail/mailRead'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/mail', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const viewerReloader = new ViewerReloader()

const viewerSwitcher = new ViewerSwitcher()

const sliderBar = new SliderBar(onSliderBar)

const mailList = new MailList(sliderBar.index, onMailList)

const mailRead = new MailRead(onMailRead)

function onSliderBar(event) {

  if(event.index) {
    
    viewerReloader.reload('left', event.index)
  }
}

function onMailList(event) {

  if(event.read) mailRead.load(event.read)

  viewerSwitcher.switch('right')
}

function onMailRead(event) {

  viewerSwitcher.switch('left')

}