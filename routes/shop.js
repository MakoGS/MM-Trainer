'use strict';

const { Router } = require('express');
const router = Router();


const shops=[
  {
    'name': 'Prozis',
    'location': {address:'Rua A', city:'Porto'},
    'type':'Sports Nutrition',
    'contact': {email: 'geral@prozis.pt', phone:'00351', website:'www.prozis.pt'},
    'photo': 'https://varzim.pt/site/wp-content/uploads/2016/07/prozis.jpg'
  },
  {
    'name': 'Celeiro',
    'location': {address:'Rua B', city:'Lisboa'},
    'type': 'Health/Nature Shop',
    'contact': {email: 'geral@celeiro.pt', phone:'00352', website:'www.celeiro.pt'},
    'photo': 'https://www.celeiro.pt/pub/media/contentmanager/content/cache/400x400/sobre-o-celeiro/logo-celeiro.jpg'
  }
];

router.get('/shops', (req, res, next) => {
  res.render('shop', {shops});
});

router.post('/shops', (req, res, next) => {
  res.render('');
});

router.get('/shops/:shopsId', (req, res, next) => {
  res.send(req.params);
});

module.exports = router;

