const fasta2json = require('fasta2json')
    , mappings = require(__dirname + '/../data/mappings/complete_map.json')
    , findCodingRange = require('./find-coding-range.js')

function importSpecies (species) {
  let blast = require(species.blast)
    , queries = blast.BlastOutput.BlastOutput_iterations.Iteration

  let codingseqs = fasta2json.ReadFasta(species.codingseq)

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
    if (query.Iteration_hits !== '') {
      let scaffold = query['Iteration_query-def']
        , cgdId = query['Iteration_hits'].Hit['Hit_def']
        , hit = { scaffold, cgdId }

      importData.push(extractHit(hit))
    }
  })

  console.log('Adding ' + importData.length + ' genes from ' + species.name + '...')

  return importData

  function extractHit (hit) {
    let mapping = mappings.find(x => x.GeneID === hit.cgdId)
      , cgdid, uniprot, name

    if (mapping) {
      cgdid = mapping.CGDID
      uniprot = mapping.uniprot
      name = mapping.GeneName
    }

    let contig = contigs.find(x => x.head === hit.scaffold.split('.')[0])
      , codingseq = codingseqs.find(x => x.head === hit.scaffold)
      , protein = proteins.find(x => x.headid === hit.scaffold)
      , codingRange = findCodingRange(codingseq.seq, contig.seq)

    let data =
      { hitid: hit.cgdId
      , species: species.name
      , name
      , uniprot
      , cgdid
      , contig
      , codingseq
      , protein
      , codingRange
      }

    return data
  }

}

module.exports = importSpecies
