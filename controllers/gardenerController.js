const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Gardener = handymanDb.model('gardener', techSchema);

exports.get_gardeners = (req, res, next) => {
    Gardener.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
  }]).then((gardeners) => {
        res.send(gardeners)
    }).catch(next)
}

exports.post_gardener = (req, res, next) => {
    Gardener.create(req.body).then((gardener) => {
        res.send(gardener);
    }).catch(next);
}