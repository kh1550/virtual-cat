// Kristin Ho
// kh1550@nyu.edu
// 
// DB.JS
//
var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

var Accessory = new mongoose.Schema({
	item: String
	image: String
})

var Cat = new mongoose.Schema({
  name: String,
  mood: String,
  hunger: Number,
  accessories: [Accessory]
});

var User = new mongoose.Schema({
	name: String,
	cat: Cat
});

//List.plugin(URLSlugs('createdBy name'));
mongoose.model('User', User);
mongoose.model('Cat', Cat);
mongoose.model('Accessory', Accessory);
mongoose.connect('mongodb://localhost/catdb');