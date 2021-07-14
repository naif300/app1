var mongoose = require('mongoose');

// connectionString -url
var cnn = 'mongodb://127.0.0.1/shaamdb';
mongoose.connect(cnn, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'feiled connection to DataBase !'));
