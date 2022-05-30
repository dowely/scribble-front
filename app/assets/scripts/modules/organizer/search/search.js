import searchTerm from "./searchTerm"
import dateFilter from "./dateFilter"
import Result from "./result"
import searchTemplate from "./templates/_search.ejs"

class Search {

  ellipsis = document.querySelector('.top-bar-organizer__ellipsis-tap-area')

  hook = document.querySelector('.content__right-col .content__viewer')

  div = document.createElement('DIV')

  node

  list

  count

  results

  observer = new MutationObserver(this.onNodeDetachment.bind(this))

  constructor(views, localItemModel) {

    this.views = views

    this.localItemModel = localItemModel

    this.div.innerHTML = searchTemplate()

    this.node = this.div.querySelector('.item-search')

    this.list = this.node.querySelector('.item-search__list')

    this.count = this.node.querySelector('.item-search__heading span')

    this.observer.observe(this.hook, {childList: true})

    this.events()

  }

  events() {

    this.ellipsis.addEventListener('click', () => {

      this.views.search()

      if(this.views.viewState.subMenu === 'search') {

        searchTerm.clear()

      } else if(this.hook.contains(this.node)) {

        setTimeout(() => this.views.render('left'), 350)

      }

    })

    searchTerm.on('input', term => {

      if(!term) {
        
        this.views.render('left')

      } else if(!dateFilter.error) {

        this.displayResults({term})

      } else console.log(dateFilter.error)

    })

    this.localItemModel.on('itemEdit', item => {

      if(this.hook.contains(this.node)) {

        const resultToEdit = this.results.find(result => result.item.id == item.id)

        if(resultToEdit) resultToEdit.render(item)
       
      }

    })

    this.localItemModel.on('itemRemoved', itemToRemove => {

      if(this.hook.contains(this.node)) {

        const resultToRemove = this.results.find(result => result.item.id == itemToRemove.id)

        if(resultToRemove) {

          resultToRemove.transitionOut()

          this.count.textContent = Number(this.count.textContent) - 1

        }

      }
    })
  }

  displayResults(query) {

    const resultItems = this.localItemModel.getItemsByQuery(query)

    this.results = resultItems.map(item => new Result(item))

    this.list.innerHTML = ''

    this.results.forEach(result => this.appendResult(result))

    this.count.textContent = this.results.length

    if(!this.hook.contains(this.node)) this.views.render('right', this.node)

    this.emit('newResults', this.results.map(result => result.node))

  }

  appendResult(result) {

    const li = document.createElement('LI')

    li.className = "item-search__card-container"

    li.appendChild(result.node)

    this.list.appendChild(li)

  }

  onNodeDetachment() {

    if(!this.hook.contains(this.node)) {

      searchTerm.clear()
    }
  }
}

export default Search