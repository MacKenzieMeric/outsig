const Bag = require('../../models/bag.js');

const order = require('./insertOrder.js');
const sendEmails = require('./sendEmails.js');

const getDate = (req) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const current = new Date();
  const day = current.getDate();
  const month = months[current.getMonth()];
  const year = current.getFullYear();
  
  const result = req.session.orderPlaced = `${month} ${day}, ${year}`;

  return result;
};

const getNumber = () => Math.floor(1000 + Math.random() * 9000);


const process = (req, res) => {
  if (!req.session.bag) {
    return res.render('bag', {products: null});
  }

  const bag = new Bag(req.session.bag);
  const stripe = require('stripe')('sk_test_mMHe64rTuHAg5qk5cUyCGwCx');

  const x = {
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2 || '',
    city: req.body.city,
    country: req.body.country,
    name: `${req.body.firstName} ${req.body.lastName}`,
    orderDate: getDate(req),
    orderNumber: getNumber(),
    phone: req.body.phone,
    products: bag.map(),
    postalCode: req.body.postalCode,
    recipient: req.body.email,
    shipping: bag.shipping,
    state: req.body.state,
    subtotal: bag.subtotal,
    total: bag.shipping + bag.subtotal
  };

  stripe.customers.create({
    address: {
      city: x.city,
      country: x.country,
      line1: x.addressLine1,
      line2: x.addressLine2,
      postal_code: x.postalCode,
      state: x.state
    },
    email: x.recipient,
    shipping: {
      address: {
        city: x.city,
        country: x.country,
        line1: x.addressLine1,
        line2: x.addressLine2,
        postal_code: x.postalCode,
        state: x.state
      },
      name: x.name,
      phone: x.phone
    },
    source: req.body.stripeToken,
  })
  .then(customer => stripe.charges.create({
    amount: bag.shipping + bag.subtotal * 100,
    currency: 'usd',
    customer: customer.id
  }, (err) => {console.log(err)}))
  .then(charge => res.render('invoice', {
    addressLine1: x.addressLine1,
    addressLine2: x.addressLine2,
    city: x.city,
    country: x.country,
    orderDate: x.orderDate,
    orderNumber: x.orderNumber,
    products: bag.build(),
    recipient: x.recipient,
    shipping: x.shipping,
    state: x.state,
    subtotal: x.subtotal,
    title: 'Invoice',
    total: x.total
  }))
  .then(order.insertOrder(x))
  .then(sendEmails.invoice(x))
  .then(req.session.destroy());
};


module.exports = {
  process
}