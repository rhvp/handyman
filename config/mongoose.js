const mongoose = require('mongoose')


// Connecting to mongodb
mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASSWORD + '@my-cluster-01-a0hk3.mongodb.net/handymandb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(
  res => {
    console.log('handymandb on mlab connected')
  }
).catch(err => {
  console.log('handymandb mlab connection failed')
});





mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose.connection;