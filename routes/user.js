'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

router.get('/user', (req, res, next) => {
  User.findById(req.session.user._id)
  .then(user => res.render('user', { user }))
  .catch(err => console.log(err));
});

router.get('/user/edit', (req, res, next) => {
  User.findById(req.session.user._id)
  .then(user => res.render('userEdit', { user }))
  .catch(err => console.log(err));
});

router.post('/user/edit', (req, res, next) => {
  User.update({
    name: req.body.name,  
    dateOfBirth: req.body.dateOfBirth,
    genre: req.body.genre,
    skills: req.body.skills,
    description: req.body.description,
    location: req.body.location,
    role: req.body.role
  })
  .then(user => {
    res.render('userEdit', { user });
    res.redirect('/user')
  })
  .catch(err => console.log(err));
});

router.post('/user/delete/', (req, res, next) => {
  User.findByIdAndDelete(req.user._id)
  .then(user => {
    console.log( `${user} was deleted.`);
    req.logout();
    res.redirect('/');
})
  .catch(err => console.log(err));
});

module.exports = router;
