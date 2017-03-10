const dbUrl = 'mongodb://localhost/test'
    , GeneModel = require('../app/models/gene.js')(dbUrl)
    , assert = require('assert')

describe('Database', () => {
  let gene =
    { contig: 'C69229  4.0'
    , blast: 'XP_004983205.1 91.7  36  3 0 146 39  311 346 6.1e-09 68.2'
    , uniprot: 'K4AC16'
    , kegg: 'sita:101760397'
    , sequence: 'GAGGATCCTAACAATCTAGTAAGGCTTCGATT...'
    , species: 'boidinii'
    , protein:
      { head: 'tr|K4AC16|K4AC16_SETIT ...'
      , seq: 'MNIASAALVFLAHCLLLHRCMGSF...'
      }
    }

  afterEach(() => {
    GeneModel.db.dropDatabase()
  })

  it('should save & find a new gene', (done) => {
    GeneModel.create(gene, () => {
      GeneModel.findOne({ uniprot: 'K4AC16' }, 'species', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.species, 'boidinii', 'data not saved correctly')
        done()
      })
    })
  })
})
