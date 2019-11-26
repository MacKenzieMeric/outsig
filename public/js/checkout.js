const Bag = require('../../models/bag.js');

const apply = (req, res) => {
  const bag = new Bag(req.session.bag);
  const code = req.session.promo;
  const discount = bag.promo(code);

  if (discount === undefined) {
    res.render('checkout', {
      promo: 'None',
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal,
      success: req.session.success,
      title: 'Checkout',
      total: bag.subtotal + bag.shipping
    });
  } else {
    res.render('checkout', {
      promo: code,
      products: bag.build(),
      shipping: bag.shipping,
      subtotal: bag.subtotal - discount,
      success: req.session.success,
      title: 'Checkout',
      total: bag.subtotal - discount + bag.shipping
    });
  }
};

module.exports = {
  apply
}
