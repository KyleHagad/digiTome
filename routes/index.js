const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user'); // <=< ditto the above regarding mongoose
const Story = mongoose.model('story'); // <=< onehundredpercent certain that we need this one

const { ensureAuthenticated, ensureGuest } = require('../helpers/auth'); // <=< destructuring brings in both helper functions

router.get('/', ensureGuest, (req, res) => { // <=< to Welcome page
  res.render('index/welcome', {
    pageLabel: 'Welcome',
  });
});

router.get('/dash', ensureAuthenticated, (req, res) => { // <=< to Dash
  Story.find({ user:req.user.id })
  .then(stories => {
    res.render('index/dash', {
    pageLabel: 'Dash',
    stories: stories
    });
  });
});

router.get('/about', (req, res) =>{ // <=< to About
  res.render('index/about', {
    pageLabel: 'Index',
  });
});

module.exports = router;
