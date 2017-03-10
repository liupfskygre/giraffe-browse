const fasta2json = require('fasta2json')
    , GenericModel = require('../app/models/gene.js')()

let proteins = fasta2json.ReadFasta('data/660/660_uniprot.fa')
  , species = []

fasta2json.ParseFasta = (str) => {
  let fasta = []
    , seqs = str.split('>')

  for (let i = 1; i < seqs.length; i++) {
    seqs[i] = seqs[i].replace(/\r/g, '')

    let seq = {}
      , fas = seqs[i].split('\n')
      , head = fas[0]

    seq.species = 'shehatae'
    seq.contig = head.split('|')[0].trim()
    seq.blast = head.split('|')[1] || 'No blast result'
    seq.uniprot = head.split('|')[2] || 'No uniprot match'
    seq.kegg = head.split('|')[3] || 'No kegg match'
    seq.blast = seq.blast.trim()
    seq.uniprot = seq.uniprot.trim()
    seq.kegg = seq.kegg.trim()
    seq.sequence = ''

    for (let j = 1; j < fas.length; j++) {
      seq.sequence = seq.sequence + fas[j]
    }

    seq.protein = proteins.filter((obj) => {
      let proteinId = obj.head.split('|')[1]
      return proteinId === seq.uniprot
    })[0] || 'No uniprot match'

    fasta.push(seq)
  }

  return fasta
}

species = fasta2json.ReadFasta('data/660/660_working.fa')

GenericModel.db.dropDatabase(() => {
  GenericModel.create(species, (err, result) => {
    if (err) console.log('ERROR: ' + err)
    if (result) console.log('Success')
    GenericModel.db.close()
  })
})
