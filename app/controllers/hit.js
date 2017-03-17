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
      , evalue: true
      , uniprot: true
      , refseq: true
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
    })
  }

  view (options) {
    let constraints = {}

    if (options._id) {
      constraints = { _id: false }
    } else {
      constraints = this.searchConstraints
    }

    HitModel.find(options, constraints, (err, data) => {
      if (!data.length) err = 'No results.'
      if (err) {
        this.render(null, err)
      } else {
        this.render(data, null)
      }
    })
  }
}

module.exports = hitController
