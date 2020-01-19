const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Carpenter = handymanDb.model('carpenters', techSchema);

exports.get_carpenters = (req, res, next) => {
    Carpenter.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
    }]).then(carpenters=>{
        const availableTechnicians = carpenters.filter(tech=>tech.available);
        res.send(availableTechnicians);
    }).catch(next);
}

exports.post_carpenter = (req, res, next) => {
    Carpenter.create(req.body).then((carpenter) => {
        res.send(carpenter)
    }).catch(next)
}

