import mailNotifierTemplate from '/app/assets/templates/components/mail/_mail-notifier.ejs'
import '/app/assets/icons/mail/envelope-open-regular.svg'

class MailNotifier {
 constructor(unread) {
   this.unread = unread
 }

 render(hook) {
   hook.innerHTML = mailNotifierTemplate({unread: this.unread})
 }
}

export default MailNotifier