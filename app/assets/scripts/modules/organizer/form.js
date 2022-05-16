import formTemplate from '/app/assets/templates/organizer/_item-form.ejs'

class Form {

  backTo

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

  }

  createNode(config) {

    const container = document.createElement('DIV')

    container.innerHTML = formTemplate({formType: config.type})

    const node = container.querySelector('.item-form')

    this.events(node)

    return node
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
}

export default Form

/**
{
  "id": 7611,
  "title": "Clean out the garage",
  "description": "For this reason, dummy text usually consists of a more or less random series of words.",
  "dueDate": "2 Feb 2022",
  "status": "done"
}
*/