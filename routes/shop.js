'use strict';

const { Router } = require('express');
const router = Router();


router.get('/shops', (req, res, next) => {
  res.render('shops');
});





module.exports = router;