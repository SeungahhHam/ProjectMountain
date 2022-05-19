'use strict'
const express = require('express')
const fetchData = require('../fetchData/fetchData')
const router = express.Router()
const Mount = require('../model/Mountain.js')
const mountain100 = require('../config/100mountain')
const Mountain_100 = Mount.mountain_100
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
const MountainList = require('../model/MountList')
const { mountain_list } = require('../model/MountList')
const Mountain_list = MountainList.mountain_list

// 지역별 저장
const mountain_loc_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
let loc = null
router.post('/list_loc', async (req, res) => {
  try {
    for (let i = 0; i < mountain_loc_list.length; i++) {
      loc = mountain_loc_list[i]
      const response = await fetchData('', '', loc, '', '', 260, '')
      const mount = response.data.response.body.items.item
      Mount_loc_schema[i].collection.insertMany(mount)
    }
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 100대 명산 저장
const mountain_100_list = mountain100.mountian_100_list
const mountian_100_hght = mountain100.mountian_100_hght
let name = null
let hght = null
router.post('/list_100', async (req, res) => {
  try {
    for (let i = 0; i < mountain_100_list.length; i++) {
      name = mountain_100_list[i]
      hght = mountian_100_hght[i]
      const response = await fetchData(name, hght, '', '', '', 1, '')
      const mount = response.data.response.body.items.item
      Mountain_100.collection.insertOne(mount)
    }
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 계절별 리스트
const mountain_season_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
const season_list = ['봄', '여름', '가을', '겨울', '봄/여름', '봄/가을', '봄/겨울', '여름/가을', '여름/겨울', '가을/겨울']
let list = new Array()
router.post('/list_season', async (req, res) => {
  try {
    for (let i = 0; i < mountain_season_list.length; i++) {
      const season = mountain_season_list[i]
      let response = await fetchData('', '', '', season, '', 1, '')
      const totalCount = response.data.response.body.totalCount
      for (let j = 1; j <= totalCount; j++) {
        response = await fetchData('', '', '', season, '', 1, j)
        const mount = response.data.response.body.items.item.mntnid
        list[j - 1] = mount
      }
      const listdata = { name: season_list[i], list }
      Mountain_list.collection.insertOne(listdata)
    }
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 테바별 리스트
const mountain_theme_list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
const theme_list = ['계곡', '단풍', '억새', '바다', '문화유적', '일출/일몰', '가족산행', '바위', '봄꽃', '조망', '설경']
router.post('/list_theme', async (req, res) => {
  try {
    for (let i = 0; i < mountain_theme_list.length; i++) {
      const season = mountain_theme_list[i]
      let response = await fetchData('', '', '', season, '', 1, '')
      const totalCount = response.data.response.body.totalCount
      for (let j = 1; j <= totalCount; j++) {
        response = await fetchData('', '', '', season, '', 1, j)
        const mount = response.data.response.body.items.item.mntnid
        list[j - 1] = mount
      }
      const listdata = { name: theme_list[i], list }
      Mountain_list.collection.insertOne(listdata)
    }
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 100대명산 리스트
router.post('/list_id100', async (req, res) => {
  try {
    for (let i = 0; i < mountain_100_list.length; i++) {
      name = mountain_100_list[i]
      hght = mountian_100_hght[i]
      const response = await fetchData(name, hght, '', '', '', '', '')
      const mount = response.data.response.body.items.item.mntnid
      list[i] = mount
    }
    const listdata = { name: '100대명산', list }
    Mountain_list.collection.insertOne(listdata)
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 상중하 리스트
router.post('/list_hght', async (req, res) => {
  try {
    for (let i = 0; i < 600; i++) {
      const response = await fetchData('', i, '', '', '', '', '')
      const totalCount = response.data.response.body.totalCount
      if (totalCount === 0) { continue }
      const mount = response.data.response.body.items.item.mntnid
      list.push(mount)
    }
    let listdata = { name: '난이도_하', list }
    Mountain_list.collection.insertOne(listdata)
    list = []
    for (let i = 600; i < 1200; i++) {
      const response = await fetchData('', i, '', '', '', '', '')
      const totalCount = response.data.response.body.totalCount
      if (totalCount === 0) { continue }
      const mount = response.data.response.body.items.item.mntnid
      list.push(mount)
    }
    listdata = { name: '난이도_중', list }
    Mountain_list.collection.insertOne(listdata)
    list = []
    for (let i = 1200; i < 1947; i++) {
      const response = await fetchData('', i, '', '', '', '', '')
      const totalCount = response.data.response.body.totalCount
      if (totalCount === 0) { continue }
      const mount = response.data.response.body.items.item.mntnid
      list.push(mount)
    }
    listdata = { name: '난이도_상', list }
    Mountain_list.collection.insertOne(listdata)
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 좌표 필드 추가(의미없는 값 넣어서 자리 만들기)
router.post('/list_loc_add', async (req, res) => {
  try {
    for (let i = 0; i < mountain_loc_list.length; i++) {
      Mount_loc_schema[i].collection.updateMany({ ptmntrcmmncoursdscrt: ' ' }, { $set: { x: 35.250371 } }, { upsert: true })
      Mount_loc_schema[i].collection.updateMany({ ptmntrcmmncoursdscrt: ' ' }, { $set: { y: 129.14546 } }, { upsert: true })
    }
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// 키워드 추가_하나씩 추가 필요
const namelist = ['봄', '여름', '가을', '겨울', '봄/여름', '봄/가을', '봄/겨울', '여름/가을', '여름/겨울', '가을/겨울',
  '계곡', '단풍', '억새', '바다', '문화유적', '일출/일몰', '가족산행', '바위', '봄꽃', '조망', '설경',
  '난이도_상', '난이도_중', '난이도_하', '100대명산']
router.post('/list_keyword_add', async (req, res) => {
  try {
    mountain_list.findOne({ name: namelist[24] }, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        for (let n = 0; n < docs.list.length; n++) {
          for (let j = 0; j < mountain_loc_list.length; j++) {
            Mount_loc_schema[j].collection.updateMany({ mntnid: docs.list[n] }, { $push: { keyword: '100대명산' } })
          }
        }
      }
    })
    res.send('fin')
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
