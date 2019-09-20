'use strict';

const { Router } = require('express');
const router = Router();
const {ensureLoggedOut} = require('connect-ensure-login');

router.get('/', ensureLoggedOut('/user'), (req, res, next) => {
  res.render('index');
});
router.get('/404', (req, res, next) => {
  res.render('404');
});

module.exports = router;
