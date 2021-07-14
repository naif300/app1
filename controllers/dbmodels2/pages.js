//Users-model
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var PagesSchema = new Schema({
 title: { type: String,required:true},
 descrption: { type: String},
 content: {type: String},
 
});

//Export model
module.exports = mongoose.model('pages', PagesSchema);
