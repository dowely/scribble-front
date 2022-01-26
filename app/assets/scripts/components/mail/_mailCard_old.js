import users from '/app/db/users.json'
import mailCardTemplate from '/app/assets/templates/mail/_mail-card.ejs'

const now = new Date('2022-02-22T18:37:12.324Z')

class MailCard {
  constructor(mail, user, box) {
    this.mail = mail
    this.user = user
    this.box = box

    this.wrapper = document.createElement('DIV')

    this.mail.incoming = this.mail.from !== this.user

    this.mail.wasRead = this.mail.readBy.filter(user => user == this.user).length > 0

    this.mail.sender = users.filter(user => user.name == this.mail.from)[0]

    this.mail.recipients = users.filter(user => this.mail.to.find(name => name == user.name))

    this.mail.topRightTime = ''

    if(this.mail.sendTime != '') this.calcTopRightTime()

    this.wrapper.innerHTML = mailCardTemplate({mail: this.mail})

  }

  calcTopRightTime() {
    
    this.sendTime = new Date(this.mail.sendTime)
  
    if(this.sameDate(now, this.sendTime) && this.sameHour(now, this.sendTime)) {

      this.mail.topRightTime = `${now.getMinutes() - this.sendTime.getMinutes()} min`

    } else if(this.sameDate(now, this.sendTime)) {

      this.mail.topRightTime = this.sendTime.getUTCHours() <= 12 ? `${this.sendTime.getUTCHours()}:${this.sendTime.getMinutes()} AM` : `${this.sendTime.getUTCHours() - 12}:${this.sendTime.getMinutes()} PM`

    } else {

      this.mail.topRightTime = `${this.sendTime.getMonth() + 1}/${this.sendTime.getDate()}/${this.sendTime.getFullYear().toString().substring(2)}`

    }

  }

  sameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  }

  sameHour(d1, d2) {
    return this.sameDate(d1, d2) && 
    d1.getUTCHours() === d2.getUTCHours()
  }
}

export default MailCard