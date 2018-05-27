var express = require('express');
var router = express.Router();
var Concert = require("../models/concerts")

router.get('/', (req, res) => {
  Concert.find({}, 'artist location date memories', function(error, concerts) {
    if (error) { console.log(error) }
    res.send({
      concerts: concerts
    })
  }).sort({_id: -1})
})
router.get('/by-artist', (req, res) => {
  Concert.find({}, 'artist location date memories', function(error, concerts) {
    if (error) { console.log(error) }
    let artistTotals = {}
    concerts.forEach((concert) => {

      if (artistTotals[concert.artist] === undefined) {
        artistTotals[concert.artist] = 1
      } else {
        artistTotals[concert.artist] += 1
      }
    })
    console.log(artistTotals)
    res.send({
      concerts: artistTotals
    })
  }).sort({_id: -1})
})

router.post('/', (req, res) => {
  var db = req.db;
  //var user = req.body.user;
  var artist = req.body.artist;
  var location = req.body.location;
  var date = req.body.date;
  var memories = req.body.memories;
  var new_concert = new Concert({
    //user,
    artist,
    location,
    date,
    memories
  })

  new_concert.save(function(error) {
    if (error) {
      console.log(error)
    }
    res.send({
      seccess: true,
      message: 'Concert saved successfully!'
    })
  })
})

router.get('/:artist', (req, res) => {
  var db = req.db;
  Concert.find({artist: req.params.artist}, 'artist location date memories', function(error, concert) {
    if (error) {
      console.log(error);
    }
    res.send(concert)
  })
})

router.get('/edit/:id', (req, res) => {
  var db = req.db;
  console.log('hello')
  Concert.findById(req.params.id, 'artist location date memories', function(error, concert) {
    if (error) {
      console.log(error);
    }
    console.log(concert)
    res.send(concert)
  })
})

// Update a concert
router.put('/:id', (req, res) => {
  var db = req.db;
  Concert.findById(req.params.id, 'artist location date memories', function (error, concert) {
    if (error) { console.error(error); }

    concert.artist = req.body.artist
    concert.location = req.body.location
    concert.date = req.body.date
    concert.memories = req.body.memories
    concert.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a concert
router.delete('/show/:id', (req, res) => {
  var db = req.db;
  Concert.remove({
    _id: req.params.id
  }, function(err, concert){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


// END '/' Route



module.exports = router;
