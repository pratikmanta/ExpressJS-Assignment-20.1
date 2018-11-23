var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient

// GET form to add players on this route 
router.get('/', function(req, res,next) {
  res.render('create_player')
});

//POST player info to add players
router.post('/', function(req, res,next) {
  const player = {
    name:req.body.name,
    age:req.body.age,
    position:req.body.position,
    country:req.body.country
  }
  mongo.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
      throw new Error('error')
    }
    const db = client.db('players_db')
    const col = db.collection('players')
    col.insertOne(player, (err,result) => {
      if(err) throw new Error('error connecting db')  
      console.log('player inserted')
    })
  })
  res.redirect('/')
});

module.exports = router;
