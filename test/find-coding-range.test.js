const assert = require('assert')
    , hit = require('./mock/hit.json')
    , splitTopHit = require('./mock/split-top-hit.json')
    , splitBottomHit = require('./mock/split-bottom-hit.json')
    , missingHit = require('./mock/missing-hit.json')
    , findCodingRange = require('../scripts/find-coding-range.js')

describe('Hit', () => {

  it('should find the start and end of the coding sequence', (done) => {
    let start = hit.codingRange.start
    , end = hit.codingRange.end
    , result = findCodingRange(hit.codingseq.seq, hit.contig.seq)

    assert.equal(result.start, start, 'Incorrect start sequence found')
    assert.equal(result.end, end, 'Incorrect end sequence found')
    assert.equal(result.fail, false, 'Fail flag set incorrectly')
    done()
  })

  it('should find a split coding sequence across top of contig', (done) => {
    let start = splitTopHit.codingRange.start
      , end = splitTopHit.codingRange.end
      , result = findCodingRange(splitTopHit.codingseq.seq, splitTopHit.contig.seq)

    assert.equal(result.start, start, 'Incorrect start sequence found')
    assert.equal(result.end, end, 'Incorrect end sequence found')
    assert.equal(result.fail, false, 'Fail flag set incorrectly')
    done()
  })

  it('should find a split coding sequence across bottom of contig', (done) => {
    let start = splitBottomHit.codingRange.start
      , end = splitBottomHit.codingRange.end
      , result = findCodingRange(splitBottomHit.codingseq.seq, splitBottomHit.contig.seq)

    assert.equal(result.start, start, 'Incorrect start sequence found')
    assert.equal(result.end, end, 'Incorrect end sequence found')
    assert.equal(result.fail, false, 'Fail flag set incorrectly')
    done()
  })

  it('should return fail if index not found', (done) => {
    let result = findCodingRange(missingHit.codingseq.seq, missingHit.contig.seq)
    assert.equal(result.fail, true, 'Fail flag set incorrectly')
    done()
  })

})
