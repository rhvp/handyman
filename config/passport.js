const bcrypt = require('bcryptjs');
const passport = require('passport');
const local = require('passport-local');
const User = require('../models/userSchema');
const LocalStrategy = local.Strategy;