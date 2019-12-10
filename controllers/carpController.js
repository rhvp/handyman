const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Carpenter = handymanDb.model('carpenters', techSchema);

exports.get_carpenters = (req, res, err) => {
    Carpenter.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
    }]).then((carpenters)=>{ res.send(carpenters);
    }).catch((err) => {
        console.log('error: ', err);
    });
}

exports.post_carpenter = (req, res, err) => {
    Carpenter.create(req.body).then((carpenter) => {
        res.send(carpenter)
    }).catch((err) => {
        console.log('error: ', err);
    })
}

