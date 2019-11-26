const Bag = require('../../models/bag');
const Product = require('../../models/product');

const add = (req, res) => {
  const bag = new Bag(req.session.bag ? req.session.bag: {});
  const tag = req.params.tag;
  const size = req.query.size;

  req.check('size', '').notEmpty();
  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    
    const size = errors.find(item => item.param === 'size');

    Product.findOne(tag, (err, product) => {
      res.render('spotlight', {
        errors: req.session.errors,
        product,
        title: product.name + ' | ' + 'Outsider Signal'
      });
    });
  } else {
    Product.findOne({tag: tag}, (err, product) => {
      product.size = size;
      product.sku = tag + '-' + size;

      bag.add(product, product.sku);

      req.session.bag = bag;

      res.render('spotlight', {
        product,
        title: product.name + ' | ' + 'Outsider Signal',
        update: true // What is this property?
      });
    });
  }
};

const load = (req, res) => {
  if (!req.session.bag) {
    return res.render('bag', {
      products: null,
      title: 'Bag'
    });
  };

  const bag = new Bag(req.session.bag);
  const code = req.session.promo;
  const discount = bag.promo(code);

  if (discount === undefined) {
    res.render('bag', {
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal,
      title: 'Bag',
      total: bag.subtotal + bag.shipping
    });
  } else {
    res.render('bag', {
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal - discount,
      title: 'Bag | Outsider Signal',
      total: bag.subtotal - discount + bag.shipping
    });
  }
};

const minus = (req, res) => {
  const bag = new Bag(req.session.bag ? req.session.bag : {});
  const count = req.body.count;
  const id = req.params.id;
  req.session.bag = bag;

  bag.minusOne(id);

  res.redirect('/bag');
};

const plus = (req, res) => {
  const bag = new Bag(req.session.bag ? req.session.bag : {});
  const id = req.params.id;
  req.session.bag = bag;

  bag.plusOne(id);

  res.redirect('/bag');
};

const remove = (req, res) => {
  const bag = new Bag(req.session.bag ? req.session.bag : {});
  const id = req.params.id;

  req.session.bag = bag;

  bag.drop(id);

  if (bag.totalQty === 0) {
    bag.totalQty = null;
  }

  res.redirect('/bag');
};

module.exports = {
  add,
  load,
  minus,
  plus,
  remove
}
