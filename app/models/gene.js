module.exports = (url) => {
  const Database = require('../database.js')
      , db = new Database(url)
      , { Model, Schema } = db.database

  const schema = new Schema(
    { id: Schema.ObjectId
    , contig: String
    , blast: String
    , uniprot: String
    , kegg: String
    , sequence: String
    , species: String
    , protein:
      { head: String
      , seq: String
      }
    }
  )

  class GeneModel extends Model { }

  return db.database.model(GeneModel, schema, 'genes')
}
