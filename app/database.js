const MongoClient = require('mongodb')
    , ObjectId = require('mongodb').ObjectID

class Database {

  constructor (uri) {
    this.uri = uri
    this.db = {}
    return this
  }

  connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.uri, (err, db) => {
        if (err) reject(err)
        this.db = db
        resolve(this)
      })
    })
  }

  addTestGene (data) {
    return new Promise((resolve, reject) => {
      this.db.collection('sequences').save(
          data
        , { new: true, upsert: true }
        , (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })
  }

  findGene (options) {
    return new Promise((resolve, reject) => {
      let constraints = { _id: true, species: true }
      if (options._id) {
        options._id = ObjectId(options._id)
        constraints = { _id: false }
      }

      this.db.collection('sequences').find(options, constraints)
        .toArray((err, data) => {
          if (err) reject(err)
          if (data) {
            resolve(data)
          } else {
            resolve(0)
          }
        }
      )
    })
  }
}

module.exports = Database
