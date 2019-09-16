'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/sign-up', (req, res, next) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', ensureLoggedOut(), passport.authenticate('sign-up', {
  successRedirect: "/",
  failureRedirect: "/sign-up"
}));

router.get('/login', ensureLoggedOut(), (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('login', {
  successRedirect: "/",
  failureRedirect: "/login"
}));

router.post('/logout', ensureLoggedIn('/login'), (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

module.exports = router;