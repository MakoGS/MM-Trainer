'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const upload = require('./../tools/cloudinary');

router.get('/sign-up', ensureLoggedOut(), (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', ensureLoggedOut(), upload.single('image'), passport.authenticate('sign-up', {
  successRedirect: "/user",
  failureRedirect: "/"
}));

router.get('/login', ensureLoggedOut(), (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('login', {
  successRedirect: "/user",
  failureRedirect: "/"
}));

router.get('/logout',ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;