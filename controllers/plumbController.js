const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Plumber = handymanDb.model('plumbers', techSchema);

exports.get_plumbs = (req, res, err) => {
    Plumber.find({}).then((plumbers) => {
        res.send(plumbers)
    }).catch((error) => {
        console.log('error: ', err)
    })
}

exports.post_plumber = (req, res, err) => {
    Plumber.create(req.body).then((plumber) => {
        res.send(plumber)
    }).catch((error) => {
        console.log('error: ', err)
    })
}