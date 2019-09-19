'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
// const upload = require('./../tools/cloudinary');


router.get('/pt', (req, res, next) => {
  User.find({role: 'personalTrainer'})
  .then(pts => res.render('pt', {pts} ))
  .catch(err => console.log(err));
});

router.get('/pt/list', (req, res, next) => {
  User.find({
    role: 'personalTrainer',
    name: {$regex : `${ req.query.ptName }`}
})
  .then(pts => res.render('pt', {pts} ))
  .catch(err => console.log(err));
});

router.get('/pt/list/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(PT => res.render('profilePT', { PT }))
  .catch(err => console.log(err));
});

module.exports = router;
