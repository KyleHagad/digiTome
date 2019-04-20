const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user');

router.get('/index', (req, res) =>{
  res.render('stories/index', {
    pageLabel: 'Records index',
  });
});

router.get('/create', (req, res) =>{
  res.render('stories/create', {
    pageLabel: 'Create Record',
  });
});

router.get('/read', (req, res) =>{
  res.render('stories/read', {
    pageLabel: 'Read Record',
  });
});

router.get('/update', (req,res) =>{
  res.render('stories/update', {
    pageLabel: 'Update Record',
  });
});

module.exports = router;
