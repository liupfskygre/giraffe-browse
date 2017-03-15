const dataDir = __dirname + '/../data/'
const dataFiles =
    [
      { contigs: dataDir + 'tropicalis/candida_Y4.fa'
        , proteins: dataDir + 'tropicalis/proteins_GO.fa'
        , blast: dataDir + 'tropicalis/blast2go.json'
        , name: 'tropicalis'
      }
    , { contigs: dataDir + 'shehate/candida_660.fa'
        , proteins: dataDir + 'shehate/proteins_GO.fa'
        , blast: dataDir + 'shehate/blast2go.json'
        , name: 'shehate'
      }
    // Commented out so it fits on heroku for free
    // , { contigs: dataDir + 'boidinii/candida_boidinii.fa'
    //   , proteins: dataDir + 'boidinii/proteins_GO.fa'
    //   , blast: dataDir + 'boidinii/blast2go.json'
    //   , name: 'boidinii'
    //   }
    ]
    , importSpecies = require('./import.js')
    , GeneModel = require('../app/models/gene.js')()

GeneModel.db.dropDatabase().then(() => {
  let data = dataFiles.map(importSpecies).reduce((a, b) => {
    return a.concat(b)
  }, [])

  GeneModel.db.collection('hits').insert(data, (err) => {
    if (err) console.log('ERROR: ' + err)
    GeneModel.db.close(() => {
      console.log('Finished.')
      process.exit(0)
    })
  })
})
