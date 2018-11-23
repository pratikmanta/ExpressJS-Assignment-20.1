var express = require('express');
var router = express.Router();

// received this page using get request
router.get('/:id', function(req, res, next) {
  res.render('example_post', {title:"POST", id:req.params.id});
});

// received using post request
router.post('/:id', function(req, res, next) {
  var id = req.body.id
  res.redirect('/example_post/' + id);
});
module.exports = router;