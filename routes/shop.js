'use strict';
const { Router } = require('express');
const router = Router();

router.get('/shops', (req, res, next) => {
  res.render('');
});
router.post('/shops', (req, res, next) => {
  res.render('');
});
router.get('/shops:id', (req, res, next) => {
  res.render('');
});

module.exports = router;




/* 
/GET "/shops"
/POST "/shops"
/GET "/shops/:id" 
*/