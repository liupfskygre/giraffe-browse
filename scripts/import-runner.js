const dataDir = __dirname + '/../data/'
const dataFiles =
    [
      { contigs: dataDir + 'ecoli.fa'
      , gff: dataDir + 'prokka-ecoli.gff'
      , name: 'ecoli'
      }
    ]
    , importSpecies = require('./import.js')
    , createDatabase = require('../app/database.js')
    , HitModel = require('../app/models/hit.js')

createDatabase()

HitModel.db.dropDatabase().then(() => {
  let data = dataFiles.map(importSpecies).reduce((a, b) => {
    return a.concat(b)
  }, [])

  data.push(require('../test/mock/split-bottom-hit.json')
          , require('../test/mock/split-top-hit.json')
          , require('../test/mock/reverse-hit.json')
          , require('../test/mock/missing-hit.json')
          , require('../test/mock/hit.json'))

  HitModel.db.collection('hits').insert(data, (err) => {
    if (err) console.log('ERROR: ' + err)

    // HitModel.db.collection('hits').createIndex(
    //   { name: 'text'
    //   , cgdid: 'text'
    //   , uniprot: 'text'
    //   , 'protein.desc': 'text'
    //   }
    // , { weights:
    //     { 'protein.desc': 8
    //     , name: 6
    //     , cgdid: 10
    //     , uniprot: 10
    //     }
    //   , name: 'hit_search_index'
    //   }
    // )

    HitModel.db.close(() => {
      console.log('Finished.')
      process.exit(0)
    })
  })
})
