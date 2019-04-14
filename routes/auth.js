const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => { // v== successful login takes you to dashboard
    res.redirect('/index/dash');
  });

router.get('/verify', (req, res) => {
  if(req.user){
    console.log(req.user);
  } else {
    console.log('no auth');
  }
});

router.get('/dash', (req, res) => {
  res.render('index/dash', {
    pageLabel: 'Dash',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
