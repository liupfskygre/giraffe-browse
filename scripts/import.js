const fasta2json = require('fasta2json')
    , gff2json = require('bionode-gff')
    , nt = require('ntseq')
    , Promise = require('bluebird')
    , species =
      // { contigs: __dirname + '/../data/Staphylococcus_aureus_cds.fa'
      // , gff: __dirname + '/../data/Staphylococcus_aureus.gff'
      // { contigs: __dirname + '/../data/prokka-ecoli.fa'
      // , gff: __dirname + '/../data/prokka-ecoli.gff'
      { contigs: __dirname + '/../data/Escherichia_coli_k_12_dna.fa'
      , gff: __dirname + '/../data/Escherichia_coli_k_12.gff'
      , name: 'ecoli'
    }
    , createDatabase = require('../app/database')
    , HitModel = require('../app/models/hit')
    , MetadataModel = require('../app/models/metadata')
    , ContigModel = require('../app/models/contig')
    , db = createDatabase()

db.dropDatabase().then(() => {
  console.log('Database dropped')
  let contigs = fasta2json.ReadFasta(species.contigs)

  ContigModel.create(contigs).then(() => {
    console.log('Contigs saved')

    let gffs = []
      , fields = []
      , types = []

    gff2json.read(species.gff).on('data', (gff) => {
      gffs.push(gff)
    }).on('end', () => {
      let saved = 0
        , total = gffs.length

      console.log(total + ' gff records found')

      Promise.map(gffs, (gff) => {
        return new Promise((resolve, reject) => {
          // Need to handle if this doesn't work
          let contig = contigs.find(x => x.head.split(' ')[0] === gff.seqid)

          ContigModel.findOne({ head: contig.head }, { _id: true }).then((contigId) => {

            // {{{
            let savedContig = { id: contigId._id, head: contig.head }

            let codingseq = contig.seq.substring(gff.start - 1, gff.end)

            if (gff.strand === '-') {
              let reverse = codingseq.split('').reverse().join('')

              codingseq = reverse.replace(/[ACTG]/g, (base) => {
                return 'ACTG'.charAt('TGAC'.indexOf(base))
              })
            }

            let length = codingseq.length

            let proteinseq = (new nt.Seq()).read(codingseq)
            proteinseq = proteinseq.translate()

            let hit = Object.assign(
              { species: species.name
              , length
              , contig: savedContig
              , codingseq
              , proteinseq
              }, gff)

            // }}}

            Object.keys(gff.attributes).forEach((attr) => {
              if (fields.indexOf(attr) === -1) {
                fields.push(attr)
              }
            })

            if (!gff.attributes.ID) {
              // Generate our own ID
            }

            if (types.indexOf(gff.type) === -1) {
              types.push(gff.type)
            }

            HitModel.create(hit).then(() => {
              saved++
              if (saved % 1000 === 0) console.log(saved + ' saved')
              resolve()
            }).catch(reject)
          }).catch(reject)
        })

      }).then(() => {
        console.log('Creating metadata')
        MetadataModel.create({ fields, types }).then(() => {
          db.close(() => {
            console.log('Finished.')
            process.exit(0)
          })
        })
      }).catch((err) => { console.log(err) })
    })
  }).catch((err) => console.log(err))
})
