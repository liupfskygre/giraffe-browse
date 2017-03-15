const dataFiles =
    [
      { contigs: '../data/boidinii/candida_boidinii.fa'
      , proteins: '../data/boidinii/proteins_GO.fa'
      , blast: '../data/boidinii/blast2go.json'
      , name: 'boidinii'
      }
    , { contigs: '../data/shehate/candida_660.fa'
      , proteins: '../data/shehate/proteins_GO.fa'
      , blast: '../data/shehate/blast2go.json'
      , name: 'shehate'
      }
    , { contigs: '../data/tropicalis/candida_Y4.fa'
      , proteins: '../data/tropicalis/proteins_GO.fa'
      , blast: '../data/tropicalis/blast2go.json'
      , name: 'tropicalis'
      }
    ]
    , importSpecies = require('./import.js')
    , GeneModel = require('../app/models/gene.js')()

GeneModel.db.dropDatabase().then(() => {
  let data = dataFiles.map(importSpecies).reduce((a, b) => {
    return a.concat(b)
  }, [])

  GeneModel.db.collection('genes').insert(data, (err) => {
    if (err) console.log('ERROR: ' + err)
    GeneModel.db.close(() => {
      console.log('Finished.')
      process.exit(0)
    })
  })
})
