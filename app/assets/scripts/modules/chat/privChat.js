class PrivChat {

  name = 'priv'

  constructor(collapsed, callback, onExpand) {

    this.onExpand = onExpand

    this.wrapper = document.querySelector('.chat-rooms__wrapper')

    this.wrapperScrollPos

    this.isExpanded = null
    this.collapsed = collapsed
    this.callback = callback
  }

  events(chatRoom) {

    let angleDown = chatRoom.querySelector('.chat-room__angle-tap-area')
    let close = chatRoom.querySelector('.chat-room__close-tap-area')

    angleDown.addEventListener('click', () => {
      
      if(angleDown.nextElementSibling.classList.contains('chat-room__angle-icon--rotated')) {

        this.collapse(chatRoom)

      } else if(this.isExpanded === null || this.isExpanded === chatRoom) {

        this.expand(chatRoom)

      }
    })

    close.addEventListener('click', e => {

      let chatRoom = e.target.closest('.chat-room')

      if(this.collapsed[this.name]) {

        this.callback({
          index: chatRoom.dataset.index,
          id: chatRoom.dataset.id
        })
      } else {

        this.collapse(chatRoom, true)
      }
    })
  }

  expand(chatRoom) {
    
    let angleDown = chatRoom.querySelector('.chat-room__angle-tap-area')    

    angleDown.nextElementSibling.classList.add('chat-room__angle-icon--rotated')

    this.isExpanded = chatRoom
    this.collapsed[this.name] = false
    
    this.onExpand(chatRoom)

    this.packNodes(chatRoom)

    chatRoom.parentElement.classList.add('chat-rooms__room-container--expandable')

    chatRoom.classList.add('chat-room--default')

    this.wrapper.classList.add('chat-rooms__wrapper--focused')

    setTimeout(() => {

      this.wrapper.classList.add('chat-rooms__wrapper--transition')

      this.wrapper.classList.add('chat-rooms__wrapper--expanded')

    }, 20)
  }

  collapse(chatRoom, andClose) {

    let angleDown = chatRoom.querySelector('.chat-room__angle-tap-area')

    angleDown.nextElementSibling.classList.remove('chat-room__angle-icon--rotated')

    let containerAbove = document.querySelector('.chat-rooms__hide-above')

    let collapsed = new Promise((res, rej) => {

      this.wrapper.addEventListener('transitionend', event => {
        if(event.propertyName == 'height') res()
      })

      setTimeout(() => {
        this.wrapper.ontransitioncancel = rej
      }, 20)

      this.wrapper.classList.remove('chat-rooms__wrapper--expanded')

      // this.wrapper.style.height = '41px'
      // this.wrapper.style.marginTop = `${containerAbove.offsetHeight}px`
    })

    collapsed.then(() => {

      chatRoom.parentElement.classList.remove('chat-rooms__room-container--expandable')

      //chatRoom.style.cssText = `
      //height: 40px;
      //`
      
      //chatRoom.parentElement.style.height = 'auto'

      this.unpackNodes(chatRoom)

      this.wrapper.classList.remove('chat-rooms__wrapper--transition')

      this.wrapper.classList.remove('chat-rooms__wrapper--focused')
      this.wrapper.scrollTop = this.wrapperScrollPos

      // this.wrapper.style.cssText = `
      //   height: 100%;
      //   margin-top: 0;
      // `

      this.isExpanded = null
      this.collapsed[this.name] = true

      if(andClose) {
        
        setTimeout(() => {
          
          this.callback({
            index: chatRoom.dataset.index,
            id: chatRoom.dataset.id
          })

        }, 1)
      }
      
    })
  }

  packNodes(splitNode) {

    this.wrapperScrollPos = this.wrapper.scrollTop

    let nodesAbove = []
    let nodesBelow = []

    let conveyor = nodesAbove

    let allNodes = splitNode.parentElement.parentElement.children

    for(let node of allNodes) {
      
      if(node === splitNode.parentElement) {

        conveyor = nodesBelow

      } else if(
        !node.classList.contains('chat-rooms__hide-above') && !node.classList.contains('chat-rooms__hide-below'))
      {
        conveyor.push(node)
      }
    }

    let containerAbove = document.querySelector('.chat-rooms__hide-above')
    let containerBelow = document.querySelector('.chat-rooms__hide-below')

    nodesAbove.forEach(node => containerAbove.appendChild(node))
    nodesBelow.forEach(node => containerBelow.appendChild(node))

    document.documentElement.style.setProperty('--mt', `${containerAbove.offsetHeight - this.wrapperScrollPos}px`)
  }

  unpackNodes(splitNode) {

    let containerAbove = document.querySelector('.chat-rooms__hide-above')
    let containerBelow = document.querySelector('.chat-rooms__hide-below')

    let nodesAbove = [...containerAbove.children]
    let nodesBelow = [...containerBelow.children]

    for(let node of nodesAbove) {

      splitNode.parentElement.insertAdjacentElement('beforebegin', node)
    }

    for(let node of nodesBelow) {
      
      containerBelow.insertAdjacentElement('beforebegin', node)
    }
  }

  reset() {

    this.unpackNodes()

    //this.wrapper.style = null

    this.wrapper.classList.remove('chat-rooms__wrapper--focused', 'chat-rooms__wrapper--transition',
    'chat-rooms__wrapper--expanded'
    )
    
    this.isExpanded = null
  }
}

export default PrivChat
