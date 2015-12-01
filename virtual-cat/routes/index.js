var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('./../db');

var User = mongoose.model('User');
var Cat = mongoose.model('Cat');
var Accessory = mongoose.model('Accessory');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req,res,next) {
  User.findOne({name: req.body.username}, function(err,result,count) {
    console.log(result._id);
    req.session.user = result._id;
    req.session.cat = result.cat;
    res.redirect('/play');
  });
});

router.post('/name', function(req, res, next) {
  var c = new Cat({
    name: req.body.cat_name,
    mood: "Apathetic",
    hunger: 50,
    thirst: 50,
    energy: 100
  });

  c.save(function(err,cat,count) {
    console.log("Cat saved: ", cat);
    var u = new User({
      name: req.body.username,
      cat: c._id
    });

    u.save(function(err2,user,count2) {
      console.log("User saved: ", user);
      req.session.user = u._id;
      req.session.cat = c._id;
      res.redirect('/play');
    })
  });
});

router.get('/name', function(req, res, next) {
  res.render('name');
});

router.get('/play', function(req, res, next) {
  if (req.session && req.session.user && req.session.cat) {
    Cat.findOne({_id: req.session.cat}, function (err,result,count){
      res.render('play', {user: req.session.user, cat: result._id, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, accessory: result.accessory});
    });
  } else {
    res.render('play');
  }
});

router.get('/cafe/:cafe_id', function(req, res, next) {
  res.send("cat cafe");
});

module.exports = router;
