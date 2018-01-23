const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , seqid: String
  , source: String
  , type: String
  , start: String
  , end: String
  , score: String
  , strand: String
  , phase: String
  , length: String
  , attributes: Object
  , contig:
    { id: String
    , head: String
    }
  , codingseq: String
  , proteinseq: String
  }
)

class HitModel extends Model { }

module.exports = mongoose.model(HitModel, schema, 'hits')
