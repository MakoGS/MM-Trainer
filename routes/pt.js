'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const nodemailer = require('nodemailer');
const { ensureLoggedIn } = require('connect-ensure-login');
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


router.get('/pt/message', ensureLoggedIn('/'), (req, res, next) => {
  res.render('messagePT');
});

router.get('/pt/message/:userId', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.params.userId)
    .then(PT => res.render('messagePT', { PT }))
    .catch(err => console.log(err));
});

router.post('/pt/message/', ensureLoggedIn('/'), (req, res, next) => {

  const transporter=nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user:'ih.mmtrainer@gmail.com',
      pass: 'marcosmiguel'
    }
  });
  const pt= req.body.ptName;
  const to='ih.mmtrainer@gmail.com';
  const subject=req.body.subject;
  const message=req.body.description;
  const from= req.body.email;
  transporter.sendMail({
    from:`"New message!" <ih.mmtrainer@gmail.com>`,
    to,
    subject,
    html:`Hello ${pt},<br>You received a new message from ${from}:<br><strong>${message}</strong>`,
    text: message
  })
  .then(result=>{
    console.log(`Email sent to ${to}`);
    res.redirect('/pt');
  })
  .catch(error=> {
    console.log(error);
  });
});

module.exports = router;
