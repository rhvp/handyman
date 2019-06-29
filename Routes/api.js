const express = require('express');
const router = express.Router();
const Plumber = require('../models/plumber');

router.get('/plumber',(req, res, next)=>{
  Plumber.find({}).then((plumbers)=>{
    res.render('plumber', plumbers);
  }).catch(next);
});

router.get('/home', (req, res) => {
  // include sign in with third-party api on homepage
  res.render('home');
})

router.get('/plumbers', (req, res, next)=>{
  Plumber.aggregate([{ $geoNear: { near: {type: 'Point',
  coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
  spherical: true, maxDistance: 10000, distanceField: "dist.calculated" }
}]).then((plumbers)=>{ res.send(plumbers);
}).catch(next);
});

router.post('/plumbers',(req, res, next) => {
  Plumber.create(req.body).then((plumber) => {
    res.send(plumber);
  }).catch(next);
});

router.put('/plumbers/:id',(req, res, next) => {
  Plumber.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(plumber) {
    res.send(plumber);
  }).catch(next);
});

router.delete('/plumbers/:id', (req, res, next) => {
Plumber.remove({_id: req.params.id}).then((plumber) => {
  res.send(plumber)
}).catch(next);
});

module.exports = router;
