const template = require('pug').compileFile(__dirname + '/../assets/templates/pages/home.pug')

class homeController {
  constructor (req, res, meta) {
    this.res = res
    this.meta = meta
  }

  render () {
    let html = template({ title: 'GFF3 Browser', options: { }, meta: this.meta })
    this.res.send(html)
  }
}

module.exports = homeController
