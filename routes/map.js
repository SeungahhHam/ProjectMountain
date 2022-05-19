'use strict'
const express = require('express')
const router = express.Router()
const key = require('../config/javascriptkey')
const map = require('../model/loc')

router.post('/set', (req, res, next) => {
  map.mapSchema.collection.updateOne({ token: req.body.token }, { $set: { x: req.body.x, y: req.body.y } }, { upsert: true }, function (error, docs) {
    if (error) {
      console.log(error)
    } else {
      res.send({ message: 'yes' })
    }
  })
})

router.get('/:token', (req, res, next) => {
  map.mapSchema.collection.findOne({ token: req.params.token }, function (error, docs) {
    if (error) {
      console.log(error)
    } else {
      res.render('map', {
        javascriptkey: key.javascriptkey,
        x: parseFloat(docs.x),
        y: parseFloat(docs.y)
      })
    }
  })
})

module.exports = router
