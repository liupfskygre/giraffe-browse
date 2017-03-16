const HitModel = require('../app/models/hit.js')()
    , assert = require('assert')

describe('Hit', () => {

  let mockHit =
    { refseq: 'XP_719068'
    , len: '512'
    , bitscore: '115.161'
    , evalue: '3.09451e-28'
    , qfrom: '3'
    , qto: '60'
    , hfrom: '1'
    , hto: '58'
    , gaps: '0'
    , alignlen: '58'
    , contig:
      { head: 'C381466'
      , seq: `
	  AAAAACGAGAGAAAAAAAAAATTCTTCCTTTCAACGAAAACAAAAGCCCAA
	  CATCATGTCTATGTATCCACAACGTACACAGCATCAACAACGTTTGACTGA
	  GTTGTTGGACGCTATCAAGTCTGAGTTTGATTATGCTTTAAACGAAGCCAG
	  CAGTTTCAAAAAGGTCCAAGAAGACTATGACACCAAGTACCAGCAACAAGC
	  TGCTGAAATGCAACAAATCCGTCAAACTGTTTACGAATTGGAAATGGCACA
	  CAGAAAAATCAAAGAAGCATACGAAGAGGAAATTTTAAGATTGAAAAACGA
	  GTTGGACAATAGAGATAGACAAATGAAAAATGGTTACCAACAACCTCCTCC
	  TCCCCAAACTCAACCACAACAACAACCACAACAAC
        `
      }
    }
  , hit

  beforeEach((done) => {
    mockHit.contig.seq = mockHit.contig.seq.replace(/[^ACTG]/g, '')
    hit = new HitModel(mockHit)
    done()
  })

  // https://github.com/Automattic/mongoose/issues/1251
  after((done) => {
    HitModel.db.models = {}
    HitModel.db.modelSchemas = {}
    HitModel.db.close()
    done()
  })

  it.skip('should find the matching hit sequence', (done) => {
    assert.equal(hit.findHitSeq(), 'correct hit', 'Incorrect sequence found')
    done()
  })

})
