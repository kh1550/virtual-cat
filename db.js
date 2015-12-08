// Kristin Ho
// kh1550@nyu.edu
// 
// DB.JS
//

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Accessory = new mongoose.Schema({
 item: String,
 image: String,
 cost: Number
})

var Cat = new mongoose.Schema({
  name: String,
  mood: String,
  hunger: Number,
  thirst: Number,
  energy: Number,
  accessory: {type: mongoose.Schema.Types.ObjectId, ref: 'Accessory'}
});

var User = new mongoose.Schema({
 gold: Number,
 cat: {type: mongoose.Schema.Types.ObjectId, ref: 'Cat'}
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Cat', Cat);
mongoose.model('Accessory', Accessory);
mongoose.connect('mongodb://localhost/catdb');
//mongoose.connect('mongodb://heroku_mkxw0pnd:3oohd3m15el05dgm713136t8lq@ds061974.mongolab.com:61974/heroku_mkxw0pnd');