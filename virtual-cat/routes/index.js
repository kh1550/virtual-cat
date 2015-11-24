var express = require('express');
var router = express.Router();
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
    console.log(result);
    res.redirect('play', {user: req.body.username, cat: result});
  });
});

router.post('/name', function(req, res, next) {
  var c = new Cat({
    name: req.body.cat_name,
    mood: "Apathetic",
    hunger: 5,
    thirst: 5
  });

  c.save(function(err,cat,count) {
    var u = new User({
      name: req.body.username,
      cat: c._id
    });

    u.save(function(err2,user,count2) {
      res.redirect('play', {user: u.name, cat: cat.name});
    })
  });
});

router.get('/name', function(req, res, next) {
  res.render('name');
});

router.get('/play', function(req, res, next) {
  console.log(req.body);
  res.render('play');
});

router.get('/cafe/:cafe_id', function(req, res, next) {
  res.send("cat cafe");
});

module.exports = router;
