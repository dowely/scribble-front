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

    this.html = `
      <ul class="mail-list">
        ${this.mailCards.map(mailCard => {
          return `<li>${mailCard.html}</li>`
        }).join('')}
      </ul>
    `

    this.hook.innerHTML = this.html
  }
}

export default MailList