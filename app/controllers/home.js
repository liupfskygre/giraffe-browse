const template = require('pug').compileFile(__dirname + '/../assets/templates/pages/home.pug')

class homeController {
  constructor (req, res) {
    this.res = res
  }

  render () {
    let html = template({ title: 'GFF3 Browser', options: { } })
    this.res.send(html)
  }
}

module.exports = homeController
