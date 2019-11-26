var mongoose = require('mongoose');

var Product = require('../models/product.js');

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});

var products = [
  new Product({
    category: 'T-Shirt',
    description: 'New product.',
    image: '../images/cs-green.png',
    imagesList: ['../images/cs-green.png', '../images/cs-red.png'],
    name: 'Outsig Ouroboros',
    price: 35,
    size: 'empty',
    sku: 'empty',
    url: '/ouroboros'
  }),
  new Product({
    category: 'T-Shirt',
    description: 'New product.',
    image: '../images/cs-red.png',
    imagesList: ['../images/cs-red.png', '../images/cs-purple.png', '../images/cs-green.png'],
    name: 'Outsig Arrival',
    price: 30,
    size: 'empty',
    sku: 'empty',
    url: '/arrival'
  })
];

var done = 0;

for (var i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      console.log('Complete');
      exit();
    }
  });
}

var exit = () => {
  mongoose.disconnect();
};
