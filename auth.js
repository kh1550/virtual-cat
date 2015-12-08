var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());