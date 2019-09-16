'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../../models/user');

router.get('/users', (req, res, next) => {
  
  User.find({})
  .then(users => res.render('admin/users', {users} ))
  .catch(err => console.log(err));
});

router.post('/users/delete', (req, res, next) => {
  
  User.delete({})
  .then(users => res.render('admin/users', {users} ))
  .catch(err => console.log(err));
});

module.exports = router;