const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/hit.pug')
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
    let html = template({ title: 'Hits', data: hit, options: options, error: err })
    this.res.send(html)
  }

  listKnown () {
    let query = { name: { $exists: true, $ne: null } }
      , constraints = this.searchConstraints

    HitModel.find(query, constraints, (err, data) => {
      if (err) {
        this.render(null, {}, err)
      } else {
        this.render(data, {}, null)
      }
    }).limit(100)
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
    let constraints = {}
      , limit = options.limit < max ? parseInt(options.limit) : max
      , search = JSON.parse(JSON.stringify(options))
      , query = options
      , sort = {}
      , aggQuery
      , origSeq

    delete options.limit

    query = {}
    constraints = this.searchConstraints

    if (options['codingseq.seq']) {
      origSeq = options['codingseq.seq']
      let seq = new RegExp(options['codingseq.seq'], 'i')
      query['codingseq.seq'] = seq
      delete search['codingseq.seq']
    }

    if (options.species) {
      query.species = options.species
    }

    if (!options.search) {
      delete constraints.score
    }

    aggQuery = [ { $match: query }, { $project: constraints }, { $limit: limit } ]

    if (options.search) {
      query['$text'] = { '$search': options.search }
      sort = { $sort: { score: { $meta: 'textScore' } } }
      aggQuery = [ { $match: query }, { $project: constraints }, sort, { $limit: limit } ]
    }

    search['codingseq.seq'] = origSeq

    HitModel.aggregate(aggQuery).allowDiskUse(true).exec((err, data) => {
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
