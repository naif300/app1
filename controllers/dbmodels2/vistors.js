//Users-model
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var VistorsSchema = new Schema({
 ipaddrss:{type :string},
 datevist: {type: Date.now()}
});

//Export model
module.exports = mongoose.model('vistors', VistorsSchema);
