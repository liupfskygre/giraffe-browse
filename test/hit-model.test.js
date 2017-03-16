const HitModel = require('../app/models/hit.js')
    , assert = require('assert')
    , mockHit = require('./mock/hit.js')()

describe('Hit', () => {

  let hit

  beforeEach(() => {
    hit = new HitModel(mockHit)
  })

  it('should find the matching hit sequence', (done) => {
    assert.equal(hit.findHitSeq(), 'correct hit', 'Incorrect sequence found')
    done()
  })

})
