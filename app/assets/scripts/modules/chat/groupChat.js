import PrivChat from "./privChat"

class GroupChat extends PrivChat {

  name = 'group'
  inviting = false
  
  constructor(collapsed, callbackClose, newChatReset, callbackModify) {
    super(collapsed, callbackClose, newChatReset)

    this.onModify = callbackModify

    this.newChatBtn = document.querySelector('.chat-rooms__new-room__add-container')
    this.users = document.querySelector('.chat-users')
    this.userItems = document.querySelectorAll('.chat-users__user-item')
    this.userDots = document.querySelectorAll('.chat-users__select-dot')

    for(let userItem of this.userItems) {
      
      userItem.addEventListener('click', this.modifyGroup.bind(this))
    }
  }

  modifyGroup(e) {
    
    if(this.inviting) {

      let userItem = e.target.closest('.chat-users__user-item')
      let userName = userItem.querySelector('.chat-users__name').textContent
      let dot = userItem.querySelector('.chat-users__select-dot')

      if(dot.classList.contains('chat-users__select-dot--selected')) {

        this.onModify({
          action: 'remove',
          chatRoom: this.inviting,
          user: userName
        })

        dot.classList.remove('chat-users__select-dot--selected')

      } else {

        this.onModify({
          action: 'add',
          chatRoom: this.inviting,
          user: userName
        })

        dot.classList.add('chat-users__select-dot--selected')

      }
    }
  }

  events(chatRoom) {
    super.events(chatRoom)
    
    let addInterlocutorBtn = chatRoom.querySelector('.chat-room__head-bar__new-container')

    let close = chatRoom.querySelector('.chat-room__close-tap-area')

    let angle = chatRoom.querySelector('.chat-room__angle-tap-area')

    addInterlocutorBtn.addEventListener('click', () => {

      if(!this.newChatBtn.classList.contains('chat-rooms__new-room__add-container--active') && (this.inviting === false || this.inviting === chatRoom)) {

        this.toggleInvite(addInterlocutorBtn)
      }
    })

    close.addEventListener('click', () => {

      if(close.closest('.chat-room') === this.inviting) this.reset(addInterlocutorBtn)
    })

    angle.addEventListener('click', () => {
      
      addInterlocutorBtn.classList.toggle('chat-room__head-bar__new-container--disabled')
    })
  }

  toggleInvite(btn) {

    if(!this.inviting) {

      this.inviting = btn.closest('.chat-room')

      this.updateDots()

    } else {

      this.inviting = false
    }

    btn.classList.toggle('chat-room__head-bar__new-container--active')
    this.users.classList.toggle('chat-users--selectable')
  }

  updateDots() {
    
    let invitedUsers = this.inviting.querySelectorAll('.chat-room__head-bar__avatar-container')
    
    this.userDots.forEach(dot => {

      let name = dot.parentElement.querySelector('.chat-users__name').textContent
      
      if([...invitedUsers].find(avatarContainer => {

        return avatarContainer.dataset.name === name
      })) {
        
        dot.classList.add('chat-users__select-dot--selected')

      } else {

        dot.classList.remove('chat-users__select-dot--selected')
      }
    })
  }

  reset(btn) {

    this.inviting = false
    this.isExpanded = null

    this.users.classList.remove('chat-users--selectable') 

    if(btn === undefined) {

      let btns = document.querySelectorAll('.chat-room__head-bar__new-container')

      btns.forEach(btn => btn.classList.remove('chat-room__head-bar__new-container--active'))

    } else {

      btn.classList.remove('chat-room__head-bar__new-container--active')
    }
  }
}

export default GroupChat