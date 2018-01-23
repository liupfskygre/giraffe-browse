const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , fields: [String]
  }
)

class MetadataModel extends Model { }

module.exports = mongoose.model(MetadataModel, schema, 'metadata')
