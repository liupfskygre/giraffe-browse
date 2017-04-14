const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/hit.pug')
    , max = 300

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

  render (hit, options, err) {
    let html = template({ title: 'Hits', data: hit, options: options, error: err })
    this.res.send(html)
  }

  listKnown () {
    let query = { name: { $exists: true, $ne: null } }

    HitModel.find(query, this.searchContraints, (err, data) => {
      if (err) {
        this.render(null, {}, err)
      } else {
        this.render(data, {}, null)
      }
    }).limit(100)
  }

  view (options) {
    let constraints = {}
      , limit = options.limit < max ? parseInt(options.limit) : max
      , search = JSON.parse(JSON.stringify(options))

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
        this.render(null, options, err)
      } else {
        if (!data.length) {
          this.render(null, search, 'No results.')
        } else {
          this.render(data, search, null)
        }
      }
    }).limit(limit)
  }
}

module.exports = hitController
