const fasta2json = require('fasta2json')

let proteins = fasta2json.ReadFasta('../data/boidinii/boidinii_uniprot.fa')

fasta2json.ParseFasta = (str) => {
  let fasta = []
    , seqs = str.split('>')

  for (let i = 1; i < seqs.length; i++) {
    seqs[i] = seqs[i].replace(/\r/g, '')

    let seq = {}
      , fas = seqs[i].split('\n')
      , head = fas[0]

    seq.contig = head.split('|')[0].trim()
    seq.blast = head.split('|')[1] || 'No blast result'
    seq.uniprot = head.split('|')[2] || 'No uniprot match'
    seq.blast = seq.blast.trim()
    seq.uniprot = seq.uniprot.trim()
    seq.sequence = ''

    for (let j = 1; j < fas.length; j++) {
      seq.sequence = seq.sequence + fas[j]
    }

    seq.protein = proteins.filter((obj) => {
      let proteinId = obj.head.split('|')[1]
      return proteinId === seq.uniprot
    })[0]

    fasta.push(seq)
  }

  return fasta
}

let species = fasta2json.ReadFasta('../data/boidinii/boidinii_working.fa')

let search = species.filter((obj) => {
    return obj.contig === 'C80803 62.0'
})[0]

console.log(search)
