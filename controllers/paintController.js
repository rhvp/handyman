const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Painter = handymanDb.model('painters', techSchema);

exports.get_painters = (req, res, next) => {
    Painter.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
  }]).then((painters) => {
    const availableTechnicians = painters.filter(tech=>tech.available);
    res.send(availableTechnicians);
    }).catch(next);
}

exports.post_painter = (req, res, next) => {
    Painter.create(req.body).then((painter) => {
        res.send(painter);
    }).catch(next);
}