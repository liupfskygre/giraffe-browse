const assert = require('assert')
    , mockHit = require('./mock/hit.json')
    , findCodingRange = require('../scripts/find-coding-range.js')

describe('Hit', () => {

  it('should find the start of the coding sequence', (done) => {
    let result = findCodingRange(mockHit.codingseq.seq, mockHit.contig.seq)
    assert.equal(result.start, 5, 'Incorrect start sequence found')
    done()
  })

  it('should find the end of the coding sequence', (done) => {
    let result = findCodingRange(mockHit.codingseq.seq, mockHit.contig.seq)
    assert.equal(result.end, 297, 'Incorrect end sequence found')
    done()
  })

})
