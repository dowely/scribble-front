import chatRoomTemplate from '/app/assets/templates/chat/_chat-room.ejs'
import users from '/app/db/users.json'
import PrivChat from './privChat'

const privChat = new PrivChat()

class ChatRooms {
  constructor() {
    this.rooms = {
      group: [
        chatRoomTemplate({
          interlocutors: [users[4], users[2]],
          group: true
        }),
        chatRoomTemplate({
          interlocutors: [users[3], users[0], users[1]],
          group: true
        })
      ],
      priv: [
        chatRoomTemplate({
          interlocutors: [users[3]],
          group: false
        }),
        chatRoomTemplate({
          interlocutors: [users[1]],
          group: false
        }),
        chatRoomTemplate({
          interlocutors: [users[0]],
          group: false
        })
      ]
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

    if(index == 'priv') {

      for(let room of this.chatRooms) {

        privChat.events(room)
      }
    }
  }

  deflate() {
    return new Promise(res => {

      this.chatRooms[0].ontransitionend = res  

      Array.from(this.chatRooms).forEach(chatRoom => {

        chatRoom.classList.add('chat-room--deflated')
      })
    })
  }

  inflate() {

    Array.from(this.chatRooms).forEach(chatRoom => {

      chatRoom.classList.remove('chat-room--deflated')
    })    
  }

  clear() {

    let roomNodes = document.querySelectorAll('.chat-rooms__room-container')

    Array.from(roomNodes).forEach(roomNode => {
      roomNode.remove()
    })
  }
}

export default ChatRooms