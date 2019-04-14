const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

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
