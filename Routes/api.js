const express = require('express');
const router = express.Router();
const elect = require('../controllers/electController')
const carp = require('../controllers/carpController')
const plumb = require('../controllers/plumbController')
const paint = require('../controllers/paintController')


router.get('/tech',(req, res)=>{
    res.render('tech');
});

router.get('/', (req, res) => {
  // include sign in with third-party api on homepage
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/plumbers', plumb.get_plumbs);

router.get('/carpenters', carp.get_carpenters);

router.get('/electricians', elect.get_elects);

router.get('/painters', paint.get_painters);




router.post('/plumber', plumb.post_plumber);

router.post('/carpenter', carp.post_carpenter);

router.post('/electrician', elect.post_elect);

router.post('/painter', paint.post_painter);


/*router.put('/plumbers/:id',(req, res, next) => {
  Plumber.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(plumber) {
    res.send(plumber);
  }).catch(next);
});

router.delete('/plumbers/:id', (req, res, next) => {
Plumber.remove({_id: req.params.id}).then((plumber) => {
  res.send(plumber)
}).catch(next);
});*/



module.exports = router;
