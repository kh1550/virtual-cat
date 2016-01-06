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
