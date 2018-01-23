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
    , CONCURRENCY = 100 // bluebirdjs.com/docs/api/promise.map.html#map-option-concurrency

db.dropDatabase().then(() => {
  console.log('Database dropped')
  let contigs = fasta2json.ReadFasta(species.contigs)

  ContigModel.create(contigs).then(() => {
    console.log('Contigs stored')

    let gffs = []

    gff2json.read(species.gff).on('data', (gff) => {
      gffs.push(gff)
    }).on('end', () => {
      let saved = 0
        , total = gffs.length

      console.log(total + ' gff records found')

      Promise.map(gffs, (gff) => {
        return new Promise((resolve, reject) => {
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
            HitModel.create(hit).then(() => {
              saved++
              if (saved % 1000 === 0) console.log(saved + ' saved')
              resolve()
            }).catch(reject)
          }).catch(reject)
        })
      }, {concurrency: CONCURRENCY}).then(() => {
        console.log('Creating indexes')

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
      }).catch((err) => { console.log(err) })
    })
  }).catch((err) => console.log(err))
})
