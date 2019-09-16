'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

module.exports = router;