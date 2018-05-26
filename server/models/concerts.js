var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConcertSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: false
  // },
  artist: String,
  location: String,
  date: String,
  memories: String
})

var Concert = mongoose.model("Concert", ConcertSchema);

module.exports = Concert;
