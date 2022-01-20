import data from '/app/db/mails.json'
import MailCard from './_mailCard'

class MailList {
  constructor(user, box, callback) {
    this.user = user
    this.box = box
    this.callback = callback

    if(this.box == 'inbox') {

      this.mails = data.filter(mail => {
        if(mail.to.find(name => name == this.user)) return true
      })

    } else if(this.box == 'sent') {

      this.mails = data.filter(mail => mail.from == this.user).filter(mail => mail.sendTime != '')

    } else {

      this.mails = data.filter(mail => mail.from == this.user).filter(mail => mail.sendTime == '')

    }

    this.mails.sort((first, second) => new Date(second.sendTime) - new Date(first.sendTime))

    this.mailCards = this.mails.map(mail => {
      return new MailCard(mail, this.user, this.box)
    })
  }

  render(hook) {
    this.hook = hook

    this.hook.innerHTML = `
      <ul class="mail-list">
        ${this.mailCards.map(mailCard => {
          return `<li class="mail-list__item" data-mail-id="${mailCard.mail.id}">${mailCard.wrapper.innerHTML}</li>`
        }).join('')}
      </ul>
    `

    this.events()
  }

  events() {

    let list = this.hook.querySelector('.mail-list')
    list.addEventListener('click', this.onSingle.bind(this))
  }

  onSingle(e) {

    let listItem = e.target.closest('li.mail-list__item')
    let mailId = listItem.dataset.mailId
    let mail = this.mails.filter(mail => mail.id == mailId)[0]

    if(e.target.classList.contains('mail-card__top-right--trash')) {

      this.callback({mailToDelete: mailId})

    } else {

      this.callback({mailToView: mail, box: this.box})

    }
  }
}

export default MailList