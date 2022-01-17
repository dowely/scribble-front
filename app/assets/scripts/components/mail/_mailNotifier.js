import mailNotifierTemplate from '/app/assets/templates/components/mail/_mail-notifier.ejs'
import '/app/assets/icons/mail/envelope-open-regular.svg'

class MailNotifier {
 constructor() {
 }

 render(hook, unread) {
   hook.innerHTML = mailNotifierTemplate({unread: unread})
 }
}

export default MailNotifier