'use strict';

const {
  Router
} = require('express');
const router = Router();
const Shop = require('./../models/shop');
const nodemailer = require('nodemailer');
const { ensureLoggedIn } = require('connect-ensure-login');


// router.get('/shops', (req, res, next) => {
//   res.render('shops');
// });

router.get('/shops', ensureLoggedIn('/'), (req, res, next) => {
  Shop.find({})
    .then(allShops => {
      res.render('shops', {
        allShops
      });
    })
    .catch(err => console.log(err));
});

router.get('/shops/message', ensureLoggedIn('/'), (req, res, next) => {
  res.render('message');
});

router.get('/shops/message/:shopId', ensureLoggedIn('/'), (req, res, next) => {
  Shop.findById(req.params.shopId)
    .then(shop => res.render('message', {shop}))
    .catch(err => console.log(err));
});

router.post('/shops/message/', ensureLoggedIn('/'), (req, res, next) => {

  const transporter=nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user:'ih.mmtrainer@gmail.com',
      pass: 'marcosmiguel'
    }
  });
  const shop= req.body.shopName;
  const to='ih.mmtrainer@gmail.com';
  const subject=req.body.subject;
  const message=req.body.message;
  const from= req.body.email;
  transporter.sendMail({
    from:`"New message!" <ih.mmtrainer@gmail.com>`,
    to,
    subject,
    html:`Hello ${shop},<br>You received a new message from ${from} :<br>Message: <strong>${message}</strong>`,
    text: message
  })
  .then(result=>{
    console.log(`Email sent to ${to}`);
    res.redirect('/shops');
  })
  .catch(error=> {
    console.log(error);
  });
});
  
module.exports = router;