const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/hit.pug')

class hitController {
  constructor (req, res) {
    this.res = res
    this.searchConstraints =
      { _id: true
      , name: true
      , species: true
      , cgdid: true
      , uniprot: true
      , 'protein.desc': true
      }
  }

  render (hit, err) {
    let html = template({ title: 'Hits', data: hit, error: err })
    this.res.send(html)
  }

  listKnown () {
    let query = { name: { $exists: true, $ne: null } }

    HitModel.find(query, this.searchContraints, (err, data) => {
      if (err) {
        this.render(null, err)
      } else {
        this.render(data, null)
      }
    }).limit(100)
  }

  view (options) {
    let constraints = {}
      , limit = options.limit < 50 ? options.limit : 50

    delete options.limit

    if (options._id) {
      constraints = { _id: false }
    } else {
      constraints = this.searchConstraints
      for (let option in options) {
        options[option] = new RegExp(options[option], 'i')
      }
    }

    HitModel.find(options, constraints, (err, data) => {
      if (err) {
        this.render(null, err)
      } else {
        if (!data.length) {
          this.render(null, 'No results.')
        } else {
          this.render(data, null)
        }
      }
    }).limit(limit)
  }
}

module.exports = hitController
