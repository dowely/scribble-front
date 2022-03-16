class Messages {

  static textArea = document.querySelector('#chat-input')

  static events() {

    this.textArea.addEventListener('input', () => {

      this.updateHeight()
    })
  }

  static updateHeight() {
    
    this.textArea.style.height = ''

    this.textArea.style.height = `${this.textArea.scrollHeight}px`
  }
}

export default Messages