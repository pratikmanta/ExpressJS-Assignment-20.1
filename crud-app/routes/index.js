var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient

// GET the list of players 
router.get('/', function(req, res,next) {
  const resultPlayers = []
  mongo.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
      throw new Error('error')
    }
    const db = client.db('players_db')
    const col = db.collection('players').find()
    col.forEach((player,err) => {
      if(err) throw new Error('player not found')
      resultPlayers.push(player)
    }, function() {
      res.render('get_player',{title:"List of players", players:resultPlayers})
    })
  })
});

module.exports = router;
