class TeamList {
  constructor(callback) {
    this.callback = callback

    this.list = document.querySelector('.team-list')
    this.links = document.querySelectorAll('.user-card__links__tap-area')

    this.search = document.querySelector('#search-field__input')
    this.userCards = this.list.querySelectorAll('.user-card')

    this.events()
  }

  events() {

    this.list.addEventListener('click', e => {

      if(![...this.links].includes(e.target)) {

        let name = e.target.closest('.user-card').dataset.userName

        this.callback(name)
      }
    })

    this.search.addEventListener('keyup', this.filter.bind(this))
  }

  filter() {

    this.userCards.forEach(card => {

      if(
        this.match(card.dataset.userName) ||
        this.match(card.dataset.userTitle)
      ) {
        card.parentElement.style.display = 'block'

      } else {

        card.parentElement.style.display = 'none'

      }      
    })
  }

  match(dataAttr) {

    let input = this.search.value.toLowerCase()
    let str = dataAttr.toLowerCase()

    return str.indexOf(input) !== -1 ? true : false
  }
}

export default TeamList