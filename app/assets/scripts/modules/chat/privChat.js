class PrivChat {
  constructor() {
    this.wrapper = document.querySelector('.chat-rooms__wrapper')
  }

  events(chatRoom) {

    let angleDown = chatRoom.querySelector('.chat-room__angle-tap-area')

    angleDown.addEventListener('click', (e) => {
  
      this.expand(chatRoom)
      this.rotate(e.target)
    })
  }

  expand(chatRoom) {

    this.wrapper.classList.add('chat-rooms__wrapper--extendable')

    chatRoom.parentElement.classList.add('chat-rooms__room-container--extendable')

    this.packNodes(chatRoom)
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
  }

  rotate(angleIcon) {

    console.log('rotated', angleIcon)
  }
}

export default PrivChat
