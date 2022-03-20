import chatRoomTemplate from '/app/assets/templates/chat/_chat-room.ejs'
import avatarContainerTemplate from '/app/assets/templates/chat/_avatar-container.ejs'
import users from '/app/db/users.json'
import PrivChat from './privChat'
import GroupChat from './groupChat'

class ChatRooms {
  constructor(newChatReset, scrollToBottom, messages) {

    this.newChatReset = newChatReset
    this.scrollToBottom = scrollToBottom
    this.messages = messages

    this.rooms = {
      group: [
        {
          id: '0',
          interlocutors: [users[4], users[2]],
          get html() {
            return chatRoomTemplate({
              interlocutors: this.interlocutors,
              group: true,
              id: this.id,
              feed: this.feedHtml
            })
          },
          feedHtml: '' 
        },
        {
          id: '1',
          interlocutors: [users[3], users[0], users[1]],
          get html() {
            return chatRoomTemplate({
              interlocutors: this.interlocutors,
              group: true,
              id: this.id,
              feed: this.feedHtml
            })
          },
          feedHtml: ''
        }
      ],
      priv: [
        {
          id: '0',
          interlocutors: [users[3]],
          get html() {
            return chatRoomTemplate({
              interlocutors: this.interlocutors,
              group: false,
              id: this.id,
              feed: this.feedHtml
            })
          },
          feedHtml: ''
        },
        {
          id: '1',
          interlocutors: [users[1]],
          get html() {
            return chatRoomTemplate({
              interlocutors: this.interlocutors,
              group: false,
              id: this.id,
              feed: this.feedHtml
            })
          },
          feedHtml: ''
        },
        {
          id: '2',
          interlocutors: [users[0]],
          get html() {
            return chatRoomTemplate({
              interlocutors: this.interlocutors,
              group: false,
              id: this.id,
              feed: this.feedHtml
            })
          },
          feedHtml: ''
        }
      ]
    }

    this.hook = document.querySelector('.chat-rooms__new-room')

    this.collapsed = {group: true, priv: true}

    this.privChat = new PrivChat(this.collapsed, this.onClose.bind(this), this.onExpand.bind(this))

    this.groupChat = new GroupChat(this.collapsed, this.onClose.bind(this), this.onExpand.bind(this), this.onModify.bind(this))
  }

  onExpand(chatRoom) {

    let feedToScroll = chatRoom.querySelector('.chat-forum__messages-inner')

    this.scrollToBottom(feedToScroll)

    setTimeout(() => this.newChatReset(), 10)

    setTimeout(() => this.groupChat.reset(), 20)
  }

  async add(target, userName) {

    let doubledChat = target === 'group' ? undefined : this.isDoubled(userName)

    if(doubledChat) {
      
      setTimeout(() => {
        this.privChat.expand(doubledChat)
      }, 200)

      return true

    } else {
      
      let newId = this.rooms[target].length === 0 ? '0' : (Number(this.rooms[target][this.rooms[target].length - 1].id) + 1)

      newId = newId < 3 ? '3' : newId.toString()

      let userObj = users.find(user => user.name === userName)

      let newRoom = {
        id: newId,
        interlocutors: [userObj],
        get html() {
          return chatRoomTemplate({
            interlocutors: this.interlocutors,
            group: target === 'group' ? true : false,
            id: this.id,
            feed: this.feedHtml
          })
        },
        feedHtml: ''
      }

      this.rooms[target].push(newRoom)

      let roomNode = document.createElement('DIV')
      roomNode.className = 'chat-rooms__room-container'
      roomNode.innerHTML = newRoom.html

      this.hook.parentElement.insertBefore(roomNode, this.hook)

      this.chatRooms = document.querySelectorAll('.chat-room')

      let newChatRoom =  roomNode.querySelector('.chat-room')

      if(target === 'priv') this.privChat.events(newChatRoom)

      if(target === 'group') this.groupChat.events(newChatRoom)

      this.messages(newChatRoom)

      await this.inflate(newChatRoom)
    }
  }

  isDoubled(userName) {

    return [...this.chatRooms].find(chatRoomEl => 

      chatRoomEl.querySelector('.chat-room__head-bar__name').textContent === userName
    )
  }

  onModify(info) {

    let user = users.find(user => user.name === info.user)

    let hook = info.chatRoom.querySelector('.chat-room__head-bar__interlocutors').lastElementChild

    let modifiedChatRoom = this.rooms[info.chatRoom.dataset.index].find(room => room.id === info.chatRoom.dataset.id)

    if(info.action === 'add') {

      hook.insertAdjacentHTML('beforebegin', avatarContainerTemplate({interlocutor: user}))

      modifiedChatRoom.interlocutors.push(user)

      setTimeout(() => {
        hook.previousElementSibling.classList.remove('chat-room__head-bar__avatar-container--flattened')
      }, 10)
    }

    if(info.action === 'remove') {

      let groupToUpdate = info.chatRoom.querySelectorAll('.chat-room__head-bar__avatar-container')

      let unwanted = [...groupToUpdate].find(person => person.dataset.name === info.user)

      let flattened = new Promise(res => {

        unwanted.ontransitionend = (e) => {
          if(e.propertyName !== 'opacity') res()
        }

        unwanted.classList.add('chat-room__head-bar__avatar-container--flattened')
      })

      flattened.then(() => {

        if(groupToUpdate.length === 1) {

          let info = {
            id: groupToUpdate[0].closest('.chat-room').dataset.id
          }

          this.onClose(info)
          this.groupChat.reset()

        } else {

          unwanted.remove()

          modifiedChatRoom.interlocutors.splice(modifiedChatRoom.interlocutors.indexOf(user), 1)
        }
      })
    }
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

    if(index === 'priv') {

      for(let room of this.chatRooms) {

        this.privChat.events(room)
      }
    }
    
    if(index === 'group') {

      for(let room of this.chatRooms) {

        this.groupChat.events(room)
      }
    }
  }

  deflate(id) {
    return new Promise(res => {

      if(id === undefined) {

        if(this.chatRooms.length === 0) res()

        this.chatRooms[0].ontransitionend = res

        Array.from(this.chatRooms).forEach(chatRoom => {
  
          chatRoom.classList.add('chat-room--deflated')

          // chatRoom.style.cssText = `
          //   height: 0;
          //   transition: height .3s ease-out;
          // `
        })

      } else {

        let deletedRoom = document.querySelector(`.chat-room[data-id="${id}"]`)

        deletedRoom.ontransitionend = (e) => {

          if(e.target === deletedRoom) res(deletedRoom)
        }

        deletedRoom.classList.add('chat-room--deflated') 

        // deletedRoom.style.cssText = `
        //   height: 0;
        //   transition: height .3s ease-out;
        // `
      }
    })
  }

  inflate(chatRoom) {

    if(chatRoom === undefined) {

      Array.from(this.chatRooms).forEach(chatRoom => {

        chatRoom.classList.add('chat-room--inflate-quickly')
  
        // chatRoom.style.cssText = `
        //   height: 40px;
        //   transition: height .3s ease-out;
        // `
      })

    } else {

      return new Promise(res => {

        chatRoom.ontransitionend = res

        setTimeout(() => {

          chatRoom.classList.add('chat-room--inflate-slowly')

          // chatRoom.style.cssText = `
          // height: 40px;
          // transition: height .6s ease-out;
          // `
        }, 20)
      })
    }   
  }

  clear() {

    let roomNodes = document.querySelectorAll('.chat-rooms__room-container')

    Array.from(roomNodes).forEach(roomNode => {
      this.saveFeed(roomNode)
      roomNode.remove()
    })

    this.privChat.reset()
    this.groupChat.reset(undefined, 'hard')
  }

  saveFeed(roomContainer) {

    let feed = roomContainer.querySelector('.chat-forum__messages').innerHTML

    let chatRoom = this.rooms[roomContainer.firstElementChild.dataset.index].find(room => room.id === roomContainer.firstElementChild.dataset.id)

    chatRoom.feedHtml = feed
  }
}

export default ChatRooms