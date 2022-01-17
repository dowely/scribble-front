import TopBar from '../components/sub-menu/_topBar'
import SliderBar from '../components/sub-menu/_sliderBar'
import SearchField from '../components/sub-menu/_searchField'
import DateFilter from '../components/sub-menu/_dateFilter'

let hooks = {
  sliderBar: {
    mail: document.querySelector('.layout__control--b .layout__control__inner')
  }
}

class SubMenu {
  constructor(viewerLeft, viewerRight) {
    this.viewerLeft = viewerLeft
    this.viewerRight = viewerRight

    this.topBar = new TopBar()
    this.sliderBar = new SliderBar()
    this.searchField = new SearchField()
    this.dateFilter = new DateFilter()
  }

  render(route) {
    this.topBar.mail()
    this.sliderBar.render(hooks.sliderBar[route], route)
    this.searchField.mail(document.querySelector('.layout__control--d .layout__control__inner'))
    this.dateFilter.mail(document.querySelector('.layout__control--e .layout__control__inner'))
  }
}

export default SubMenu