const uniprot2refseq = require('./uniprot2refseq.json')
    , cgd2uniprot = require('./cgd2uniprot.json')

console.log('[')
cgd2uniprot.map((id) => {
  let refseq = uniprot2refseq.find(x => x.uniprot === id.Uniprot)
  if (refseq) {
    id.refseq = refseq.refseq
  }
  console.log(JSON.stringify(id) + ',')
})

console.log(']')
