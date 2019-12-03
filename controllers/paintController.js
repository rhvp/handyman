const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Painter = handymanDb.model('painters', techSchema);

exports.get_painters = (req, res, err) => {
    Painter.find({}).then((painters) => {
        res.send(painters)
    }).catch((error) => {
        console.log('error: ', err);
    });
}

exports.post_painter = (req, res, err) => {
    Painter.create(req.body).then((painter) => {
        res.send(painter);
    }).catch((error) => {
        console.log('error: ', err);
    });
}