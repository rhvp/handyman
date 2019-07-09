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

const PlumberSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  number: {
    type: Number,
    required: [true, "Number is required"]
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  available: {
    type: Boolean,
    default: true
  },
  geometry: GeoSchema,
}, {timestamps: true});

const Plumber = mongoose.model('plumber', PlumberSchema);

module.exports = Plumber;
