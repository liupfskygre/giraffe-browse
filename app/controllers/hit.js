const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/pages/hit.pug')
    , max = 1000

class hitController {
  constructor (req, res) {
    this.res = res
  }

  render (title, data, options, error) {
    let html = template({ title, data, options, error })
    this.res.send(html)
  }

  view (id, search) {
    let constraints = { _id: false }
    HitModel.findOne(id, constraints, (err, data) => {
      if (err) {
        this.render('Something went wrong', null, search, err)
      } else {
        this.render(data.attributes.ID, [ data ], search, null)
      }
    }).lean()
  }

  search (options) {
    let constraints =
	{ _id: true
        , 'contig.head': true
        , attributes: true
	, score: { $meta: 'textScore' }
	}
      , limit = options.limit < max ? parseInt(options.limit) : max
      , search = JSON.parse(JSON.stringify(options))
      , query = {}

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
        this.render('Something went wrong', null, options, err)
      } else {
        if (!data.length) {
          this.render('Search', null, search, 'No results.')
        } else {
          this.render('Search', data, search, null)
        }
      }
    })
  }
}

module.exports = hitController
