var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient
const { ObjectID } = require('mongodb')

// GET player by id to be deleted
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
      res.render('delete_player',{title:"Delete Player",id:id, player:player, msg:''})
    })
  })
})

// deletes the player selected
router.post('/:id', function(req, res, next) {
  var { id } = req.params
  mongo.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
      throw new Error('error')
    }
    const db = client.db('players_db')
    const col = db.collection('players')
    col.deleteOne({_id:ObjectID(id)}, (err,result) => {
      if(err) throw new Error('error updating')  
      console.log('player deleted')
    })
  })
  res.redirect('/')
});

module.exports = router;