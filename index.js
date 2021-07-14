
var app = require('express')();
fs = require("fs");
multer = require("multer");
var mongoose = require('mongoose'); 
//var express = require('express');
mongoose.Promise = global.Promise;
var path = require('path');
var http = require('http').Server(app);
var validator = require('express-validator');
//const csrf = require('csurf');
const db_url = 'mongodb://localhost:27017/test';
const MONGODB_URI ='mongodb://localhost:27017/sh';

const express = require('express');
//const app = express();
 
// import controller
var AuthController = require('./controllers/AuthController');
 
 

// import Router file
var pageRouter = require('./routers/route');

 
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
app.use(bodyParser.json());


mongoose.connect(db_url)
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1200000
  }
}));
 
 
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);


 /* ----------her a suluation -------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(flash());
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["es", "en", "de", "ru", "it"],
  textsVarName: 'translation'
})
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/public', express.static('public'));
 
app.get('/layouts/', function (req, res) {
  res.render('view');
});

// apply controller
 
AuthController(app);
 
 
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

pageRouter(app);
 
app.get('/', function (req, res) {
  res.redirect('/');
});

http.listen(8000, function () {
  console.log('listening on *:8000');
});
 
 