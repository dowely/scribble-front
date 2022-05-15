class CalendarDots {
  constructor() {}

  static update(itemDate) {

    let atIndex = 0

    const dots = document.querySelector(`.calendar-card__date-container[data-id="${itemDate}"] .calendar-card__item-dots`)

    const model = CalendarDots.createModel(dots, document.querySelector(`.calendar-display__item-group[data-id="${itemDate}"]`))

    model.forEach(itemType => {

      const [type, before, after] = itemType

      if(before + after === 2) atIndex++

      if(before > after) CalendarDots.remove(dots, atIndex)

      if(before < after) CalendarDots.add(dots, atIndex, type)

    })
  }

  static createModel(dots, itemGroup) {

    const schema = ['task', 'event', 'meeting', 'note']

    const model = schema.map(itemType => [
      
      itemType,

      dots.querySelector(`.calendar-card__item-dot--${itemType}`) ? 1 : 0,

      !itemGroup ? 0 : itemGroup.querySelector(`.item-card[data-card-type="${itemType}"]`) ? 1 : 0

    ])

    return model

  }

  static remove(dots, atIndex) {

    if(atIndex === dots.children.length - 1) CalendarDots.pop(dots)
    else CalendarDots.splice(dots, atIndex)

  }

  static add(dots,  atIndex, type) {

  }

  static pop(dots) {

    const dot = dots.lastElementChild

    new Promise(res => {

      dot.ontransitionend = dot.ontransitioncancel = res

      dot.classList.add('calendar-card__item-dot--implode')

    }).then(() => dot.remove())

  }

  static splice(dots, atIndex) {

    const dot = dots.children[atIndex]

    new Promise(res => {

      dot.ontransitionend = dot.ontransitioncancel = res

      dot.classList.add('calendar-card__item-dot--implode')

    }).then(() => dot.remove())
    
  }

}

export default CalendarDots