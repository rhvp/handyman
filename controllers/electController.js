
const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Electrician = handymanDb.model('electricians', techSchema);

exports.get_elects = (req, res, next) => {
    Electrician.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
 }]).then((electricians) => {
        res.send(electricians);
    }).catch(next);
}

exports.post_elect = (req,res,next) => {
    Electrician.create(req.body).then((electrician) => {
        res.send(electrician)
    }).catch(next);
}

