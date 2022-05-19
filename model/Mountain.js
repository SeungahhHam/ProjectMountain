'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mountainschema = new Schema({

  mntnid: {
    type: Number
  },
  mntnnm: {
    type: String
  },
  mntninfopoflc: {
    type: String
  },
  keyword: {
    type: Array
  },
  mntnattchimageseq: {
    type: String
  }
})

module.exports = {
  mountain_100: mongoose.model('mountian_100', mountainschema),

  mountainSeoul: mongoose.model('mountainSeoul', mountainschema),
  mountainBusan: mongoose.model('mountainBusan', mountainschema),
  mountainDaegu: mongoose.model('mountainDaegu', mountainschema),
  mountainIncheon: mongoose.model('mountainIncheon', mountainschema),
  mountainGwangju: mongoose.model('mountainGwangju', mountainschema),
  mountainDaejeon: mongoose.model('mountainDaejeon', mountainschema),
  mountainUlsan: mongoose.model('mountainUlsan', mountainschema),
  mountainGyeonggi: mongoose.model('mountainGyeonggi', mountainschema),
  mountainGangwon: mongoose.model('mountainGangwon', mountainschema),
  mountainChungcheongbuk: mongoose.model('mountainChungcheongbuk', mountainschema),
  mountainChungcheongnam: mongoose.model('mountainChungcheongnam', mountainschema),
  mountainJeonbuk: mongoose.model('mountainJeonbuk', mountainschema),
  mountainJeonnam: mongoose.model('mountainJeonnam', mountainschema),
  mountainGyeongbuk: mongoose.model('mountainGyeongbuk', mountainschema),
  mountainGyeongnam: mongoose.model('mountainGyeongnam', mountainschema),
  mountainJeju: mongoose.model('mountainJeju', mountainschema)
}
