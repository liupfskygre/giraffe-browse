const Database = require('../app/database')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    , assert = require('assert')

describe('Database', () => {
  let database
    , mockGene =
      { 'contig': 'C69229  4.0'
      , 'blast': 'XP_004983205.1 91.7  36  3 0 146 39  311 346 6.1e-09 68.2'
      , 'uniprot': 'K4AC16'
      , 'kegg': 'sita:101760397'
      , 'sequence': 'GAGGATCCTAACAATCTAGTAAGGCTTCGATT...'
      , 'species': 'boidinii'
      , 'protein':
        { 'head': 'tr|K4AC16|K4AC16_SETIT ...'
        , 'seq': 'MNIASAALVFLAHCLLLHRCMGSF...'
        }
      }

  beforeEach((done) => {
    database = new Database(dbUrl)
    database.connect()
      .then(() => {
        database.addTestGene(mockGene).then((data) => {
          mockGene._id = data._id
        }).catch((err) => { done(err) })
        done()
      }).catch((err) => { done(err) })
  })

  afterEach(() => {
    database.db.dropDatabase()
  })

  it('should search for gene from the database', (done) => {
    let testSearch = { uniprot: 'K4AC16' }
    database.findGene(testSearch).then((data) => {
      assert.equal(data.length, 1, 'wrong number of genes found')
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('should return gene based off of ID', (done) => {
    let testSearch = { _id: mockGene._id }
    database.findGene(testSearch).then((data) => {
      assert.equal(data[0].uniprot, 'K4AC16', 'incorrect data retrieved')
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
