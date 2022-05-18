import formTemplate from '/app/assets/templates/organizer/_item-form.ejs'

class Form {

  backTo

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

  }

  createNode(config) {

    const date = config.selectedDate ? new Date(config.selectedDate) : undefined

    const container = document.createElement('DIV')

    container.innerHTML = formTemplate({formType: config.type})

    const node = container.querySelector('.item-form')

    if(date) this.populateDateFields(node, date)

    this.events(node)

    return node
  }

  populateDateFields(node, dateObj) {

    const fields = node.elements

    fields["day"].value = dateObj.getDate()

    fields["month"].value = dateObj.getMonth() + 1

    fields["year"].value = dateObj.getFullYear()
  }

  events(formNode) {

    formNode.addEventListener('submit', this.save.bind(this))

    formNode.querySelector('.btn--form-discard').addEventListener('click', () => this.emit('discard'))

    formNode.querySelectorAll('label[for="pending"], label[for="inProgress"]').forEach(label => {

      label.addEventListener('click', e => {

        for(let j of label.parentElement.children) {

          j.removeAttribute("data-check")
        }

        label.setAttribute('data-check', "")

      })

    })

  }

  save(e) {

    e.preventDefault()

    const item = this[e.target.dataset.type](e.target.elements)

    this.emit('newItem', item)
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

    const item = {

      type: 'event',
      event: true,
      title: fields["title"],
      eventDate: simpleDate,

    }

  }
}

export default Form

/**
{
      "id": 6599,
      "title": "Semifinals on TV",
      "eventDate": "5 Feb 2022",
      "eventTime": "20:15 - 22:30",
      "eventStart": "8:15 PM",
      "venue": "on TV",
      "reminder": "30 min before"
    }
*/