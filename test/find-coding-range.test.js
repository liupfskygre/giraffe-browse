const assert = require('assert')
    , mockHit = require('./mock/hit.json')
    , findCodingRange = require('../scripts/find-coding-range.js')

describe('Hit', () => {

  it('should find the start and end of the coding sequence', (done) => {
    let result = findCodingRange(mockHit.codingseq.seq, mockHit.contig.seq)
    assert.equal(result.start, 5, 'Incorrect start sequence found')
    assert.equal(result.end, 297, 'Incorrect end sequence found')
    assert.equal(result.fail, false, 'Fail flag set incorrectly')
    done()
  })

  it('should return fail if index not found', (done) => {
    mockHit.codingseq.seq = 'ACTGXXXACTG'
    let result = findCodingRange(mockHit.codingseq.seq, mockHit.contig.seq)
    assert.equal(result.fail, true, 'Fail flag set incorrectly')
    done()
  })

})
