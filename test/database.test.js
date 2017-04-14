const dbUrl = 'mongodb://localhost:27017/test'
    , HitModel = require('../app/models/hit.js')
    , assert = require('assert')
    , mockHit = require('./mock/hit.json')
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
      HitModel.findOne({ uniprot: 'Q59X94' }, 'species name', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.species, 'tropicalis', 'data not saved correctly')
        assert.equal(result.name, 'C5_00810C_A', 'data not saved correctly')
        done()
      })
    })
  })

})
