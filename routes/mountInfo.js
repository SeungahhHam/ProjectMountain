'use strict'
const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
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
const { mountain_list } = require('../model/MountList')

// 키워드별 정보 전송
let array = new Array()
router.post('/keyword', (req, res) => {
  // 받아온 이름으로 키워드를 찾고 id 리스트 찾기
  mountain_list.findOne({ name: req.body.keyword }, (err, result) => {
    if (err) return res.status(500).send({ error: 'failed' })

    for (let i = 0; i < result.list.length; i++) {
      // 리스트에서 뽑은 id가 지역별 collection에 있는지 확인
      for (let j = 0; j < 15; j++) {
        Mount_loc_schema[j].find({ mntnid: result.list[i] }, (err, docs) => {
          if (err) return res.status(500).send({ error: 'failed' })
          if (docs.length !== 0) array = array.concat(docs)
        })
      }
      // 마직막 지역별 collection에 있는지 확인 후 전송
      Mount_loc_schema[15].find({ mntnid: result.list[i] }, (err, docs) => {
        if (err) return res.status(500).send({ error: 'failed' })
        if (docs.length !== 0) array = array.concat(docs)

        if (i === result.list.length - 1) res.json(array)
      })
    }
  })
  array = []
})

// 검색 정보 전송
router.post('/search', (req, res) => {
  // 지역별 collection에 검색한 문자열이 포함된 값을 찾는다
  for (let j = 0; j < 15; j++) {
    Mount_loc_schema[j].find({ mntnnm: new RegExp('.*' + req.body.search + '.*') }, (err, docs) => {
      if (err) return res.status(500).send({ error: 'failed' })
      if (docs.length !== 0) array = array.concat(docs)
    })
  }
  // 마직막 지역별 collection에 검색한 문자열이 포함된 값이 있는지 확인 후 전송
  Mount_loc_schema[15].find({ mntnnm: new RegExp('.*' + req.body.search + '.*') }, (err, docs) => {
    if (err) return res.status(500).send({ error: 'failed' })
    if (docs.length !== 0) array = array.concat(docs)
    res.json(array)
  })
  array = []
})

// 메인 페이지 개인 키워드 기준으로 추천
let keywordArray = new Array()
let newArray = new Array()
const keywordList = (req, res, next) => {
  // 키워드 안의 산id 배열에 모두 저장
  for (let i = 0; i < req.user.keyword.length; i++) {
    mountain_list.findOne({ name: req.user.keyword[i] }, (err, result) => {
      // if (err) return res.status(500).send({error: 'failed'});
      keywordArray = keywordArray.concat(result.list)
      if (i === req.user.keyword.length - 1) {
        next()
      }
    })
  }
}
router.post('/main', auth, keywordList, (req, res) => {
  // 랜덤하게 리스트 배열 중 중복없이 7개 id 뽑기
  const randomIndexArray = []
  for (let n = 0; n < 7; n++) {
    const randomNum = Math.floor(Math.random() * keywordArray.length)
    if (randomIndexArray.indexOf(randomNum) === -1) randomIndexArray.push(randomNum)
    else n--
  }
  for (let j = 0; j < 7; j++) newArray.push(keywordArray[randomIndexArray[j]])

  for (let i = 0; i < 7; i++) {
    // 리스트에서 뽑은 id가 지역별 collection에 있는지 확인
    for (let j = 0; j < 15; j++) {
      Mount_loc_schema[j].find({ mntnid: newArray[i] }, (err, docs) => {
        if (err) return res.status(500).send({ error: 'failed' })
        if (docs.length !== 0) array = array.concat(docs)
      })
    }
    // 마직막 지역별 collection에 있는지 확인 후 전송
    Mount_loc_schema[15].find({ mntnid: newArray[i] }, (err, docs) => {
      if (err) return res.status(500).send({ error: 'failed' })
      if (docs.length !== 0) array = array.concat(docs)

      if (i === 6) res.json(array)
    })
  }
  keywordArray = []
  newArray = []
})

module.exports = router
