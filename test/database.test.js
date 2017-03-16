const dbUrl = 'mongodb://localhost:27017/test'
    , HitModel = require('../app/models/hit.js')(dbUrl)
    , assert = require('assert')
    , mockHit = require('./mock/hit.js')()

describe('Database', () => {

  afterEach((done) => {
    HitModel.db.dropDatabase().then(() => {
      done()
    })
  })

  it('should save & find a new gene', (done) => {
    HitModel.create(mockHit, () => {
      HitModel.findOne({ uniprot: 'Q5A8I8' }, 'species name', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.species, 'tropicalis', 'data not saved correctly')
        assert.equal(result.name, 'IHD1', 'data not saved correctly')
        done()
      })
    })
  })

})
