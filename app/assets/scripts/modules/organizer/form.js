import formTemplate from '/app/assets/templates/organizer/_item-form.ejs'

class Form {

  backTo

  mode

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

  }

  createNode(config) {

    const container = document.createElement('DIV')

    container.innerHTML = formTemplate({formType: config.type})

    const node = container.querySelector('.item-form')

    if(config.item) {

      node.itemId = config.item.id

      this.populateItemFields(node, config.item)

    } else if(config.selectedDate) {

      const date = new Date(config.selectedDate)

      this.populateDateFields(node, date)

    } 

    this.events(node)

    return node
  }

  populateItemFields(node, itemObj) {

    const fields = node.elements

    const date = new Date(itemObj.date)

    const type = itemObj.type.charAt(0).toUpperCase() + itemObj.type.slice(1)

    fields["title"].value = itemObj.title

    fields["day"].value = date.getDate()

    fields["month"].value = date.getMonth() + 1

    fields["year"].value = date.getFullYear()

    this[`populate${type}Fields`](node, itemObj)

  }

  populateNoteFields(node, itemObj) {

    const fields = node.elements

    fields["body"].value = itemObj.body
  }

  populateDateFields(node, dateObj) {

    const fields = node.elements

    fields["day"].value = dateObj.getDate()

    fields["month"].value = dateObj.getMonth() + 1

    fields["year"].value = dateObj.getFullYear()
  }

  events(formNode) {

    formNode.addEventListener('submit', e => {

      this.save(e, formNode.itemId)
    })

    formNode.querySelector('.btn--form-discard').addEventListener('click', () => this.emit('discard'))

    const taskCheckboxes = formNode.querySelectorAll('label[for="pending"], label[for="inProgress"]')

    taskCheckboxes.forEach(label => {

      label.addEventListener('click', e => {

        for(let j of label.parentElement.children) {

          j.removeAttribute("data-check")
        }

        label.setAttribute('data-check', "")

      })

    })

    const toggler = formNode.querySelector('.toggler')

    const amPmLabels = formNode.querySelectorAll('label[for="am"], label[for="pm"]')

    if(toggler) {

      toggler.addEventListener('click', () => {

        if(toggler.toggleAttribute('data-toggled')) {
  
          amPmLabels[0].removeAttribute('data-check')
          amPmLabels[0].firstElementChild.checked = false
  
          amPmLabels[1].setAttribute('data-check', '')
          amPmLabels[1].firstElementChild.checked = true
  
        } else {
  
          amPmLabels[1].removeAttribute('data-check')
          amPmLabels[1].firstElementChild.checked = false
  
          amPmLabels[0].setAttribute('data-check', '')
          amPmLabels[0].firstElementChild.checked = true
  
        }
      })

      amPmLabels.forEach((label, i) => {

        label.addEventListener('click', () => {

          const other = i === 0 ? 1 : 0

          amPmLabels[i].setAttribute('data-check', '')
          amPmLabels[i].firstElementChild.checked = true

          amPmLabels[other].removeAttribute('data-check')
          amPmLabels[other].firstElementChild.checked = false

          if(i === 1) toggler.setAttribute('data-toggled', '')
          else toggler.removeAttribute('data-toggled')

        })

      })
    }

    const reminderLabels = formNode.querySelectorAll('label[for="reminderMin"], label[for="reminderHour"], label[for="reminderDay"]')

    if(reminderLabels.length > 0) {

      reminderLabels.forEach(label => label.addEventListener('click', () => {

        reminderLabels.forEach(label => {

          label.removeAttribute('data-check')

          label.querySelector('input[type="radio"]').checked = false
        })

        label.setAttribute('data-check', '')

        label.querySelector('input[type="radio"]').checked = true

      }))
    }

    const incrementor = formNode.querySelector('.item-form__incrementor')

    if(incrementor) {

      incrementor.addEventListener('click', e => {

        const angle = e.target.closest('SVG')
  
        const action = [...angle.parentElement.children].indexOf(angle) === 1 ? -15 : 15
  
        let fieldValue = Number(formNode["duration"].value)
  
        if(fieldValue + action >= 0 && fieldValue + action <= 480) {
  
          fieldValue += action
  
          formNode["duration"].value = fieldValue
  
        }
      })
    }

    const attList = formNode.querySelector('.item-form__attendees__list')

    if(attList) {

      const attSearchField = formNode.querySelector('#userSearch')

      const attSelect = formNode.querySelector('#attendeesSelect')

      const attRemoveBtns = formNode.querySelectorAll('.item-form__attendees__list button')

      this.removeAtt(attRemoveBtns)

      attSearchField.addEventListener('input', () => {

        const matchingOptions = this.searchAtt(attSearchField.value, attSelect.options)

        if(matchingOptions.length === 2) {

          attSelect.size = 2

          for(const option of attSelect.options) {

            option.style.display = 'none'
    
            if(matchingOptions.find(opt => opt === option)) option.style.display = 'flex'
          }

        } else if(matchingOptions.length === 1) {

          attSelect.size = 1

          for(const option of attSelect.options) {

            option.style.display = 'none'
    
            if(matchingOptions.find(opt => opt === option)) option.style.display = 'flex'
          }

        } else {

          attSelect.size = 1

          for(const option of attSelect.options) {

            option.style.display = 'none'

          }
        }
      })

      attSelect.addEventListener('change', () => {

        let newList = ''

        for(const selOpt of attSelect.selectedOptions) {

          newList += `<li><h6>${selOpt.text}</h6><button type="button">remove</button></li>\n`
        }

        attList.innerHTML = newList

        this.removeAtt(attList.querySelectorAll('button'))

      })

      attList.addEventListener('removeAtt', e => {

        for(const opt of attSelect.options) {

          if(opt.text === e.attendee) opt.selected = false
        }

        attSelect.dispatchEvent(new Event('change'))
      })

    }

  }

  removeAtt(btns) {

    for(const btn of btns) {

      btn.addEventListener('click', e => {

        const list = e.target.closest('.item-form__attendees__list')

        const event = new Event('removeAtt')

        event.attendee = btn.previousElementSibling.textContent

        list.dispatchEvent(event)
      })
    }
  }

  searchAtt(term, options) {

    const matchingOptions = []

    if(term.length === 0) return matchingOptions

    for(const option of options) {

      if(option.text.toUpperCase().indexOf(term.toUpperCase()) >= 0) matchingOptions.push(option)
    }

    return matchingOptions
  }

  save(e, id) {

    e.preventDefault()

    const item = this[e.target.dataset.type](e.target.elements)

    item.id = id

    this.emit(this.mode, item)
  }

  task(fields) {

    const date = new Date(fields["year"].value, fields["month"].value - 1, fields["day"].value)

    const overdue = date.getTime() + 8.64e+7 < new Date().getTime() ? true : false

    const simpleDate = this.localItemModel.simpleDate(date)

    const item = {

      type: 'task',
      task: true,
      title: fields["title"].value,
      description: fields["description"].value,
      dueDate: simpleDate,
      status: overdue ? 'overdue' : fields["taskStatus"].value === 'inProgress' ? 'in progress' : 'pending',
      date: simpleDate,
      fullDate: this.localItemModel.getFullDate(simpleDate)
    }

    return item
  }

  note(fields) {

    const date = new Date(fields["year"].value, fields["month"].value - 1, fields["day"].value)

    const simpleDate = this.localItemModel.simpleDate(date)

    const item = {

      type: 'note',
      note: true,
      title: fields["title"].value,
      pinDate: simpleDate,
      body: fields["body"].value,
      date: simpleDate,
      fullDate: this.localItemModel.getFullDate(simpleDate)
    } 

    return item
  }

  event(fields) {

    const date = new Date(fields["year"].value, fields["month"].value - 1, fields["day"].value)

    const simpleDate = this.localItemModel.simpleDate(date)

    const start = `${fields["hour"].value}:${fields["min"].value.padStart(2, '0')} ${fields["dayTime"].value.toUpperCase()}`

    const time = this.calculateTime(fields["hour"].value, fields["min"].value, fields["dayTime"].value, fields["duration"].value)

    const reminder = `${fields["reminderBase"].value} ${fields["reminderMultiplier"].value} before`

    const item = {

      type: 'event',
      event: true,
      title: fields["title"].value,
      eventDate: simpleDate,
      eventTime: time,
      eventStart: start,
      venue: fields["venue"].value,
      reminder,
      date: simpleDate,
      fullDate: this.localItemModel.getFullDate(simpleDate)
    }

    return item

  }

  meeting(fields) {

    const date = new Date(fields["year"].value, fields["month"].value - 1, fields["day"].value)

    const simpleDate = this.localItemModel.simpleDate(date)

    const start = `${fields["hour"].value}:${fields["min"].value.padStart(2, '0')} ${fields["dayTime"].value.toUpperCase()}`

    const time = this.calculateTime(fields["hour"].value, fields["min"].value, fields["dayTime"].value, fields["duration"].value)

    const reminder = `${fields["reminderBase"].value} ${fields["reminderMultiplier"].value} before`

    const attendees = this.getAttendees(fields[0].form.querySelector('.item-form__attendees__list'))

    const item = {

      type: 'meeting',
      meeting: true,
      title: fields["title"].value,
      meetingDate: simpleDate,
      meetingTime: time,
      meetingStart: start,
      attendees: attendees,
      status: 'pending',
      reminder,
      date: simpleDate,
      fullDate: this.localItemModel.getFullDate(simpleDate)
    }

    return item

  }

  getAttendees(ul) {

    const attendees = []

    for(const li of ul.children) {

      attendees.push(li.querySelector('H6').textContent)
    }

    return attendees.join(', ')
  }

  calculateTime(startHour, startMin, dayTime, durationMin) {

    let endHour = startHour = Number(startHour)
    
    let endMin = startMin = Number(startMin)

    if(dayTime.toUpperCase() === 'PM') endHour = startHour += 12

    for(let min = 1; min <= durationMin; min++) {

      if(endMin + 1 === 60) {

        endMin = 0

        endHour++

      } else endMin++

      if(endHour === 24) endHour = 0
      
    }

    const timeStr = `${startHour}:${startMin.toString().padStart(2, '0')} - ${endHour}:${endMin.toString().padStart(2, '0')}`

    return timeStr

  }

  static isItemInDisplayedMonth(item, displayedMonth) {

    let itemDate = new Date(item.date)

    let displayedDate = new Date(displayedMonth)

    itemDate.setDate(1)

    displayedDate.setDate(1)

    return itemDate.getTime() === displayedDate.getTime()

  }

}

export default Form

/**
  {
      "id": 2247,
      "title": "Calendar app kick-off",
      "meetingDate": "25 Feb 2022",
      "meetingTime": "11:30 - 12:15",
      "meetingStart": "11:30 AM",
      "attendees": "James Adams, Julie Cruz",
      "status": "accepted",
      "past": false,
      "reminder": "1 hour before"
    }
*/