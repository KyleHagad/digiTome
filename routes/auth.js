const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}), 
  (req, res) => { // v== successful login takes you to dashboard
    res.redirect('/dashboard');
  });

module.exports = router;
