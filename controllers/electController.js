
const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Electrician = handymanDb.model('electricians', techSchema);

exports.get_elects = (req, res, err) => {
    Electrician.find({}).then((electricians) => {
        res.send(electricians);
    }).catch((error) => {
        console.log('error: ', err);
    });
}

exports.post_elect = (req,res,err) => {
    Electrician.create(req.body).then((electrician) => {
        res.send(electrician)
    }).catch((error) => {
        console.log('error: ', err);
    });
}
