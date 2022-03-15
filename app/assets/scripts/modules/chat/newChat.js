class NewChat {
  constructor(callback) {
    this.callback = callback
    this.selectedUser = ''

    this.addUserBtn = document.querySelector('.chat-rooms__new-room__add-container')
    this.users = document.querySelector('.chat-users')
    this.userItems = document.querySelectorAll('.chat-users__user-item')
    this.userDots = document.querySelectorAll('.chat-users__select-dot')

    this.events()
  }

  events() {

    this.addUserBtn.addEventListener('click', () => {

      if(!this.invitingToGroup()) this.toggleState()
    })

    for(let user of this.userItems) {
      
      user.addEventListener('click', e => {

        if(this.addUserBtn.classList.contains('chat-rooms__new-room__add-container--active') && !this.selectedUser) {
         
          let userItem = e.target.closest('.chat-users__user-item')

          userItem.querySelector('.chat-users__select-dot').classList.toggle('chat-users__select-dot--selected')

          let userName = userItem.querySelector('.chat-users__name').textContent

          this.selectedUser = userName
          this.callback(userName)
        }
      })
    }
  }

  toggleState() {

    this.addUserBtn.classList.toggle('chat-rooms__new-room__add-container--active')
    this.users.classList.toggle('chat-users--selectable')

    if(!this.selectedUser) {

      this.userDots.forEach(dot => {

        dot.classList.remove('chat-users__select-dot--selected')
      })
    }

    this.selectedUser = ''
  }

  reset() {

    this.addUserBtn.classList.remove('chat-rooms__new-room__add-container--active')
    
    this.users.classList.remove('chat-users--selectable')

    this.selectedUser = ''
  }

  invitingToGroup() {

    let result = false

    let groupInviteBtns = document.querySelectorAll('.chat-room__head-bar__new-container')

    groupInviteBtns.forEach(btn => {

      if(btn.classList.contains('chat-room__head-bar__new-container--active')) result = true
    })

    return result
  }
}

export default NewChat