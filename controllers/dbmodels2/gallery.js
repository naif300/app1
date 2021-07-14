const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var nameSchema = new Schema({
  title: String,
  tag: String,
  descrption: String,
  imageUrl: String
});


module.exports = mongoose.model('gallerys', nameSchema);
