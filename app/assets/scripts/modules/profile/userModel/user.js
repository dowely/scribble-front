const ee = require('event-emitter')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let image

const User = function(data) {

  this.name = data.name

  this.jobPosition = data.jobPosition

  this.phoneNumber = data.phoneNumber

  this.email = data.email

  this.joined = data.joined

  this.bio = data.bio

  image = data.image

}



Object.defineProperty(User.prototype, 'image', {

  get: function() {return image},

  set: function(blob) {
    
    image = blob
  
    this.emit('photoUpdate')
  }
  
})

Object.defineProperty(User.prototype, 'initials', {
  
  get: function() {

    if(this.name && this.name.indexOf(' ') !== -1) {

      return this.name.charAt(0).toUpperCase() + this.name.charAt(this.name.indexOf(' ') + 1).toUpperCase()

    } else if(this.name) {

      return this.name.charAt(0).toUpperCase()

    } else return undefined

    
}})

Object.defineProperty(User.prototype, 'joinedDate', {

  get: function() {

    const joined = new Date(this.joined)

    return `${months[joined.getMonth()]} ${joined.getDate()}, ${joined.getFullYear()}`
  }
})

ee(User.prototype)

module.exports = User