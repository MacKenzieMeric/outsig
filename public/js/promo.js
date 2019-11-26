const Bag = require('../../models/bag.js');

const apply = (req, res) => {
  const bag = new Bag(req.session.bag);
  const code = req.body.promo;
  const discount = bag.promo(code);

  req.session.promo = code;

  if (discount === undefined) {
    res.render('bag.hbs', {
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal,
      title: 'Bag | Outsider Signal',
      total: bag.subtotal + bag.shipping
    });
  } else {
    res.render('bag.hbs', {
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal - discount,
      title: 'Bag | Outsider Signal',
      total: bag.subtotal - discount + bag.shipping
    });
  }
};

module.exports = {
  apply
}
