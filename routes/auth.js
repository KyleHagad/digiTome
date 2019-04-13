const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

module.exports = router;
