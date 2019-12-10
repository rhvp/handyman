const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Plumber = handymanDb.model('plumbers', techSchema);


exports.get_plumbs = (req, res, err) => {
    Plumber.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
  }]).then((plumbers) => {
        res.send(plumbers)
    }).catch((err) => {
        console.log('error: ', err)
    })
}

exports.post_plumber = (req, res, err) => {
    Plumber.create(req.body).then((plumber) => {
        res.send(plumber)
    }).catch((err) => {
        console.log('error: ', err)
    })
}