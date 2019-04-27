const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const User = mongoose.model('user');
const Story = mongoose.model('story');

const { ensureAuthenticated } = require('../helpers/auth');

// >>=Get to READ public stories page=<<
router.get('/index', (req, res) =>{
  Story.find({ status: 'public' })
    .populate('user')
    .sort({date: 'desc'})
    .then(stories => {
      res.render('stories/index', {
        pageLabel: 'Records index',
        stories: stories
      });
    });
});

// >>=Get to READ story page=<<
router.get('/read/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
  .populate('user')
  .populate('comments.commentUser')
  .then(story => {
    res.render('stories/read', {
    story: story,
    pageLabel: 'Read Record'
    });
  });
});

// >>=Get to Create stories form=<<
router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('stories/create', {
    pageLabel: 'Create Record'
  });
});

// >>=Get to Update stories form=<<
router.get('/update/:id', ensureAuthenticated, (req, res) => { 
  Story.findOne({ _id: req.params.id })
    .then(story => {
      if(story.user != req.user.id) {
        res.redirect('stories');
      } else {
        res.render('stories/update', {
          pageLabel: 'Update Record',
          story: story
        });
      }
    });
});

// >>=Create Story process=<<
router.post('/', ensureAuthenticated, (req, res) => {
  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = { // <=< builds new story object
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

    new Story(newStory) // <=< saves the story object
    .save()
    .then(story => {
      res.redirect(`/stories/read/${story.id}`);
    });
});

// >>=UPDATE story process=<<
router.put('/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
   .then(story => {
      let allowComments;

      if (req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }

      story.title = req.body.title; // <=<|4 New values for the story
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;

      story.save()
      .then(story => {
        res.redirect('/dash');
      });
    });
});

// >>=DELETE story process=<<
router.delete('/:id', (req, res) => {
  Story.remove({ _id: req.params.id })
    .then(() => {
      res.redirect('/dash');
    });
});

// >>=POST Comment=<<
router.post('/comment/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      const newComment = {
        commentBody: req.body.commentBody,
        commentUser: req.user.id
      }
      story.comments.unshift(newComment); // <=< add comment at index 0 of comments array

      story.save() // <=< save comment and display READ page with the new content
        .then(story => {
          res.redirect(`/stories/read/${story.id}`);
        });
    });
});

module.exports = router;
