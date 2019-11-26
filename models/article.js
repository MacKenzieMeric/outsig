const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  author: {type: String, required: true},
  bannerImage: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: String, required: true},
  image: {type: String, required: true},
  subtitle: {type: String, required: true},
  tag: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String, required: true}
});

module.exports = mongoose.model('Article', schema);
