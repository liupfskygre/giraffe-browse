const fasta2json = require('fasta2json')
    , mappings = require(__dirname + '/../data/mappings/complete_map.json')

function importSpecies (species) {
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

  console.log('Adding ' + importData.length + ' hits from ' + species.name + '...')

  return importData

  function extractHit (hit, scaffold, hitid) {
    let data =
      { hitid: hit.Hit_id
      , species: species.name
      , def: hit.Hit_def
      , refseq: hit.Hit_accession
      , uniprot: mappings.find(x => x.Uniprot === hit.Hit_accession)
      , cgdid: mappings.find(x => x.CGDID === hit.Hit_accession)
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

}

module.exports = importSpecies
