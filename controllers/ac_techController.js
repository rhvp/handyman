const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Ac_Technician = handymanDb.model('ac_technician', techSchema);

exports.get_ac_technicians = (req, res, next) => {
    Ac_Technician.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
    }]).then(ac_technician=>{
        res.send(ac_technician)
    }).catch(err=>{
        console.log('error: ', err);
    });
}

exports.post_ac_technician = (req, res, next) => {
    Ac_Technician.create(req.body).then(ac_technician=>{
        res.send(ac_technician)
    }).catch(err=>{
        console.log('error: ', err)
    })
}