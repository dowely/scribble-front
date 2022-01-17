import searchFieldTemplate from '/app/assets/templates/components/sub-menu/_search-field.ejs'

class SearchField {
  constructor() {

  }

  mail(hook) {
    hook.innerHTML = searchFieldTemplate({route: 'mail'})
  }
}

export default SearchField