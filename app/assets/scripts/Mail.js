import SliderBar from './modules/sub-menu/sliderBar'
import ViewerReloader from './base/viewerReloader'
import MailList from './modules/mail/mailList'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('../icons/mail', true, /\.svg$/))

if(module.hot) {
  module.hot.accept()
}

const viewerReloader = new ViewerReloader()

const sliderBar = new SliderBar(onSliderBar)

const mailList = new MailList(sliderBar.index)

function onSliderBar(state) {

  if(state.index) {
    
    viewerReloader.reload('left', state.index)
  }
}