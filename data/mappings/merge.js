// http://www.candidagenome.org/download/External_id_mappings/gp2protein.cgd.gz
const cgd2uniprot = require(__dirname + '/cgd2uniprot.json')
    , cgdIds = require(__dirname + '/cgd_ids.json')

console.log('[')
cgdIds.map((id) => {
  let uniprot = cgd2uniprot.find(x => x.CGDID === id.CGDID)
  if (uniprot) {
    id.uniprot = uniprot.Uniprot
  }
  console.log(JSON.stringify(id) + ',')
})

console.log(']')
