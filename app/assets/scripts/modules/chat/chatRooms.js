import chatRoomTemplate from '/app/assets/templates/chat/_chat-room.ejs'
import users from '/app/db/users.json'

class ChatRooms {
  constructor() {
    this.rooms = {
      group: [
        chatRoomTemplate({
          interlocutors: [users[4], users[2]]}),
        chatRoomTemplate({
          interlocutors: [users[3], users[0], users[1]]})
      ],
      priv: [chatRoomTemplate({interlocutors: [users[3]]})]
    }

    this.hook = document.querySelector('.chat-rooms__new-room')
  }

  inject(index) {

    this.rooms[index].forEach(room => {
      
      let roomNode = document.createElement('DIV')
      roomNode.className = 'chat-rooms__room-container'
      roomNode.innerHTML = room

      this.hook.parentElement.insertBefore(roomNode, this.hook)
    })

    this.chatRooms = document.querySelectorAll('.chat-room')
  }

  pop() {

    Array.from(this.chatRooms).forEach(chatRoom => {

      chatRoom.classList.remove('chat-room--deflated')
    })    
  }
}

export default ChatRooms