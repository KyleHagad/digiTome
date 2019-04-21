const express = require('express');
const passport = require('passport'); // <=< not sure if either passport or mongoose in actually necessary here
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user'); // <=< ditto the above regarding mongoose

const { ensureAuthenticated, ensureGuest } = require('../helpers/auth'); // <=< destructuring brings in both helper functions

router.get('/', ensureGuest, (req, res) => { // <=< to Welcome page
  res.render('index/welcome', {
    pageLabel: 'Welcome',
  });
});

router.get('/dash', ensureAuthenticated, (req, res) => { // <=< to Dash
  res.render('index/dash', {
    pageLabel: 'Dash',
  });
});

router.get('/about', (req, res) =>{ // <=< to About
  res.render('index/about', {
    pageLabel: 'Index',
  });
});

module.exports = router;
