const dbUrl = 'mongodb://localhost/test'
    , HitModel = require('../app/models/hit.js')(dbUrl)
    , assert = require('assert')

describe('Database', () => {
  let hit =
    { hitid: 'gi|68475779|ref|XP_718096.1|'
    , species: 'tropicalis'
    , def: 'hypothetical protein CaO19.5760 [Candida albicans SC5314]'
    , name: 'IHD1'
    , accession: 'XP_718096'
    , uniprot: 'Q5A8I8'
    , cgdid: 'CAL0000194292'
    , refseq: 'XP_718096'
    , len: '392'
    , bitscore: '144.436'
    , evalue: '1.81006e-37'
    , qfrom: '1'
    , qto: '100'
    , hfrom: '1'
    , hto: '100'
    , gaps: '0'
    , alignlen: '100'
    , contig:
      { head: 'scaffold9'
      , seq: 'CCCAACTTTGCTCGATGAGTATCAACAAT...'
      }
    , protein:
      { head: 'scaffold9.g322.t1 hypothetical GPI-anchored|GO:0016020'
      , seq: 'mrkttlffallqialaakradddcndhctaalakqnscggsgdagtqsetlkclckdedyw...'
      , headid: 'scaffold9.g322.t1'
      , goids: [ 'GO:0016020' ]
      }
    }

  afterEach(() => {
    HitModel.db.dropDatabase()
  })

  it('should save & find a new gene', (done) => {
    HitModel.create(hit, () => {
      HitModel.findOne({ uniprot: 'Q5A8I8' }, 'species name', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.species, 'tropicalis', 'data not saved correctly')
        assert.equal(result.name, 'IHD1', 'data not saved correctly')
        done()
      })
    })
  })
})
