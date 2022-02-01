import mails from '/app/db/mails.json'
import writeTemplate from '/app/assets/templates/mail/_mail-write.ejs'

class MailWrite {
  constructor(callback) {
    this.callback = callback

    this.hook = document.querySelector('.content__right-col .content__viewer')
  }

  load(history) {

    this.hook.innerHTML = writeTemplate()

  }
}

export default MailWrite