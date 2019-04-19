const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user');

router.get('/', (req, res) => {
  res.render('index/welcome', {
    pageLabel: 'Welcome',
  });
});

router.get('/dash', (req, res) => {
  res.render('index/dash', {
    pageLabel: 'Dash',
  });
});

module.exports = router;
