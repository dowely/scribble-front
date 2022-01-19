import searchFieldTemplate from '/app/assets/templates/components/sub-menu/_search-field.ejs'

class SearchField {
  constructor(route) {
    this.route = route

    this.hook
  }

  render(hook) {
    this.hook = hook
    this.hook.innerHTML = searchFieldTemplate({route: this.route})
  }
}

export default SearchField