const GeneModel = require('../models/gene.js')()
    , template = require('pug').compileFile(__dirname + '/../assets/templates/gene.pug')

class GeneController {
  constructor (req, res) {
    this.res = res
  }

  render (gene, err) {
    let html = template({ title: 'Gene', data: gene, error: err })
    this.res.send(html)
  }

  view (options) {
    let constraints = {}

    if (options._id) {
      constraints = { _id: false }
    } else {
      constraints = { _id: true, species: true }
    }

    GeneModel.find(options, constraints, (err, data) => {
      if (err) {
        this.render(null, err)
      } else {
        this.render(data, null)
      }
    })
  }
}

module.exports = GeneController
