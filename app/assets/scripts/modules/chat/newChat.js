class NewChat {
  constructor(callback) {
    this.callback = callback

    this.addUserBtn = document.querySelector('.chat-rooms__new-room__add-container')
    this.users = document.querySelector('.chat-users')
    this.userItems = document.querySelectorAll('.chat-users__user-item')

    this.events()
  }

  events() {

    this.addUserBtn.addEventListener('click', () => {

      this.toggleState()
    })

    for(let user of this.userItems) {
      
      user.addEventListener('click', e => {
        
        if(this.users.classList.contains('chat-users--selectable')) {
         
          let userItem = e.target.closest('.chat-users__user-item')

          userItem.querySelector('.chat-users__select-dot').classList.add('chat-users__select-dot--selected')
        }
      })
    }
  }

  toggleState() {

    this.addUserBtn.classList.toggle('chat-rooms__new-room__add-container--active')
    this.users.classList.toggle('chat-users--selectable')
  }
}

export default NewChat