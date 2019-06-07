const express = require('express');
const router = express.Router();
const Plumber = require('../models/plumber');

router.get('/plumber', function(req, res, next){
  Plumber.find({}).then(function(plumbers){
    res.render('plumber', plumbers);
  });
})

router.get('/plumbers', function(req, res, next){
  Plumber.aggregate([{ $geoNear: { near: {type: 'Point',
  coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
  spherical: true, maxDistance: 5000, distanceField: "dist.calculated" }
}]).then(function(plumbers){ res.send(plumbers); });
});

router.post('/plumbers', function(req, res, next){
  Plumber.create(req.body).then(function(plumber){
    res.send(plumber);
  }).catch(next);
})

router.put('/plumbers/:id', function(req, res, next){

})

router.delete('/plumbers/:id', function(req, res, next){

})

module.exports = router;
