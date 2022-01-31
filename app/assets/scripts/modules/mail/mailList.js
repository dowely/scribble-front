class MailList {
  constructor(boxIndex, callback) {
    this.boxIndex = boxIndex
    this.callback = callback

    this.lists =  document.querySelectorAll('.mail-list')

    this.lists.forEach(list => {
    
      if(list.dataset.box == this.boxIndex) list.style.display = 'block'

      this.onClick(list)
    })
  }

  onClick(list) {

    list.addEventListener('click', e => {

      if(e.target.classList.contains('mail-card__delete-extension')) {

        this.delete(e.target)

      } else if(e.target.closest('.mail-list').dataset.box == '3') {

        this.write(e.target)

      } else {

        this.read(e.target)
      }
      
    })
  }

  read(target) {

    let list = target.closest('.mail-list').dataset.box
    let id = target.closest('.mail-card').dataset.id

    this.callback({
      read: {
        list,
        id
      }
    })
  }

  delete(target) {

    let list = 3
    let id = target.closest('.mail-card').dataset.id

    this.callback({
      delete: {
        list,
        id
      }
    })
  }

  write(target) {

    this.callback({write: {id: ''}})
  }
}

export default MailList