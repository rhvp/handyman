const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// Connecting to mongodb
mongoose.connect('mongodb://localhost/plumberDb', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/carpDb', {useNewUrlParser: true});
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
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});


app.listen(4000, () => {
  console.log("now listening on port 4000");
});
