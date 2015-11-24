// Kristin Ho
// kh1550@nyu.edu
// 
// DB.JS
//

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('virtualcat.db');
 
// db.serialize(function() {
//   db.get("SELECT name FROM sqlite_master WHERE type=table AND name=users", function(err, rows) {
//     if(err !== null) { console.log(err); }
//     else if(rows === undefined) {
//       db.run('CREATE TABLE if not exists users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), cat_id INTEGER REFERENCES cats(id))', function (err) { 
//         if (err !== null) console.log(err) else console.log("SQL Table users initialized.") });
//     } else { console.log("SQL Table users already initialized."); }
//   });
 
//   db.get("SELECT name FROM sqlite_master WHERE type=table AND name=cats", function(err, rows) {
//     if(err !== null) { console.log(err); }
//     else if(rows === undefined) {
//      db.run('CREATE TABLE if not exists cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), mood VARCHAR(50), hunger INTEGER, thirst INTEGER, accessory_id INTEGER, user_id, FOREIGN_KEY(accessory_id) REFERNCES accessory(id), FOREIGN_KEY(user_id) REFERENCES users(id))', function (err) { 
//         if (err !== null) console.log(err) else console.log("SQL Table cats initialized.") });
//     } else { console.log("SQL Table cats already initialized."); }
//   });

//   db.get("SELECT name FROM sqlite_master WHERE type=table AND name=accessories", function(err, rows) {
//     if(err !== null) { console.log(err); }
//     else if(rows === undefined) {
//       db.run('CREATE TABLE if not exists accessories (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(30), image VARCHAR(255))', function (err) { 
//         if (err !== null) console.log(err) else console.log("SQL Table cats initialized.") });
//     } else { console.log("SQL Table accessories already initialized."); }
//   });

//   var stmt = db.prepare("INSERT INTO user VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
 
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
 
// db.close();




var mongoose = require('mongoose');

var Accessory = new mongoose.Schema({
 item: String,
 image: String
})

var Cat = new mongoose.Schema({
  name: String,
  mood: String,
  hunger: Number,
  thirst: Number,
  accessory: {type: mongoose.Schema.Types.ObjectId, ref: 'Accessory'}
});

var User = new mongoose.Schema({
 name: String,
 cat: {type: mongoose.Schema.Types.ObjectId, ref: 'Cat'}
});

//List.plugin(URLSlugs('createdBy name'));
mongoose.model('User', User);
mongoose.model('Cat', Cat);
mongoose.model('Accessory', Accessory);
mongoose.connect('mongodb://localhost/catdb');