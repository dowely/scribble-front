import chatRoomTemplate from '/app/assets/templates/chat/_chat-room.ejs'
import users from '/app/db/users.json'
import PrivChat from './privChat'

class ChatRooms {
  constructor() {
    this.rooms = {
      group: [
        {
          html: chatRoomTemplate({
            interlocutors: [users[4], users[2]],
            group: true,
            id: 0
          }),
          id: '0'
        },
        {
          html: chatRoomTemplate({
            interlocutors: [users[3], users[0], users[1]],
            group: true,
            id: 1
          }),
          id: '1'
        }
      ],
      priv: [
        {
          html: chatRoomTemplate({
            interlocutors: [users[3]],
            group: false,
            id: 0
          }),
          id: '0'
        },
        {
          html: chatRoomTemplate({
            interlocutors: [users[1]],
            group: false,
            id: 1
          }),
          id: '1'
        },
        {
          html: chatRoomTemplate({
            interlocutors: [users[0]],
            group: false,
            id: 2
          }),
          id: '2'
        }
      ]
    }

    this.hook = document.querySelector('.chat-rooms__new-room')

    this.collapsed = {group: true, priv: true}

    this.privChat = new PrivChat(this.collapsed, this.onClose.bind(this))
  }

  async onClose(info) {
    
    let roomToRemove = await this.deflate(info.id)

    this.removeChatRoom(roomToRemove)
  
    this.chatRooms = document.querySelectorAll('.chat-room')

  }

  removeChatRoom(room) {
    
    room.parentElement.remove()

    let oldStorage = this.rooms[room.dataset.index]
    
    let newStorage = oldStorage.filter(storedRoom => storedRoom.id !== room.dataset.id)

    this.rooms[room.dataset.index] = newStorage
  }

  inject(index) {

    this.rooms[index].forEach(room => {
      
      let roomNode = document.createElement('DIV')
      roomNode.className = 'chat-rooms__room-container'
      roomNode.innerHTML = room.html

      this.hook.parentElement.insertBefore(roomNode, this.hook)
    })

    this.chatRooms = document.querySelectorAll('.chat-room')

    if(index == 'priv') {

      for(let room of this.chatRooms) {

        this.privChat.events(room)
      }
    }
  }

  deflate(id) {
    return new Promise(res => {

      if(id === undefined) {

        if(this.chatRooms.length === 0) res()

        this.chatRooms[0].ontransitionend = res

        Array.from(this.chatRooms).forEach(chatRoom => {
  
          //chatRoom.classList.add('chat-room--deflated')

          chatRoom.style.cssText = `
            height: 0;
            transition: height .3s ease-out;
          `
        })

      } else {

        let deletedRoom = document.querySelector(`.chat-room[data-id="${id}"]`)

        deletedRoom.ontransitionend = () => res(deletedRoom)

        //deletedRoom.classList.add('chat-room--deflated') 

        deletedRoom.style.cssText = `
            height: 0;
            transition: height .3s ease-out;
          `
      }
    })
  }

  inflate() {

    Array.from(this.chatRooms).forEach(chatRoom => {

      //chatRoom.classList.remove('chat-room--deflated')

      chatRoom.style.cssText = `
        height: 40px;
        transition: height .3s ease-out;
      `
    })    
  }

  clear() {

    let roomNodes = document.querySelectorAll('.chat-rooms__room-container')

    Array.from(roomNodes).forEach(roomNode => {
      roomNode.remove()
    })

    this.privChat.reset()
  }
}

export default ChatRooms