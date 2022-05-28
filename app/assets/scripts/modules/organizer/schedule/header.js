const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class Header {

  node = document.querySelector('.schedule__header')

  p = document.querySelector('.schedule__header p')

  constructor() {}

  hideInitially() {

    this.node.classList.add('schedule__header--transparent')

    setTimeout(() => this.node.classList.remove('schedule__header--transparent'), 300)
  }

  render(monthRange) {

    const dateStr = this.parseString(monthRange)

    new Promise(res => {

      this.node.ontransitionend = e => {

        e.stopPropagation()

        res()

      }

      setTimeout(() => {

        this.node.ontransitioncancel = e => {

          e.stopPropagation()

          res()
        }

      }, 20)

      this.node.classList.add('schedule__header--faded')

    }).then(() => {

      this.p.textContent = dateStr

      this.node.classList.remove('schedule__header--faded')
    })

  }

  parseString(monthRange) {

    monthRange.forEach((edge, i, arr) => arr[i] = new Date(edge))

    const fields = new Map([

      ['startMonth', months[monthRange[0].getMonth()]],

      ['startYear', monthRange[0].getFullYear()],

      ['divider', '/'],

      ['endMonth', months[monthRange[1].getMonth()]],

      ['endYear', monthRange[1].getFullYear()]

    ])

    if(fields.get('startYear') === fields.get('endYear')) fields.delete('startYear')

    if(fields.get('startMonth') === fields.get('endMonth')) fields.delete('startMonth')

    if(fields.size === 3) fields.delete('divider')

    let dateStr = ''

    fields.forEach(field => dateStr += field + ' ')

    return dateStr

  }
}

export default new Header()