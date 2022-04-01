const items = require('./app/db/items.json')
const ItemServer = require('./app/db/itemServer.js')

const itemServer = new ItemServer(items)

switch(process.argv[2]) {

  case 'dots':

    console.log(itemServer.dots(1))

  break

  case 'groupedItems':

    console.log(itemServer.groupedItems(1))

  break

  default: console.log('Provide an argument for type of test')
}