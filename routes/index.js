const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index/index', {
    pageLabel: 'Welcome',
  });
});

module.exports = router;
