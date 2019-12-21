require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();



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
  console.error(err.stack);
  res.status(422).send({error: err.message});
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("now listening on port: " + port);
});
