import TopBar from '../components/sub-menu/_topBar'

class SubMenu {
  constructor() {
    this.topBar = new TopBar()
  }

  mail() {
    this.topBar.mail()
  }
}

export default SubMenu