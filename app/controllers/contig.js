const ContigModel = require('../models/contig.js')

class ContigController {
  constructor (req, res) {
    this.res = res
  }

  view (id) {
    let constraints = { _id: false }

    ContigModel.findOne(id, constraints, (err, data) => {
      if (err) {
        this.res.status(404).send('Contig not found! Sorry :(')
      } else {
        let contig = '>' + data.head + '\n' + data.seq
        this.res.setHeader('content-type', 'text/pain')
        this.res.status(200).send(contig)
      }
    })
  }
}

module.exports = ContigController
