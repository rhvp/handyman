const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const CarpenterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rating: {
    type: Number
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
})

const Carpenter = mongoose.model('carpenter', CarpenterSchema);

module.exports = Carpenter;
