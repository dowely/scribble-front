import itemReadTemplate from '/app/assets/templates/organizer/_item-read.ejs'

class ItemRead {

  currentItem

  currentNode

  currentId

  constructor() {}

  events(readNode) {

    const trash = readNode.querySelector('.item-read__icon--trash')
    const edit = readNode.querySelector('.item-read__icon--edit')
    const close = readNode.querySelector('.item-read__icon--close')

    if(readNode.dataset.type === 'task') {

      const form = readNode.querySelector('.item-read__task-form')
      
      const radios = form.elements["taskStatus"]
      
      radios.forEach(radio => {

        radio.addEventListener('change', () => {

          radios.forEach(radio => {

            radio.removeAttribute('data-check')
          })

          radio.setAttribute('data-check', '')

          const newStatus = this.formatStatus(radio.value)

          this.currentItem.status = newStatus

          this.emit('statusChange', this.currentItem)

        })
      })
    }

   

    trash.addEventListener('click', e => {

      const itemId = e.target.closest('.item-read').dataset.itemId

      this.emit('delete', itemId)
    })

    edit.addEventListener('click', e => {

      this.emit('edit', this.currentId)
    })

    close.addEventListener('click', () => {

      this.emit('close')
    })

  }

  createNode(item) {

    this.currentItem = item

    const container = document.createElement('DIV')

    container.innerHTML = itemReadTemplate({item})

    const node = container.querySelector('.item-read')

    this.events(node)

    this.currentNode = node

    this.currentId = item.id

    return node
  }

  update(item) {

    this.currentItem = item

    const box = document.createElement('DIV')

    box.innerHTML = itemReadTemplate({item})

    const newNode = box.querySelector('.item-read')

    this.events(newNode)

    this.currentNode.replaceWith(newNode)

    this.currentNode = newNode
  }

  formatStatus(str) {

    let formattedStr = ''

    for(let i = 0; i < str.length; i++) {

      if(str.charAt(i) === str.charAt(i).toUpperCase()) {

        formattedStr += ' '
        formattedStr += str.charAt(i).toLowerCase()

      } else {

        formattedStr += str.charAt(i)

      }
    }

    return formattedStr
  }
}

export default ItemRead