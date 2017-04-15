const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , hitid: String
  , species: String
  , name: String
  , uniprot: String
  , cgdid: String
  , contig: { head: String, seq: String }
  , codingseq: { head: String, seq: String }
  , protein: { head: String, seq: String, goids: [String], desc: String }
  , codingRange: { start: Number, end: Number, fail: Boolean }
  }
)

class HitModel extends Model { }

module.exports = mongoose.model(HitModel, schema, 'hits')
