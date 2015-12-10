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
  accessory: String
});

var User = new mongoose.Schema({
 gold: Number,
 cat: {type: mongoose.Schema.Types.ObjectId, ref: 'Cat'}
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Cat', Cat);
mongoose.model('Accessory', Accessory);
//mongoose.connect('mongodb://localhost/catdb');
mongoose.connect('mongodb://heroku_r55wtkd5:pet2pus8n96jbj854861hd7am0@ds027295.mongolab.com:27295/heroku_r55wtkd5');