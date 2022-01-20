import MailCard from './_mailCard'
import mailReadTemplate from '/app/assets/templates/mail/_mail-read.ejs'

class MailRead extends MailCard {
  constructor(mail, user, box) {
    super(mail, user, box)
    
    this.hook
  }

  render(hook) {
    
    this.hook = hook
    this.hook.innerHTML = mailReadTemplate({
      mail: this.mail,
      user: this.user,
      box: this.box
    })
  }
}

export default MailRead