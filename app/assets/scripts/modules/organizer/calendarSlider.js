import cardTemplate from '/app/assets/templates/organizer/_calendar-card.ejs'

class CalendarSlider {

  replacement = document.createElement('DIV')

  constructor(localItemModel, callback) {

    this.localItemModel = localItemModel
    this.callback = callback
  }

  prev(date) {
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth() - 1,
      today: date,
      dots: this.localItemModel.dots(date.getMonth() - 1)
    })

    console.log(this.replacement)

  }

  next(date) {
    
    this.replacement.innerHTML = cardTemplate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      today: date,
      dots: this.localItemModel.dots(date.getMonth() + 1)
    })

    console.log(this.replacement)

  }
}

export default CalendarSlider