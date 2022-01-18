import searchFieldTemplate from '/app/assets/templates/components/sub-menu/_search-field.ejs'

class SearchField {
  constructor(route) {
    this.route = route
  }

  render(hook) {
    hook.innerHTML = searchFieldTemplate({route: this.route})
  }
}

export default SearchField