const mongoose = require('mongoose')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/candida'

module.exports = (url = dbUrl) => {
  mongoose.Promise = global.Promise
  mongoose.connect(url, { useMongoClient: true })
  mongoose.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err)
  })
  return mongoose.connection
}
