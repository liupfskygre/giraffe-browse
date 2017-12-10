const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , head: String
  , seq: String
  }
)

class contigModel extends Model { }

module.exports = mongoose.model(contigModel, schema, 'contigs')
