class MailList {
  constructor(boxIndex) {
    this.boxIndex = boxIndex

    this.lists =  document.querySelectorAll('.mail-list')

    this.lists.forEach(list => {
    
      if(list.dataset.box == this.boxIndex) list.style.display = 'block'
    })
  }
}

export default MailList