'use strict';

const { Router } = require('express');
const router = Router();
const Shop = require('./../models/shop');


// router.get('/shops', (req, res, next) => {
//   res.render('shops');
// });

router.get('/shops', (req, res, next) => {
  Shop.find({})
  .then(allShops => {
    res.render('shops', {allShops});
  })
  .catch(err => console.log(err));
});


module.exports = router;