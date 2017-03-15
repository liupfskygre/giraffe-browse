const uniprot2refseq = require(__dirname + '/uniprot2refseq.json')
    , cgd2uniprot = require(__dirname + '/cgd2uniprot.json')
    , nameMapping = require(__dirname + '/names_mapping.json')

console.log('[')
cgd2uniprot.map((id) => {
  let refseq = uniprot2refseq.find(x => x.uniprot === id.Uniprot)
    , name = nameMapping.find(x => x.id === id.CGDID)
  if (name) {
    id.name = name.name
  }
  if (refseq) {
    id.refseq = refseq.refseq.split('.')[0]
  }
  console.log(JSON.stringify(id) + ',')
})

console.log(']')
