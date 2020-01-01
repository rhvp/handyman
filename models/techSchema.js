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

const mySchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"]
  },
  first_name: {
    type: String,
    required: [true, 'First Name field is required']
  },
  last_name: {
    type: String,
    required: [true, 'First Name field is required']
  },
  rating: {
    type: Number,
    default: 3
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
}, {timestamps: true})



module.exports = mySchema;
