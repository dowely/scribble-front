import mails from '/app/db/mails.json'
import writeTemplate from '/app/assets/templates/mail/_mail-write.ejs'

class MailWrite {
  constructor(callback) {
    this.callback = callback

    this.hook = document.querySelector('.content__right-col .content__viewer')

    this.mails = mails.inbox.concat(mails.sent, mails.drafts)
  }

  events() {

    this.close.addEventListener('click', () => {
      this.callback({close: true})
    })
  }

  load(repliedMail, all) {

    let history = []
    let recipients = []

    if(repliedMail) {

      history = this.addHistory(repliedMail)
      this.hook.style.height = '100%'

      recipients = this.addRecipients(repliedMail, all)
    } 

    this.hook.parentElement.style.paddingBottom = '72px'
    this.hook.style.overflow = 'visible'
    this.hook.innerHTML = writeTemplate({history, recipients})

    this.close = document.querySelector('.mail-write__close')

    this.events()

  }

  clear() {
    this.hook.style = null
    this.hook.parentElement.style = null
    this.hook.innerHTML = ''
  }

  addHistory(repliedMail) {

    let mailDoc = this.mails.find(mail => mail.id == repliedMail)

    let historyDocs = []

    if(mailDoc.history.length > 0) {

      historyDocs = this.mails.filter(mail => {

        let result = false

        for(const id of mailDoc.history) {
          if(mail.id == id) result = true
        }

        return result

      })
    }

    return [mailDoc, ...historyDocs]
  }

  addRecipients(repliedMail, all) {

    let mailDoc = this.mails.find(mail => mail.id == repliedMail)

    if(all) {

      return [mailDoc.from, ...mailDoc.to]

    } else {

      return [mailDoc.from]
    }
  }
}

export default MailWrite