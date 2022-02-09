import mails from '/app/db/mails.json'
import writeTemplate from '/app/assets/templates/mail/_mail-write.ejs'

class MailWrite {
  constructor(callback) {
    this.callback = callback

    this.hook = document.querySelector('.content__right-col .content__viewer')

    this.drafts = mails.drafts
    this.mails = mails.inbox.concat(mails.sent, mails.drafts)
  }

  events() {

    this.close.forEach(closingEl => {

      closingEl.addEventListener('click', e => {

        e.preventDefault()
        this.callback()
      })
    })
  }

  load(repliedMail, all, fwd) {

    let history = []
    let recipients = []
    let draft = {}

    if(repliedMail) {

      history = this.addHistory(repliedMail)
      this.hook.style.height = '100%'

      if(!fwd) recipients = this.addRecipients(repliedMail, all)
    }
    
    if(this.drafts.some(mail => mail.id == repliedMail)) {
      
      history.shift()

      this.populateInput(repliedMail, draft)
    }

    this.hook.style.overflow = 'visible'
    this.hook.innerHTML = writeTemplate({history, recipients, draft})

    if(history.length > 0) {

      this.hook.querySelector('.mail-write__history-container').style.borderTop = '2px solid rgba(0, 0, 0, 0.5)'

    } else {

      this.hook.style.height = null
    }

    if(Number(getComputedStyle(this.hook).getPropertyValue('height').slice(0,-2)) > 700) {

      this.hook.parentElement.style.paddingBottom = '90px'

    } else {

      this.hook.parentElement.style.paddingBottom = '60px'
    }

    this.close = [document.querySelector('.mail-write__close'), ...document.querySelectorAll('.mail-write .btn')]

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

      return [mailDoc.from, ...mailDoc.to].filter(val => val != undefined)

    } else {

      return [mailDoc.from]
    }
  }

  populateInput(repliedMail, draft) {

    let mailDoc = this.drafts.find(mail => mail.id == repliedMail)

    draft.subject = mailDoc.subject
    draft.body = mailDoc.body
  }
}

export default MailWrite