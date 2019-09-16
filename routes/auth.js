'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//--CLOUDINARY CONFIG.
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/node-file-tumblr',
  allowedFormats: [ 'jpg', 'png' ]
});

const upload = multer({ storage });
//--END CLOUDINARY CONFIG

router.get('/sign-up', ensureLoggedOut(), (req, res, next) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', ensureLoggedOut(), upload.single('image'), passport.authenticate('sign-up', {
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

router.get('/logout', ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;