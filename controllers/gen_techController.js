const handymanDb = require('../config/mongoose')
const techSchema = require('../models/techSchema')

const Gen_Technician = handymanDb.model('generator_technician', techSchema);

exports.get_gen_technicians = (req, res, next) => {
    Gen_Technician.aggregate([{ $geoNear: { near: {type: 'Point',
    coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
    spherical: true, maxDistance: 3000, distanceField: "dist.calculated" }
    }]).then(gen_technician => {
        const availableTechnicians = gen_technician.filter(tech=>tech.available);
        res.send(availableTechnicians);
    }).catch(next);
}

exports.post_gen_technician = (req, res, next) => {
    Gen_Technician.create(req.body).then(gen_technician=>{
        res.send(gen_technician)
    }).catch(next);
}