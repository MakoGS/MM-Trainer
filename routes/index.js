'use strict';

const { Router } = require('express');
const router = Router();
const {ensureLoggedOut} = require('connect-ensure-login');

router.get('/', ensureLoggedOut('/user'), (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

module.exports = router;
