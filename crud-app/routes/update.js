var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient
const { ObjectID } = require('mongodb')

// GET the player to be updated
router.get('/:id', function(req, res,next) {
  var { id } = req.params
  mongo.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
      throw new Error('error')
    }
    const db = client.db('players_db')
    const col = db.collection('players')
    col.findOne({_id:ObjectID(id)}, (err,data) => {
      if(err) throw new Error('error receiving players')
        let player = {
          name:data.name,
          age:data.age,
          position:data.position,
          country:data.country,
        }
      res.render('update_player',{title:"Update Player",id:id, player:player, msg:`Please don't leave fields blank`})
    })
  })
})

// POST to update selected player information 
router.post('/:id', function(req, res,next) {
  var { id } = req.params
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
    col.updateOne({_id:ObjectID(id)}, {$set: player}, (err,result) => {
      if(err) throw new Error('error updating')
      console.log('player updated')
    }) 
    res.render('update_player',{title:"Update Player",id:id, player:player, msg:'Updated succesfully'})
  })
});




module.exports = router;