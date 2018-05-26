const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
// var Concert = require("../models/concerts")

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/ConcertTracker')
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Secceeded")
})



app.use('/concerts', require('../routes/concerts'));
app.use('/auth', require('../routes/auth'));

app.listen(process.env.PORT || 8081)
