const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/pages/hit.pug')
    , max = 5000

class hitController {
  constructor (req, res, meta) {
    this.res = res
    this.meta = meta
  }

  render (title, data, options, error) {
    let html = template({ title, data, options, error, meta: this.meta })
    this.res.send(html)
  }

  view (id, search) {
    let constraints = { _id: false }
    HitModel.findOne(id, constraints, (err, data) => {
      if (err) {
        this.render('Something went wrong', null, search, err)
      } else {
        this.render('GENE VIEW', [ data ], search, null)
      }
    }).lean()
  }

  search (options) {
    let constraints = // { codingseq: false, proteinseq: false }
	{ _id: true
        , 'contig.head': true
        , start: true
        , end: true
        , length: true
        , type: true
        , 'attributes.ID': true
	}
      , search = JSON.parse(JSON.stringify(options))
      , limit = options.limit < max ? parseInt(options.limit) : max
      , attributes = {}

    delete options.limit

    if (options.fields) {
      for (let i = 0; i < options.fields.length; i++) {
        let search = options.inputs ? options.inputs[i] : false
        if (search.length) {
          attributes['attributes.' + options.fields[i]] = new RegExp(search, 'i')
        } else {
          attributes['attributes.' + options.fields[i]] = { $exists: true }
        }
        constraints['attributes.' + options.fields[i]] = true
      }

      delete options.fields
      delete options.inputs
    }

    for (let option in options) {
      options[option] = new RegExp(options[option], 'i')
    }

    Object.assign(options, attributes)

    HitModel.find(options, constraints, (err, data) => {
      if (err) {
        this.render('Something went wrong', null, options, err)
      } else {
        if (!data.length) {
          this.render('Search', null, search, 'No results.')
        } else {
          this.render('Search', data, search, null)
        }
      }
    }).limit(limit)
  }
}

module.exports = hitController
