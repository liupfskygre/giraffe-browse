const fasta2json = require('fasta2json')
    , gff2json = require('bionode-gff')
    , species =
      { contigs: __dirname + '/../data/ecoli-split.gff'
      , gff: __dirname + '/../data/prokka-ecoli-split.gff'
      , name: 'ecoli'
      }
    , createDatabase = require('../app/database.js')
    , HitModel = require('../app/models/hit.js')

createDatabase()

HitModel.db.dropDatabase().then(() => {
  let contigs = fasta2json.ReadFasta(species.contigs)

  gff2json.read(species.gff).on('data', (data) => {
    let contig = contigs.find(x => x.head.split(' ')[0] === data.seqid)
      , cds = contig.seq.substr(data.start, data.end) // this needs to be checked, and probably reverse complimented
      , hit = Object.assign({ species: species.name, contig, cds }, data)

    HitModel.create(hit, (err) => {
      if (err) console.log('ERROR: ' + err)
    })

  }).on('end', () => {
    HitModel.db.close(() => {
      console.log('Finished.')
      process.exit(0)
    })

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

  })
})
