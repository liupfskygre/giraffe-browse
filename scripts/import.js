const data = require('./output.json')
    , queries = data.BlastOutput.BlastOutput_iterations.Iteration
    , fasta2json = require('fasta2json')
    , GeneModel = require('../../../app/models/gene.js')()

let contigs = fasta2json.ReadFasta('candida_660.fa').map((contig) => {
  contig.head = contig.head.split(' ')[0]
  return contig
})

let proteins = fasta2json.ReadFasta('candida_660_proteins_GO.fa').map((contig) => {
  contig.headid = contig.head.split(' ')[0]
  contig.goids = contig.head.split('|')[1]
  contig.goids = (contig.goids) ? contig.goids.split(' ') : contig.goids
  return contig
})

queries.forEach((query) => {
  let hitid = query['Iteration_query-def']
  let scaffold = hitid.split('.')[0]

  if (query.Iteration_message !== 'No hits found') {
    let hit
    if (query.Iteration_hits.Hit.length) {
      query.Iteration_hits.Hit.forEach((found) => {
        hit = extractHit(found, scaffold, hitid)
      })
    } else {
      hit = extractHit(query.Iteration_hits.Hit, scaffold)
    }

    GeneModel.create(hit, (err) => {
      if (err) console.log('ERROR: ' + err)
    })
  }

  GeneModel.db.close()
})

function extractHit (hit, scaffold, hitid) {
  let data =
    { hitid: hit.Hit_id
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
