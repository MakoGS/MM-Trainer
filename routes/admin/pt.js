'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../../models/user');

router.get('/pt', (req, res, next) => {
  User.find({role: 'personalTrainer'})
  .then(pts => res.render('admin/pt', {pts} ))
  .catch(err => console.log(err));
});

router.post('/pt/list', (req, res, next) => {
  User.find({
    role: 'personalTrainer',
    name: {$regex : `${ req.query.ptName }`}
})
  .then(pts => res.render('admin/pt', {pts} ))
  .catch(err => console.log(err));
});

router.post('/pt/delete/:ptId', (req, res, next) => {
  User.findByIdAndDelete(req.params.ptId)
  .then(pt => {
    console.log( `${pt} was deleted.`);
    res.redirect('/');
})
  .catch(err => console.log(err));
});

module.exports = router;