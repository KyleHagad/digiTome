const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user');

const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
  res.render('index/welcome', {
    pageLabel: 'Welcome',
  });
});

router.get('/dash', ensureAuthenticated, (req, res) => {
  res.render('index/dash', {
    pageLabel: 'Dash',
  });
});

router.get('/about', (req, res) =>{
  res.render('index/about', {
    pageLabel: 'Index',
  });
});

module.exports = router;
