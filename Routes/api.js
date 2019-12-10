const express = require('express');
const router = express.Router();
const elect = require('../controllers/electController');
const carp = require('../controllers/carpController');
const plumb = require('../controllers/plumbController');
const paint = require('../controllers/paintController');
const ac_tech = require('../controllers/ac_techController');
const gen_tech = require('../controllers/gen_techController')
const gard = require('../controllers/gardenerController');

// get requests
router.get('/tech',(req, res) => {
    res.render('tech');
});

router.get('/', (req, res) => {
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

router.get('/ac_technicians', ac_tech.get_ac_technicians);

router.get('/generator_technicians', gen_tech.get_gen_technicians);

router.get('/gardeners', gard.get_gardeners)



// Post requests
router.post('/plumber', plumb.post_plumber);

router.post('/carpenter', carp.post_carpenter);

router.post('/electrician', elect.post_elect);

router.post('/painter', paint.post_painter);

router.post('/ac_technician', ac_tech.post_ac_technician);

router.post('/gen_technician', gen_tech.post_gen_technician);

router.post('/gardener', gard.post_gardener);
module.exports = router;
