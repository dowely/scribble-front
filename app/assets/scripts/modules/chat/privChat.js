class PrivChat {
  constructor() {
    this.wrapper = document.querySelector('.chat-rooms__wrapper')
    this.isExpanded = null
  }

  events(chatRoom) {

    let angleDown = chatRoom.querySelector('.chat-room__angle-tap-area')

    angleDown.addEventListener('click', (e) => {

      if(angleDown.nextElementSibling.classList.contains('chat-room__angle-icon--rotated')) {

        this.collapse(chatRoom)

        angleDown.nextElementSibling.classList.remove('chat-room__angle-icon--rotated')

      } else if(this.isExpanded === null || this.isExpanded === chatRoom) {

        this.expand(chatRoom)

        angleDown.nextElementSibling.classList.add('chat-room__angle-icon--rotated')
      }
    })
  }

  expand(chatRoom) {

    this.isExpanded = chatRoom

    this.wrapper.style.height = '41px'
    
    chatRoom.parentElement.classList.add('chat-rooms__room-container--expandable')

    this.packNodes(chatRoom)

    setTimeout(() => {

      this.wrapper.style.cssText = `
      transition: margin-top .3s linear, height .6s ease-in;
      height: 100%;
      margin-top: 0;
    `
    }, 20)
  }

  collapse(chatRoom) {

    let containerAbove = document.querySelector('.chat-rooms__hide-above')

    let collapsed = new Promise((res, rej) => {

      this.wrapper.addEventListener('transitionend', event => {
        if(event.propertyName == 'height') res()
      })

      setTimeout(() => {
        this.wrapper.ontransitioncancel = rej
      }, 20)

      this.wrapper.style.height = '41px'
      this.wrapper.style.marginTop = `${containerAbove.offsetHeight}px`  
    })

    collapsed.then(() => {

      this.wrapper.style.cssText = `
        height: 100%;
        margin-top: 0;
      `
      chatRoom.parentElement.classList.remove('chat-rooms__room-container--expandable')

      this.unpackNodes(chatRoom)

      this.isExpanded = null
    })
  }

  packNodes(splitNode) {

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

    this.wrapper.style.marginTop = `${containerAbove.offsetHeight}px`
  }

  unpackNodes(splitNode) {

    let containerAbove = document.querySelector('.chat-rooms__hide-above')
    let containerBelow = document.querySelector('.chat-rooms__hide-below')

    let nodesAbove = [...containerAbove.children]
    let nodesBelow = [...containerBelow.children]

    for(let node of nodesAbove) {
      console.log
      splitNode.parentElement.insertAdjacentElement('beforebegin', node)
    }

    for(let node of nodesBelow) {
      
      containerBelow.insertAdjacentElement('beforebegin', node)
    }
  }
}

export default PrivChat
