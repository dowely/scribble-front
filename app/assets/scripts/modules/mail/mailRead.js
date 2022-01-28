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

  load(pointer) {

    let inbox = pointer.list == '1' ? true : false;

    let mail = this.mails[pointer.list].reduce((previous, current) => {
      return previous.id == pointer.id ? previous : current

    }, this.mails[pointer.list][0])

    this.hook.innerHTML = readTemplate({mail, inbox})
  }
}

export default MailRead