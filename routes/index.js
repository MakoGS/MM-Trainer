'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  // console.log(req.user)
  res.render('index', { title: 'Hello World!' });
});

module.exports = router;
