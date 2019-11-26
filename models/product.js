const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  alt: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  images: {type: Array, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  size: {type: String, required: true},
  sku: {type: String, required: true},
  tag: {type: String, required: true},
  url: {type: String, required: true}
});

module.exports = mongoose.model('Product', schema);
