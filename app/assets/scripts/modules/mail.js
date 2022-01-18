import TopBar from '../components/sub-menu/_topBar'
import SliderBar from '../components/sub-menu/_sliderBar'
import SearchField from '../components/sub-menu/_searchField'
import DateFilter from '../components/sub-menu/_dateFilter'

import MailList from '../components/mail/_mailList'

class Mail {
  constructor(user) {
    this.user = user
    this.topBar = new TopBar('mail')
    this.sliderBar = new SliderBar('mail')
    this.searchField = new SearchField('mail')
    this.dateFilter = new DateFilter()

    this.lists = [
      new MailList(this.user, 'inbox', this.onSingle),
      new MailList(this.user, 'sent', this.onSingle),
      new MailList(this.user, 'drafts', this.onSingle)
    ]
  }

  render() {
    this.topBar.render(document.querySelector('.layout__control--a .layout__control__inner'))

    this.sliderBar.render(document.querySelector('.layout__control--b .layout__control__inner'))

    this.searchField.render(document.querySelector('.layout__control--d .layout__control__inner'))

    this.dateFilter.render(document.querySelector('.layout__control--e .layout__control__inner'))

    this.lists[this.sliderBar.index - 1].render(document.querySelector('.layout__viewer--a .layout__viewer__inner'))
  }

  onSingle() {

  }
}

export default Mail