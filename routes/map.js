const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Schemes
const schema = new mongoose.Schema({
  x: { type: Number},
  y: { type: Number },
});
const map = mongoose.model('loc', schema)

//처음 db 값 넣어주기
router.get('/add', (req, res) => {
    map.collection.insertOne(req.body)
    res.send('fin')
})

//산 좌표 받아오기
router.post('/update', (req, res, next) => {
    map.collection.updateOne({_id: "map"},{$set: {x: req.body.x, y: req.body.y}}, function(error, docs){
        if(error){
            res.send(error);
        }else{
          res.json({message: 'yes'})
        }
    })
})

//지도 띄우기
router.get('/', (req, res, next) => {
    map.collection.findOne({_id: "map"}, function(error, docs){
        if(error){
            console.log(error);
        }else{
            res.render('map', {
                javascriptkey: '770f232b413de4c27700024cd1dfc080',
                x: parseFloat(docs.x),
                y: parseFloat(docs.y)
            })
        }
    })
})

module.exports = router