'use strict';

const { Router } = require('express');
const router = Router();
const Shop = require('./../../models/shop');
const upload = require('./../../tools/cloudinary');

router.get('/shops', (req, res, next) => {
  Shop.find({})
  .then(allShops => {
    res.render('admin/shops', {allShops});
  })
  .catch(err => console.log(err));
});

router.post('/shops/add',upload.single('image'),(req, res, next) => {
  Shop.create({
      name: req.body.name,
      location: {
        city: req.body.city,
        address: req.body.address
      },
      type: req.body.type,
      contact: {
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website
      },
      image: req.file.url
      })
    .then(allShops => res.redirect('/admin/shops'))
    .catch(error => console.log('There was an error adding a shop', error))
});

router.post('/shops/delete/:shopId', (req, res, next) => {
  Shop.findByIdAndDelete(req.params.shopId)
  .then(shop => {
    console.log( `${shop} was deleted.`);
    res.redirect('/');
})
  .catch(err => console.log(err));
});

router.get('/shops/edit/:shopId', (req, res, next) => {
  Shop.findById(req.params.shopId)
  .then(shop => res.render('shopEdit', { shop }))
  .catch(err => console.log(err));
});

router.post('/shops/edit', (req, res, next) => {
  Shop.update({
    name: req.body.name,
      location: {
        city: req.body.city,
        address: req.body.address
      },
      type: req.body.type,
      contact: {
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website
      },
      image: req.file.url
      })
  .then(shop => {
    res.render('shopEdit', { shop });
    res.redirect('/admin/shops')
  })
  .catch(err => console.log(err));
});

module.exports = router;