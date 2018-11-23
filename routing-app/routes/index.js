var express = require('express');
var router = express.Router();

// received this page using get request
router.get('/', function(req, res, next) {
  res.render('index', {title: "Routing example", message:"In the url pass /example_get/enter any number or string"});
});

module.exports = router;
