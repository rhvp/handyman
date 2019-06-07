const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Connecting to mongodb
mongoose.connect('mongodb://localhost/plumberDb', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


// setting template engine
app.set('view engine', 'ejs');

// static files renderer
app.use('/assets', express.static('assets'));

// use bodyParser to process data in request body
app.use(bodyParser.json());


// initialize routes
app.use(require('./Routes/api'));


// error-handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
})

app.listen(4000, function(){
  console.log("now listening on port 4000");
})
