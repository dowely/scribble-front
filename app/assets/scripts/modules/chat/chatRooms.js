import chatRoomTemplate from '/app/assets/templates/chat/_chat-room.ejs'
import users from '/app/db/users.json'
import PrivChat from './privChat'

class ChatRooms {
  constructor() {
    this.rooms = {
      group: [
        {
          id: '0',
          get html() {
            return chatRoomTemplate({
              interlocutors: [users[4], users[2]],
              group: true,
              id: this.id
            })
          }
        },
        {
          id: '1',
          get html() {
            return chatRoomTemplate({
              interlocutors: [users[3], users[0], users[1]],
              group: true,
              id: this.id
            })
          }
        }
      ],
      priv: [
        {
          id: '0',
          get html() {
            return chatRoomTemplate({
              interlocutors: [users[3]],
              group: false,
              id: this.id
            })
          }
        },
        {
          id: '1',
          get html() {
            return chatRoomTemplate({
              interlocutors: [users[1]],
              group: false,
              id: this.id
            })
          }
        },
        {
          id: '2',
          get html() {
            return chatRoomTemplate({
              interlocutors: [users[0]],
              group: false,
              id: this.id
            })
          }
        }
      ]
    }

    this.hook = document.querySelector('.chat-rooms__new-room')

    this.collapsed = {group: true, priv: true}

    this.privChat = new PrivChat(this.collapsed, this.onClose.bind(this))
  }

  async add(target, userName) {

    let doubledChat = target === 'group' ? undefined : this.isDoubled(userName)

    if(doubledChat) {

      setTimeout(() => {this.privChat.expand(doubledChat)}, 200)

      return true

    } else {
      
      let newId = this.rooms[target].length === 0 ? '0' : (Number(this.rooms[target][this.rooms[target].length - 1].id) + 1).toString()

      let userObj = users.find(user => user.name === userName)

      let newRoom = {
        id: newId,
        get html() {
          return chatRoomTemplate({
            interlocutors: [userObj],
            group: target === 'group' ? true : false,
            id: this.id
          })
        }
      }

      this.rooms[target].push(newRoom)

      let roomNode = document.createElement('DIV')
      roomNode.className = 'chat-rooms__room-container'
      roomNode.innerHTML = newRoom.html

      this.hook.parentElement.insertBefore(roomNode, this.hook)

      this.chatRooms = document.querySelectorAll('.chat-room')

      let newChatRoom =  roomNode.querySelector('.chat-room')

      if(target == 'priv') {

        this.privChat.events(newChatRoom)
      }

      await this.inflate(newChatRoom)
    }
  }

  isDoubled(userName) {

    return [...this.chatRooms].find(chatRoomEl => 

      chatRoomEl.querySelector('.chat-room__head-bar__name').textContent === userName
    )
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

        deletedRoom.ontransitionend = (e) => {

          if(e.target === deletedRoom) res(deletedRoom)
        }

        //deletedRoom.classList.add('chat-room--deflated') 

        deletedRoom.style.cssText = `
            height: 0;
            transition: height .3s ease-out;
          `
      }
    })
  }

  inflate(chatRoom) {

    if(chatRoom === undefined) {

      Array.from(this.chatRooms).forEach(chatRoom => {

        //chatRoom.classList.remove('chat-room--deflated')
  
        chatRoom.style.cssText = `
          height: 40px;
          transition: height .3s ease-out;
        `
      })

    } else {

      return new Promise(res => {

        chatRoom.ontransitionend = res

        setTimeout(() => {

          chatRoom.style.cssText = `
          height: 40px;
          transition: height .6s ease-out;
          `
        }, 20)
      })
    }   
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