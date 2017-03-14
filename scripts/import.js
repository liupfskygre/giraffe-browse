const fasta2json = require('fasta2json')
    , dbUrl = 'mongodb://localhost:27017/candida?connectTimeoutMS=300000'
    , GeneModel = require('../app/models/gene.js')(dbUrl)
    , dataFiles =
      [ { contigs: '../data/boidinii/candida_boidinii.fa'
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

GeneModel.db.dropDatabase().then(() => {

  dataFiles.forEach((species) => {
    let data = require(species.blast)
      , queries = data.BlastOutput.BlastOutput_iterations.Iteration

    let contigs = fasta2json.ReadFasta(species.contigs).map((contig) => {
      contig.head = contig.head.split(' ')[0]
      return contig
    })

    let proteins = fasta2json.ReadFasta(species.proteins).map((contig) => {
      contig.headid = contig.head.split(' ')[0]
      contig.goids = contig.head.split('|')[1]
      contig.goids = (contig.goids) ? contig.goids.split(' ') : contig.goids
      return contig
    })

    let importData = []

    queries.forEach((query) => {
      let hitid = query['Iteration_query-def']
        , scaffold = hitid.split('.')[0]

      if (query.Iteration_message !== 'No hits found') {
        let hit
        if (query.Iteration_hits.Hit.length) {
          query.Iteration_hits.Hit.forEach((found) => {
            hit = extractHit(found, scaffold, hitid)
          })
        } else {
          hit = extractHit(query.Iteration_hits.Hit, scaffold)
        }

        importData.push(hit)
      }
    })

    process.stdout.write('Adding ' + importData.length + ' hits from ' + species.name + '...')

    GeneModel.create(importData, (err) => {
      if (err) console.log('ERROR: ' + err)
      GeneModel.db.close(() => {
        console.log(' Done.')
      })
    })

    function extractHit (hit, scaffold, hitid) {
      let data =
        { hitid: hit.Hit_id
        , name: species.name
        , def: hit.Hit_def
        , refseq: hit.Hit_accession
        , len: hit.Hit_len
        , bitscore: hit.Hit_hsps.Hsp['Hsp_bit-score']
        , evalue: hit.Hit_hsps.Hsp.Hsp_evalue
        , qfrom: hit.Hit_hsps.Hsp['Hsp_query-from']
        , qto: hit.Hit_hsps.Hsp['Hsp_query-to']
        , hfrom: hit.Hit_hsps.Hsp['Hsp_hit-from']
        , hto: hit.Hit_hsps.Hsp['Hsp_hit-to']
        , gaps: hit.Hit_hsps.Hsp.Hsp_gaps
        , alignlen: hit.Hit_hsps.Hsp['Hsp_align-len']
        , contig: contigs.find(x => x.head === scaffold)
        , protein: proteins.find(x => x.headid === hitid)
        }

      return data
    }

  })

})
