const fasta2json = require('fasta2json')
    , gff2json = require('bionode-gff')
    , nt = require('ntseq')
    , Promise = require('bluebird')
    , species =
      { contigs: __dirname + '/../data/ecoli.fa'
      , gff: __dirname + '/../data/prokka-ecoli.gff'
      , name: 'ecoli'
      }
    , createDatabase = require('../app/database')
    , HitModel = require('../app/models/hit')
    , ContigModel = require('../app/models/contig')
    , db = createDatabase()

db.dropDatabase().then(() => {
  let contigs = fasta2json.ReadFasta(species.contigs)

  ContigModel.create(contigs).then(() => {
    let gffs = []

    gff2json.read(species.gff).on('data', (gff) => {
      gffs.push(gff)
    }).on('end', () => {
      Promise.map(gffs, (gff) => {
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

          let gffId = gff.attributes.ID
          let product = gff.attributes.product
          let locustag = gff.attributes.locus_tag
          let name = gff.attributes.Name
          let length = codingseq.length

          delete gff.attributes.ID
          delete gff.attributes.product
          delete gff.attributes.locus_tag
          delete gff.attributes.Name

          let proteinseq = (new nt.Seq()).read(codingseq)
          proteinseq = proteinseq.translate()

          let hit = Object.assign(
            { species: species.name
            , gffId
            , product
            , locustag
            , name
            , length
            , contig: savedContig
            , codingseq
            , proteinseq
            }, gff)
          // }}}

          HitModel.create(hit).then(() => {}).catch(console.error)

        }).catch(console.error)
      }).then(() => {
          db.collection('hits').createIndex(
            { 'contig.head': 'text'
            , gffId: 'text'
            , locustag: 'text'
            , product: 'text'
            , name: 'text'
            }
          , { weights:
              { product: 8
              , 'contig.head': 6
              , locustag: 10
              , gffId: 10
              , name: 10
              }
            , name: 'hit_search_index'
            }
          )
          db.close(() => {
            console.log('Finished.')
            process.exit(0)
          })
        })
    })
  }).catch(console.err)
})
