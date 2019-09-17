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