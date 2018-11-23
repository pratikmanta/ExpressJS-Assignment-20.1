var express = require('express');
var router = express.Router();

// received this page using get request
router.get('/:id', function(req, res, next) {
  res.render('example_get', {title:"GET", id:req.params.id});
});

module.exports = router;

