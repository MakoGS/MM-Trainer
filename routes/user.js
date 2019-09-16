'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

router.get('/user', (req, res, next) => {
  User.findById(req.user._id)
  .then(user => res.render('user', { user }))
  .catch(err => console.log(err));
});

module.exports = router;
