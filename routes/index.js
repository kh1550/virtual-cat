var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var User = mongoose.model('User');
var Cat = mongoose.model('Cat');
var Accessory = mongoose.model('Accessory');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req,res,next) {
  console.log("Attempting to sign in...", req.body.username);
  passport.authenticate('local', function(err,user) {
    console.log(err, user, "user: ", req.body.username, req.body.password);
    if(user) {
      req.logIn(user, function(err) {
        console.log("User received: ", user);
        res.redirect('/play');
      });
    } else {
      res.render('index', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
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
    console.log("Cat saved: ", cat, req.body.cat_name);
    console.log("User to register: ", req.body.username);
    User.register(new User({username:req.body.username,gold:0,cat:cat._id}), 
      req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.render('name', {message: "Your username is already taken."});
      } else {
        passport.authenticate('local')(req, res, function() {
          req.user._id = user._id;
          req.user.cat = cat._id;
          res.redirect('/play');
        });
      }
    });
  });
});

router.get('/name', function(req, res, next) {
  res.render('name');
});

router.get('/play/no_cat_found', function(req,res,next) {
  res.render('nocat');
});

router.get('/play', function(req, res, next) {
  if (req.session && req.user && req.user.cat) {
    User.findOne({_id: req.user._id}, function (err,user,count) {
      Cat.findOne({_id: req.user.cat}, function (err,result,count){
        if (user == undefined || result == undefined) { res.redirect('/play/no_cat_found'); }
        console.log("Cat: ", result);
        res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
      });
    });
  } else {
    res.redirect('/play/no_cat_found');
  }
});

router.post('/play', function(req, res, next) {
  console.log(req.body, req.session);
  if (req.body.work) {
    console.log("Working!");
    User.findOne({_id: req.user._id}, function (err,u,count) {
      u.gold += 100;
      u.save(function (err2,user,count2) {
        Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
          if (cat.energy > 0) { cat.energy -= 5; } else { cat.energy = 0; }
          if (cat.thirst > 0) { cat.thirst -= 5; } else { cat.thirst = 0; }
          if (cat.hunger > 0) { cat.hunger -= 5; } else { cat.hunger = 0; }
          if (cat.energy < 20 && cat.hunger < 40 && cat.thirst < 40) { mood = "Angry"; }
          if (cat.energy < 20) { cat.mood = "Tired"; }
          else if (cat.hunger < 40) { cat.mood = "Hungry"; }
          else if (cat.thirst < 40) { cat.mood = "Thirsty"; }
          else {
            var random = Math.floor(Math.random() * 3);
            switch (random) {
              case 0: cat.mood = "Bored"; break;
              case 1: cat.mood = "Apathetic"; break;
              case 2: cat.mood = "Content"; break;
            }
          }
          cat.save(function (err4,result,count4) {
            res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
          });
        });
      });
    });
  } else if (req.body.treat) {
    console.log("Eating!");
    User.findOne({_id: req.user._id}, function (err,u,count) {
      if (u.gold >= 25) {
        u.gold -= 25;
        u.save(function (err2,user,count2) {
          Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
            cat.hunger += 20;
            if (cat.hunger > 100) { cat.hunger = 100; }
            if (cat.energy > 0) { cat.energy -= 5; } else { cat.energy = 0; }
            if (cat.thirst > 0) { cat.thirst -= 5; } else { cat.thirst = 0; }
            if (cat.energy < 20 && cat.hunger < 40 && cat.thirst < 40) { mood = "Angry"; }
            if (cat.energy < 20) { cat.mood = "Tired"; }
            else if (cat.hunger < 40) { cat.mood = "Hungry"; }
            else if (cat.thirst < 40) { cat.mood = "Thirsty"; }
            else {
              var random = Math.floor(Math.random() * 3);
              switch (random) {
                case 0: cat.mood = "Bored"; break;
                case 1: cat.mood = "Apathetic"; break;
                case 2: cat.mood = "Content"; break;
              }
            }
            cat.save(function (err4,result,count4) {
              res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
            });
          });
        });
      } else {
        Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
          res.render('play', {user: u._id, gold: u.gold, cat: result._id, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
        });
      }
    });
  } else if (req.body.toy) {
    console.log("Playing!");
    User.findOne({_id: req.user._id}, function (err,u,count) {
      if (u.gold >= 50) { 
        u.gold -= 50;
        u.save(function (err2,user,count2) {
          Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
            if (cat.energy > 0) { cat.energy -= 5; } else { cat.energy = 0; }
            if (cat.thirst > 0) { cat.thirst -= 5; } else { cat.thirst = 0; }
            if (cat.hunger > 0) { cat.hunger -= 5; } else { cat.hunger = 0; }
            if (cat.energy < 20 && cat.hunger < 40 && cat.thirst < 40) { mood = "Angry"; }
            else if (cat.energy < 20) { cat.mood = "Tired"; }
            else if (cat.hunger < 40) { cat.mood = "Hungry"; }
            else if (cat.thirst < 40) { cat.mood = "Thirsty"; }
            else { cat.mood = "Pleased"; }
            cat.save(function (err4,result,count4) {
              res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
            });
          });
        });
      } else {
        Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
          res.render('play', {user: u._id, gold: u.gold, cat: result._id, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
        });
      }
    });
  } else if (req.body.cuddle) {
    console.log("Sleeping!");
    User.findOne({_id: req.user._id}, function (err,user,count) {
      Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
        cat.energy += 30;
        if (cat.energy > 100) { cat.energy = 100; }
        if (cat.thirst > 0) { cat.thirst -= 5; } else { cat.thirst = 0; }
        if (cat.hunger > 0) { cat.hunger -= 5; } else { cat.hunger = 0; }
        if (cat.energy < 20 && cat.hunger < 40 && cat.thirst < 40) { mood = "Angry"; }
        else if (cat.hunger < 40) { cat.mood = "Hungry"; }
        else if (cat.thirst < 40) { cat.mood = "Thirsty"; }
        else {
          var random = Math.floor(Math.random() * 3);
          switch (random) {
            case 0: cat.mood = "Bored"; break;
            case 1: cat.mood = "Apathetic"; break;
            case 2: cat.mood = "Content"; break;
          }
        }
        cat.save(function (err4,result,count4) {
          res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
        });
      });
    });
  } else if (req.body.milk) {
    console.log("Drinking!");
    User.findOne({_id: req.user._id}, function (err,u,count) {
      if (u.gold >= 25) { 
        u.gold -= 25;
        u.save(function (err2,user,count2) {
          Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
            cat.thirst += 20;
            if (cat.thirst > 100) { cat.thirst = 100; }
            if (cat.energy > 0) { cat.energy -= 5; } else { cat.energy = 0; }
            if (cat.hunger > 0) { cat.hunger -= 5; } else { cat.hunger = 0; }
            if (cat.energy < 20 && cat.hunger < 40 && cat.thirst < 40) { mood = "Angry"; }
            else if (cat.energy < 20) { cat.mood = "Tired"; }
            else if (cat.hunger < 40) { cat.mood = "Hungry"; }
            else if (cat.thirst < 40) { cat.mood = "Thirsty"; }
            else {
              var random = Math.floor(Math.random() * 3);
              switch (random) {
                case 0: cat.mood = "Bored"; break;
                case 1: cat.mood = "Apathetic"; break;
                case 2: cat.mood = "Content"; break;
              }
            }
            cat.save(function (err4,result,count4) {
              res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
            });
          });
        });
      } else {
        Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
          res.render('play', {user: u._id, gold: u.gold, cat: result._id, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
        });
      }
    });
  } else if (req.body.cafe) {
    console.log("Cafes are currently closed!");
    User.findOne({_id: req.user._id}, function (err,user,count) {
      Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
        res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
      });
    });
  } else {
    User.findOne({_id: req.user._id}, function (err,user,count) {
      Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
        res.render('play', {gold: user.gold, name: result.name, mood: result.mood, hunger: result.hunger, thirst: result.thirst, energy: result.energy, src: result.accessory});
      });
    });
  }
});

router.post('/buy', function(req, res, next) {
  req.on('data', function (chunk) {
    var formdata = chunk.toString();
    console.log("Buying ", formdata, "... ");
    Accessory.findOne({item: formdata}, function  (err1,acc,count) {
      if (err1) { console.log(err1); } else {
        User.findOne({_id: req.user._id}, function (err,u,count) {
          if (acc.cost <= u.gold) {
            u.gold -= acc.cost;
            u.save(function (err4,user,count4) {
              Cat.findOne({_id: req.user.cat}, function (err3,cat,count3) {
                cat.accessory = acc.image;
                cat.save(function (err5,result,count5) {
                  res.send({gold: user.gold, src: result.accessory});
                });
              });
            });
            
          } else {
            Cat.findOne({_id: req.user.cat}, function (err3,result,count3) {
              res.send({message: "Insufficient funds!"});
            });
          }
        })
      }
    });
  });
});

router.get('/help', function(req, res, next) {
  res.render('help');
});

module.exports = router;
