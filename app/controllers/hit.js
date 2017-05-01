const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/pages/hit.pug')
    , max = 1000

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
      , score: { $meta: 'textScore' }
      }
  }

  render (hit, options, err) {
    let html = template({ title: 'Candida Hits', data: hit, options: options, error: err })
    this.res.send(html)
  }

  view (id, search) {
    let constraints = { _id: false }
    HitModel.findOne(id, constraints, (err, data) => {
      if (err) {
        this.render(null, search, err)
      } else {
        this.render([ data ], search, null)
      }
    })
  }

  search (options) {
    let constraints = this.searchConstraints
      , limit = options.limit < max ? parseInt(options.limit) : max
      , search = JSON.parse(JSON.stringify(options))
      , query = {}

    if (options['codingseq.seq']) {
      search['codingseq.seq'] = options['codingseq.seq']
      let seq = new RegExp(options['codingseq.seq'], 'i')
      query['codingseq.seq'] = seq
    }

    if (options.species) {
      query.species = options.species
    }

    if (!options.search) {
      delete constraints.score
    }

    let aggregateQuery = [ { $match: query }, { $project: constraints }, { $limit: limit } ]

    if (options.search) {
      query['$text'] = { '$search': options.search }
      let sort = { $sort: { score: { $meta: 'textScore' } } }
      aggregateQuery = [ { $match: query }, { $project: constraints }, sort, { $limit: limit } ]
    }

    HitModel.aggregate(aggregateQuery).allowDiskUse(true).exec((err, data) => {
      if (err) {
        this.render(null, options, err)
      } else {
        if (!data.length) {
          this.render(null, search, 'No results.')
        } else {
          this.render(data, search, null)
        }
      }
    })
  }
}

module.exports = hitController
