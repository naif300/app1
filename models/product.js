const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var nameSchema = new Schema({
  title: String,
  price: Number,
  imageUrl: String,
  descrption: String
});


module.exports = mongoose.model('neww', nameSchema);

/*
const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  }
});





var catSchema1 = Schema({
  title: String,
  price: Number,
  description: String,
  imageUrl:String
});

*/



