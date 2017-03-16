const HitModel = require('../models/hit.js')()
    , template = require('pug').compileFile(__dirname + '/../assets/templates/hit.pug')

class hitController {
  constructor (req, res) {
    this.res = res
  }

  render (hit, err) {
    let html = template({ title: 'Hits', data: hit, error: err })
    this.res.send(html)
  }

  view (options) {
    let constraints = {}

    if (options._id) {
      constraints = { _id: false }
    } else {
      constraints = { _id: true, species: true }
    }

    HitModel.find(options, constraints, (err, data) => {
      if (err) {
        this.render(null, err)
      } else {
        this.render(data, null)
      }
    })
  }
}

module.exports = hitController
