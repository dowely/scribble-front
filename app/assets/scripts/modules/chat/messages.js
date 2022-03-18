import chatMessageTemplate from '/app/assets/templates/chat/_chat-message.ejs'

class Messages {

  static forumChat = document.querySelector('#forumChatFeed')

  static events(chatRoom) {

    let textAreas = chatRoom ?
      [chatRoom.querySelector('.chat-forum__text-area')] : document.querySelectorAll('.chat-forum__text-area')

    textAreas.forEach(textarea => {

      textarea.addEventListener('keydown', e => {

        if(e.key === 'Enter') {

          e.preventDefault()

          if(e.target.value !== '') {

            let hook = textarea.parentElement.previousElementSibling.firstElementChild

            this.send(e.target.value, hook)

            e.target.value = ''

            e.target.dispatchEvent(new Event('input'))
          }
        }
      })
    })
  }

  static send(msg, hook) {

    let mode

    if(hook.lastElementChild) mode = hook.lastElementChild.classList.contains('chat-message--left') ? 'respond' : 'append'

    switch(mode) {

      case 'respond':

        this.respond(msg, hook)

        break

      case 'append':

        this.append(msg, hook.lastElementChild)

        break

      default:

        this.respond(msg, hook)
    }

    this.scrollToBottom(hook)
  }

  static respond(msg, hook) {

    let newHtml = chatMessageTemplate(
      {
        user: {
          avatar: 'assets/images/john-schaffer.png',
          name: 'John Schaffer'
        },
        side: 'right',
        texts: [msg]
      }
    )

    hook.insertAdjacentHTML('beforeend', newHtml)
  }

  static append(msg, hook) {

    let p = document.createElement('P')
    p.className = 'chat-message__text'
    p.textContent = msg

    let container = hook.querySelector('.chat-message__text-container')

    container.appendChild(p)
  }

  static scrollToBottom(scrollingContainer) {

    if(!scrollingContainer) scrollingContainer = this.forumChat

    scrollingContainer.scrollTop = scrollingContainer.scrollHeight
  }
}

export default Messages