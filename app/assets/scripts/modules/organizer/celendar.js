import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'

class Calendar {

  localItemModel

  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    get date() {
      return new Date(this.year, this.month, this.day)
    }
  }

  cardHook = document.querySelector('.calendar__calendar-card-container')

  displayHook = document.querySelector('.calendar__calendar-display-container')

  constructor(localItemModel) {

    this.localItemModel = localItemModel

    this.cardHook.innerHTML = cardTemplate({
      year: this.today.year,
      month: this.today.month,
      today: this.today.date,
      dots: this.localItemModel.dots(this.today.month)
    })

  }
}

export default Calendar