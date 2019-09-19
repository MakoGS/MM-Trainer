'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../../models/user');

router.get('/users', (req, res, next) => {
  User.find({role: 'client'})
  .then(users => res.render('admin/users', {users} ))
  .catch(err => console.log(err));
});

router.get('/users/list', (req, res, next) => {
  User.find({
    role: 'client',
    name: {$regex : `${ req.query.userName }`}
})
  .then(users => res.render('admin/users', {users} ))
  .catch(err => console.log(err));
});

router.post('/users/delete/:userId', (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
  .then(user => {
    console.log( `${user} was deleted.`);
    res.redirect('/admin/users');
})
  .catch(err => console.log(err));
});

module.exports = router;