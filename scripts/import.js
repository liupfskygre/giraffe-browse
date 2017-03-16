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
    let desc = contig.head.split('|')[0]
    contig.desc = desc.substr(desc.indexOf(' ') + 1)
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
    let mapping = mappings.find(x => x.Uniprot === hit.Hit_accession)
    if (!mapping) {
      mapping = mappings.find(x => x.refseq === hit.Hit_accession)
    }
    let refseq, cgdid, uniprot, name
    if (mapping) {
      refseq = mapping.refseq
      cgdid = mapping.CGDID
      uniprot = mapping.Uniprot
      name = mapping.name
    }

    let data =
      { hitid: hit.Hit_id
      , species: species.name
      , def: hit.Hit_def
      , name: name
      , accession: hit.Hit_accession
      , uniprot: uniprot
      , cgdid: cgdid
      , refseq: refseq
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
