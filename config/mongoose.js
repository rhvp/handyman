const mongoose = require('mongoose')


// Connecting to mongodb
const handymanDb = mongoose.createConnection('mongodb://localhost/handymanDb', {useNewUrlParser: true});


handymanDb.once('open', () => {
  console.log('handymanDb connected');
})


mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = handymanDb