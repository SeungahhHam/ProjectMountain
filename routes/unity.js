'use strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Mount = require('../model/Mountain.js')
const Mount_loc_schema =
[Mount.mountainSeoul,
  Mount.mountainBusan,
  Mount.mountainDaegu,
  Mount.mountainIncheon,
  Mount.mountainGwangju,
  Mount.mountainDaejeon,
  Mount.mountainUlsan,
  Mount.mountainGyeonggi,
  Mount.mountainGangwon,
  Mount.mountainChungcheongbuk,
  Mount.mountainChungcheongnam,
  Mount.mountainJeonbuk,
  Mount.mountainJeonnam,
  Mount.mountainGyeongbuk,
  Mount.mountainGyeongnam,
  Mount.mountainJeju
]
const { auth } = require('../middleware/auth')
const { User } = require('../model/User')

// Define Schemes
const schema = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number }
})
const unity = mongoose.model('unity', schema)

// 처음 db collection 만들기
router.get('/add', (req, res) => {
  unity.collection.insertOne(req.body)
  res.send('fin')
})

// 좌표 받아서 업데이트
router.post('/client', auth, (req, res) => {
  // 리스트에서 뽑은 id가 지역별 collection에 있는지 확인
  for (let j = 0; j < 16; j++) {
    Mount_loc_schema[j].collection.findOne({'x': {'$gte': parseFloat(req.body.x) - 0.0005, '$lte': parseFloat(req.body.x) + 0.0005}, 
                                        'y': {'$gte': parseFloat(req.body.y) - 0.0005, '$lte': parseFloat(req.body.y) + 0.0005}},
    (err, docs) => {
      if (err) console.log(err)
      if (docs != null) {
        // 산을 찾았을 경우 보낼 메세지 업데이트
        unity.collection.updateOne({ _id: 'unity' }, { $set: { mntnnm: docs.mntnnm } })
        // 산을 찾았을 경우 user 업데이트
        User.collection.updateOne({ email: req.user.email }, { $push: { badge: String(docs.mntnid) } })
      }
    })
  }
  // badge porgress와 level update
  User.collection.findOne({ email: req.user.email }, function (error, result) {
    if (error) {
      console.log(error)
    } else {
      if (result.badge.length<= 10) {
        User.collection.updateOne({ email: req.user.email }, { $set: { level: 1, badgeProgress: (result.badge.length) / 10 } })
      } else if (result.badge.length<= 100) {
        User.collection.updateOne({ email: req.user.email }, { $set: { level: 2, badgeProgress: (result.badge.length) / 100 } })
      } else if (result.badge.length<= 1000) {
        User.collection.updateOne({ email: req.user.email }, { $set: { level: 3, badgeProgress: (result.badge.length) / 1000 } })
      }
    }
  })
  res.send({ message: 'fin' })
})

// unity에 산 이름 보내주기
router.get('/get', (req, res) => {
  unity.collection.findOne({ _id: 'unity' }, function (error, docs) {
    if (error) {
      console.log(error)
    } else {
      res.send(docs.mntnnm)
    }
  })
})

// unity에서 성공 메시지 받기
router.post('/post', (req, res) => {
  console.log(req.body.message)
  if (req.body.message === 'android') // 메시지 변경 필요
  { res.send('success') } else res.send('fail')
})

module.exports = router
