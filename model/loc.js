var mongoose = require('mongoose');
var schema = mongoose.Schema;

const locSchema = new schema({
    x: { type: Number},
    y: { type: Number },
  });
 
  
 module.exports = {mapSchema : mongoose.model('loc', locSchema)}