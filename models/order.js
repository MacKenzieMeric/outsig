const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  addressLine1: {type: String, require: true},
  addressLine2: {type: String, require: true},
  city: {type: String, require: true},
  country: {type: String, require: true},
  date: {type: String, require: true},
  name: {type: String, require: true},
  number: {type: Number, require: true},
  phone: {type: String, require: true},
  products: {type: Object, require: true},
  postalCode: {type: Number, require: true},
  recipient: {type: String, require: true},
  shipping: {type: Number, require: true},
  state: {type: String, require: true},
  subtotal: {type: Number, require: true},
  total: {type: Number, require: true}
});

module.exports = mongoose.model('Order', schema);
