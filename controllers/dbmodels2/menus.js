//Users-model
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var MenusSchema = new Schema({
 title: { type: String,required:true},
 descrption: { type: String},
 parent: {type: String},
});

//Export model
module.exports = mongoose.model('menus', MenusSchema);
