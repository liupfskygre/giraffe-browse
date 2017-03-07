const MongoClient = require('mongodb')

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
      this.db.collection('test').save(
        data
      , { new: true, upsert: true }
      , (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })
  }

  findGene (data) {
    return new Promise((resolve, reject) => {
      this.db.collection(data.collection).findOne(
        data.search
      , { _id: false }
      , (err, data) => {
          if (err) reject(err)
          if (data) {
            resolve(data)
          } else {
            resolve(0)
          }
        })
    })
  }
}

module.exports = Database
