const MetadataModel = require('../models/metadata.js')

class ContigController {
  constructor (req, res) {
    this.res = res
  }

  getMeta () {
    return new Promise((resolve, reject) => {
      let constraints = { _id: false }

      MetadataModel.findOne({}, constraints, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = ContigController
