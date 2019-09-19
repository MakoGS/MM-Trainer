'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const upload = require('./../tools/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/user', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.user._id)
  .then(user => res.render('user', { user }))
  .catch(err => console.log(err));
});

router.get('/user/edit/', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.user._id)
  .then(user => res.render('userEdit', { user }))
  .catch(err => console.log(err));
});

router.post('/user/edit/', ensureLoggedIn('/'), upload.single('image'), (req, res, next) => {
  console.log(req.body);
  User.updateOne({_id: req.user._id}, {
    name: req.body.name,
    email:  req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    genre: req.body.genre,
    skills: req.body.skills,
    description: req.body.description,
    role: req.user.role,
    image: req.file.url,  
    location: req.body.location
  })
  .then(user => {
    res.redirect('/user');
  })
  .catch(err => console.log(err));
});

router.post('/user/delete/', ensureLoggedIn('/'), (req, res, next) => {
  User.findByIdAndDelete(req.user._id)
  .then(user => {
    console.log( `${user} was deleted.`);
    req.logout();
    res.redirect('/');
})
  .catch(err => console.log(err));
});

module.exports = router;
