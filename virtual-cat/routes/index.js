var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/name', function(req, res, next) {
 	res.redirect('play');
});

router.get('/name', function(req, res, next) {
	res.send("name your cat");
});

router.get('/play', function(req, res, next) {
	res.send("play with cat");
});

router.get('/cafe/:cafe_id', function(req, res, next) {
	res.send("cat cafe");
});

module.exports = router;
