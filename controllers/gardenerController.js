const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Gardener = handymanDb.model('gardener', techSchema);

exports.get_gardeners = (req, res, err) => {
    Gardener.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
  }]).then((gardeners) => {
        res.send(gardeners)
    }).catch((err) => {
        console.log('error: ', err)
    })
}

exports.post_gardener = (req, res, err) => {
    Gardener.create(req.body).then((gardener) => {
        res.send(gardener);
    }).catch((err) => {
        console.log('error: ', err);
    });
}