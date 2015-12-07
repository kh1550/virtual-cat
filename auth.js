// Kristin Ho
// kh1550@nyu.edu
// 
// AUTH.JS
//

var mongoose = require('mongoose');
var passport = require('passport');

var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());