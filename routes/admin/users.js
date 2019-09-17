'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../../models/user');

router.get('/users', (req, res, next) => {
  
  User.find({})
  .then(users => res.render('admin/users', {users} ))
  .catch(err => console.log(err));
});

router.post('/users/delete/:userId', (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
  .then(user => {
    console.log( `${user} was deleted.`);
    res.redirect('/');
})
  .catch(err => console.log(err));
});

module.exports = router;