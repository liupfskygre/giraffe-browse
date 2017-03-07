const Database = require('../database')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/candida'
    , template = require('jade').compileFile(__dirname + '/../assets/templates/gene.jade')

class GeneController {
  constructor (req, res) {
    this.res = res
  }

  render (gene, err) {
    let html = template({ title: 'Gene', data: gene, error: err })
    this.res.send(html)
  }

  view (options) {
    let db = new Database(dbUrl)
      , database = db.connect().catch((err) => {
        this.render(null, err)
      })

    database.then(() => {
      db.findGene(options).then((data) => {
        this.render(data, null)
      }).catch((err) => {
        this.render(null, err)
      })
    })
  }
}

module.exports = GeneController
