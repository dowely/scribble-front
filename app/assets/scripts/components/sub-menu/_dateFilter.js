import dateFilterTemplate from '/app/assets/templates/sub-menu/_date-filter.ejs'

class DateFilter {
  constructor() {
    this.hook
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = dateFilterTemplate()
  }
}

export default DateFilter