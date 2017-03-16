const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , name: String
  , species: String
  , hitid: String
  , def: String
  , accession: String
  , uniprot: String
  , cgdid: String
  , refseq: String
  , len: Number
  , bitscore: Number
  , evalue: Number
  , qfrom: Number
  , qto: Number
  , hfrom: Number
  , hto: Number
  , gaps: Number
  , alignlen: Number
  , contig: { head: String, seq: String }
  , protein: { head: String, seq: String, goids: [String] }
  }
)

class HitModel extends Model {
  findHitSeq () {
    return this.contig.seq.substring(this.qfrom - 1, this.qto - 1)
  }
}

module.exports = mongoose.model(HitModel, schema, 'hits')
