const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const flatSchema = new Schema({
  size: Number,
  price: String,
  imageURL: String,
  exposeURL: String,
  rooms: Number
});

const Flat = mongoose.model('Flat', flatSchema);
module.exports = Flat;
