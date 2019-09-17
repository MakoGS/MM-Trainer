'use strict';

const { Router } = require('express');
const router = Router();
const Shop = require('./../../models/shop');

/* router.get('/shops', (req, res, next) => {
  res.render('admin/shops', {shops});  //view
});
 */

router.get('/shops', (req, res, next) => {
  Shop.find({})
  .then(allShops => {
    res.render('admin/shops', {allShops});
  })
  .catch(err => console.log(err));
});

router.post('/shops/add', (req, res, next) => {
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
      }     
      })
    .then(allShops => res.redirect('admin/shops'))
    .catch(error => console.log('There was an error adding a shop', error))
});

// router.post('/shops/delete/:shopID', (req, res, next) => {
//   Shop.findByIdAndDelete(req.params.shopID)
//   .then(shop => {
//     console.log( `${shop} was deleted.`);
//     res.redirect('/');
// })
//   .catch(err => console.log(err));
// });

module.exports = router;
/* 
/GET "/admin/shops
 */