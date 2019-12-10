const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Painter = handymanDb.model('painters', techSchema);

exports.get_painters = (req, res, err) => {
    Painter.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
  }]).then((painters) => {
        res.send(painters)
    }).catch((err) => {
        console.log('error: ', err);
    });
}

exports.post_painter = (req, res, err) => {
    Painter.create(req.body).then((painter) => {
        res.send(painter);
    }).catch((err) => {
        console.log('error: ', err);
    });
}