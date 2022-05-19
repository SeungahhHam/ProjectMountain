'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listschema = new Schema({
  name: {
    type: Array
  },
  list: {
    type: Array
  }
})

module.exports = { mountain_list: mongoose.model('mountian_list', listschema) }
