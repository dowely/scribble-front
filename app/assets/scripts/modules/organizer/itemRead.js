import itemReadTemplate from '/app/assets/templates/organizer/_item-read.ejs'

class ItemRead {
  constructor() {}

  events(readNode) {

    const trash = readNode.querySelector('.item-read__icon--trash')
    const edit = readNode.querySelector('.item-read__icon--edit')
    const close = readNode.querySelector('.item-read__icon--close')

    if(readNode.dataset.type === 'task') {

      const form = document.querySelector('.item-read__task-form')
    }

    trash.addEventListener('click', e => {

      const itemId = e.target.closest('.item-read').dataset.itemId

      this.emit('delete', itemId)
    })

    close.addEventListener('click', () => {

      this.emit('close')
    })

  }

  createNode(item) {

    const container = document.createElement('DIV')

    container.innerHTML = itemReadTemplate({item})

    const node = container.querySelector('.item-read')

    this.events(node)

    return node
  }
}

export default ItemRead