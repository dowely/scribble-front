import mails from '/app/db/mails.json'
import readTemplate from '/app/assets/templates/mail/_mail-read.ejs'

class MailRead {
  constructor(callback) {
    this.callback = callback
    this.hook = document.querySelector('.content__right-col .content__viewer')

    this.mails = {
      '1': mails.inbox,
      '2': mails.sent,
      '3': mails.drafts
    }
  }

  clear() {
    this.hook.innerHTML = ''
  }

  load(pointer) {

    let inbox = pointer.list == '1' ? true : false;

    let mail = this.mails[pointer.list].reduce((previous, current) => {
      return previous.id == pointer.id ? previous : current

    }, this.mails[pointer.list][0])

    let history = []

    if(mail.history.length > 0) history = this.addHistory(mail)

    this.hook.innerHTML = readTemplate({mail, inbox, history})

    this.events()
  }

  addHistory(mail) {

    let allMails = this.mails['1'].concat(this.mails['2'], this.mails['3'])

    let historyMails = allMails.filter(item => {

      let result

      for (const id of mail.history) {
       if(item.id == id) result = true
      }

      return result
    })

    return historyMails.reverse()
  }

  events() {

    let closeBtn = this.hook.querySelector('.mail-read__button--close')

    closeBtn.addEventListener('click', () => this.callback({close: true}))
  }
}

export default MailRead