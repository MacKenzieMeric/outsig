const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Article = require('../models/article');
const Athlete = require('../models/athlete');
const Bag = require('../models/bag');
const Product = require('../models/product');

const charge = require('../public/js/charge');
const checkout = require('../public/js/checkout');
const sendEmails = require('../public/js/sendEmails');
const item = require('../public/js/item');
const keys = require('../config/keys');
const promo = require('../public/js/promo');
const search = require('../public/js/search');

mongoose.connect(keys.mongo, {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Outsider Signal'
  });
});

router.get('/add/:tag', (req, res) => {
  item.add(req, res);
});

router.get('/bag', (req, res) => {
  item.load(req, res);
});

router.get('/blog', (req, res) => {
  Article.find({}, (err, docs) => {
    res.render('blog', {
      items: docs,
      title: 'Blog'
    });
  });
});

router.get('/blog/:url', (req, res) => {
  Article.findOne({tag: req.params.url}, (err, docs) => {
    if (!docs) {
      res.render('404', {
        title: '404'
      });
      return;
    }

    res.render('article', {
      article: docs,
      title: docs.title
    });
  });
});

router.get('/checkout', (req, res) => {
  checkout.apply(req, res);
});

router.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help'
  })
});

router.get('/ie', (req, res) => {
  res.render('ie', {
    title: 'IE'
  });
});

router.get('/invoice', (req, res) => {
  const bag = new Bag(req.session.bag);
  res.render('invoice', {
    products: bag.build(),
    title: 'Invoice'
  });
});

router.get('/remove/:id', (req, res) => {
  item.remove(req, res);
});

router.get('/shop', (req, res) => {
  Product.find({}, (err, docs) => {
    res.render('shop', {
      items: docs,
      title: 'Shop'
    });
  });
});

router.get('/shop/:url', (req, res) => {
  Product.findOne({tag: req.params.url}, (err, docs) => {
    if (!docs) {
      res.render('404', {
        title: '404'
      });
      return;
    }

    res.render('spotlight', {
      product: docs,
      title: docs.name
    });
  });
});

router.get('/team', (req, res) => {
  Athlete.find({}, (err, docs) => {
    res.render('team', {
      athlete: docs,
      title: 'Team'
    });
  });
});

router.get('*', (req, res) => {
  res.render('404', {
    title: '404'
  });
});

// POST routes

router.post('/charge', (req, res) => {
  charge.process(req, res);
});

router.post('/mailing-list', (req, res) => {
  sendEmails.code(req, res);
});

router.post('/minus/:id', (req, res) => {
  item.minus(req, res);
});

router.post('/plus/:id', (req, res) => {
  item.plus(req, res);
});

router.post('/promo', (req, res) => {
  promo.apply(req, res);
});

router.post('/search', (req, res) => {
  search.apply(req, res);
});

router.post('/ship', (req, res) => {
  console.log(req.body);
  res.send('testing');
});

module.exports = router;
