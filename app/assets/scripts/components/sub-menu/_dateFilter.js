import dateFilterTemplate from '/app/assets/templates/components/sub-menu/_date-filter.ejs'

class DateFilter {
  constructor() {

  }

  mail(hook) {
    hook.innerHTML = dateFilterTemplate()
  }
}

export default DateFilter