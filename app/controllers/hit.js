const HitModel = require('../models/hit.js')
    , template = require('pug').compileFile(__dirname + '/../assets/templates/pages/hit.pug')
    , max = 500

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
        this.render('GiraFFe Browse', [ data ], search, null)
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
        // TypeError: Cannot read property 'length' of undefined
        // at hitController.search (/home/owg1/Projects/candida-website/app/controllers/hit.js:46:20)

        if (search && search.length) {
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
          this.render('GiraFFe Browse', null, search, 'No results.')
        } else {
          this.render('GiraFFe Browse', data, search, null)
        }
      }
    }).limit(limit)
  }
}

module.exports = hitController
