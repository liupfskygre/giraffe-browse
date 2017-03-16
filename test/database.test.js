const dbUrl = 'mongodb://localhost:27017/test'
    , HitModel = require('../app/models/hit.js')
    , assert = require('assert')
    , mockHit = require('./mock/hit.js')()
    , connectDatabase = require('../app/database.js')

connectDatabase(dbUrl)

describe('Database', () => {

  afterEach((done) => {
    HitModel.db.dropDatabase().then(() => {
      done()
    })
  })

  it('should save & find a new gene', (done) => {
    HitModel.create(mockHit, () => {
      HitModel.findOne({ uniprot: 'P0CY34' }, 'species name', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.species, 'shehate', 'data not saved correctly')
        assert.equal(result.name, 'TUP1', 'data not saved correctly')
        done()
      })
    })
  })

})
