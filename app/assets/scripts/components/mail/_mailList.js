import mails from '/app/db/mails.json';

let inbox = mails.filter(mail => {if(mail.to.find(name => name == 'John Schaffer')) return true})

  inbox.sort((first, second) => new Date(second.sendTime) - new Date(first.sendTime))

  let outbox = mails.filter(mail => mail.from == 'John Schaffer')

  outbox.sort((first, second) => new Date(second.sendTime) - new Date(first.sendTime))

  let drafts = outbox.filter(mail => mail.sendTime == '')

  let mailCollection

  if(list == 'inbox') {mailCollection = inbox}
  if(list == 'sent') {mailCollection = outbox}
  if(list == 'drafts') {mailCollection = drafts}