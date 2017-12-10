const fasta2json = require('fasta2json')
    , gff2json = require('bionode-gff')
    , species =
      { contigs: __dirname + '/../data/ecoli-split.fa'
      , gff: __dirname + '/../data/prokka-ecoli-split.gff'
      , name: 'ecoli'
      }
    , createDatabase = require('../app/database')
    , HitModel = require('../app/models/hit')
    , ContigModel = require('../app/models/contig')

createDatabase()

HitModel.db.dropDatabase().then(() => {
  let contigs = fasta2json.ReadFasta(species.contigs)

  gff2json.read(species.gff).on('data', (gff) => {
    let contig = contigs.find(x => x.head.split(' ')[0] === gff.seqid)

    ContigModel.findOneAndUpdate({ head: contig.head }, contig, { upsert: true, new: true }).then((contigId) => {
      contigId = contigId._id
      // this needs to be checked, and probably reverse complimented
      let codingseq = contig.seq.substr(gff.start, gff.end)

      if (gff.strand === '-') {
        let reverse = codingseq.split('').reverse().join('')

        codingseq = reverse.replace(/[ACTG]/g, (base) => {
          return 'ACTG'.charAt('TGAC'.indexOf(base))
        })
      }

      let hit = Object.assign({ species: species.name, contig: contigId, codingseq }, gff)

      HitModel.create(hit, (err) => {
        if (err) console.log('ERROR: ' + err)
      })
    }).catch(err => console.error(222, err))

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
