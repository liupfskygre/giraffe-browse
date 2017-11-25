const fasta2json = require('fasta2json')
    , gff2json = require('bionode-gff')
    , species =
      { contigs: '../data/ecoli.fa'
      , gff: '../data/prokka-ecoli.gff'
      , name: 'ecoli'
      }

let contigs = fasta2json.ReadFasta(species.contigs).map((contig) => {
  contig.head = contig.head.split(' ')[0]
  return contig
})

let gff = []

gff2json.read(species.gff).on('data', data => gff.push(data)).on('end', () => {
  let importData = []

  gff.forEach((query) => {
      importData.push(extractHit(query))
  })

  console.log('Adding ' + importData.length + ' genes from ' + species.name + '...')

  return importData

  function extractHit (gff) {
    let contig = contigs.find(x => x.head === gff.seqid)
      , codingseq = codingseqs.find(x => x.head === hit.scaffold)
      , protein = proteins.find(x => x.headid === hit.scaffold)
      , codingRange = findCodingRange(codingseq.seq, contig.seq)

    let data =
      { hitid: hit.cgdId
      , species: species.name
      , contig
      , codingseq
      , protein
      , codingRange
      }

    return data
  }

})
