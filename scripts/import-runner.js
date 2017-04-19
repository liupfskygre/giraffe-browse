const dataDir = __dirname + '/../data/'
const dataFiles =
    [
      { contigs: dataDir + 'tropicalis/candida_tropicalis.fa'
      , proteins: dataDir + 'tropicalis/candida_tropicalis_proteins_go.fa'
      , codingseq: dataDir + 'tropicalis/candida_tropicalis_codingseq.fa'
      , blast: dataDir + 'tropicalis/blastx_tropicalis_codingseq_albicans_proteins.json'
      , name: 'tropicalis'
      }
    , { contigs: dataDir + 'boidinii/candida_boidinii.fa'
      , proteins: dataDir + 'boidinii/candida_boidinii_proteins_go.fa'
      , codingseq: dataDir + 'boidinii/candida_boidinii_codingseq.fa'
      , blast: dataDir + 'boidinii/blastx_boidinii_codingseq_albicans_proteins.json'
      , name: 'boidinii'
      }
    , { contigs: dataDir + 'shehate/candida_shehate.fa'
      , proteins: dataDir + 'shehate/candida_shehate_proteins_go.fa'
      , codingseq: dataDir + 'shehate/candida_shehate_codingseq.fa'
      , blast: dataDir + 'shehate/blastx_shehate_codingseq_albicans_proteins.json'
      , name: 'shehate'
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
          , require('../test/mock/missing-hit.json')
          , require('../test/mock/hit.json'))

  HitModel.db.collection('hits').insert(data, (err) => {
    if (err) console.log('ERROR: ' + err)

    HitModel.db.collection('hits').createIndex(
      { name: 'text'
      , cgdid: 'text'
      , uniprot: 'text'
      , 'protein.desc': 'text'
      }
    , { weights:
        { 'protein.desc': 8
        , name: 6
        , cgdid: 10
        , uniprot: 10
        }
      , name: 'hit_search_index'
      }
    )

    HitModel.db.close(() => {
      console.log('Finished.')
      process.exit(0)
    })
  })
})
