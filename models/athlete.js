const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  age: {type: Number, required: true},
  country: {type: String, required: true},
  flag: {type: String, required: true},
  height: {type: String, required: true},
  image: {type: String, required: true},
  location: {type: String, required: true},
  name: {type: String, required: true},
  weight: {type: String, required: true}
});

module.exports = mongoose.model('Athlete', schema);