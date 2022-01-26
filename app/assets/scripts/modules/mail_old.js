import TopBar from '../components/sub-menu/_topBar'
import SliderBar from '../components/sub-menu/_sliderBar'
import SearchField from '../components/sub-menu/_searchField'
import DateFilter from '../components/sub-menu/_dateFilter'

import MailList from '../components/mail/_mailList'
import MailRead from '../components/mail/_mailRead'

function importSprites(r) {
  r.keys().forEach(r)
}

importSprites(require.context('/app/assets/icons/mail', true, /\.svg$/))

class Mail {
  constructor(user) {
    this.user = user
    this.topBar = new TopBar('mail')
    this.sliderBar = new SliderBar('mail', this.onSliderBar.bind(this))
    this.searchField = new SearchField('mail')
    this.dateFilter = new DateFilter()

    this.lists = [
      new MailList(this.user, 'inbox', this.onList.bind(this)),
      new MailList(this.user, 'sent', this.onList.bind(this)),
      new MailList(this.user, 'drafts', this.onList.bind(this))
    ]

    this.viewerB = document.querySelector('.layout__viewer--b')
  }

  render() {
    this.topBar.render(document.querySelector('.layout__control--a .layout__control__inner'))

    this.sliderBar.render(document.querySelector('.layout__control--b .layout__control__inner'))

    this.searchField.render(document.querySelector('.layout__control--d .layout__control__inner'))

    this.dateFilter.render(document.querySelector('.layout__control--e .layout__control__inner'))

    this.lists[this.sliderBar.index - 1].render(document.querySelector('.layout__viewer--a .layout__viewer__inner'))
  }

  rightColTop() {
    
    this.viewerB.classList.add('layout__right-col--top')
  }

  onList(action) {

    if(action.mailToView) {

      this.reader = new MailRead(action.mailToView, this.user, action.box)

      this.reader.render(document.querySelector('.layout__viewer--b .layout__viewer__inner'))

      this.rightColTop()

    } else if(action.mailToDelete) {

      console.log('delete ', action.mailToDelete)
    }
  }

  onSliderBar(newState) {
    if(newState.index) this.lists[this.sliderBar.index - 1].render(document.querySelector('.layout__viewer--a .layout__viewer__inner'))
  }
}

export default Mail