const keys = require('../../config/keys.js');
const mongoose = require('mongoose');

const API_KEY = keys.mg;
const DOMAIN = 'outsidersignal.com';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const code = (req, res) => {
  let email = req.body.email;
  
  mongoose.connect(keys.mongo, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    const db = mongoose.connection;
    const collection = db.collection('emails');

    email = email.toLowerCase();
    const emails = {email};

    collection.insert([emails], (err, res) => {
      // Handle errors
    });
  });

  const me = {
    from: 'Outsider Signal <team@outsidersignal.com>',
    to: 'mackenzieprice@protonmail.com',
    subject: `${email} has Joined the Mailing List`,
    text: `${email} has Joined the Mailing List`
  };

  const user = {
    from: 'Outsider Signal <team@outsidersignal.com>',
    to: email,
    subject: 'Your 10% Off Code',
    text: 'FIX'
  };

  mailgun.messages().send(user, (error, body) => {});
  mailgun.messages().send(me, (error, body) => {});

  res.render('mailingList', {
    title: 'Mailing List'
  });
};
                          
const invoice = (x) => {
  const addressLine1 = x.addressLine1;
  const addressLine2 = x.addressLine2;
  const city = x.city;
  const country = x.country;
  const name = x.name;
  const orderDate = x.orderDate;
  const orderNumber = x.orderNumber;
  const postalCode = x.postalCode;
  const products = x.products;
  const state = x.state;
  const subtotal = x.subtotal;
  const total = x.total;

  const admin = {
    from: 'Outsider Signal <orders@outsidersignal.com>',
    to: 'mackenzieprice@protonmail.com',
    subject: `${name} Placed an Order`,
    template: 'invoice',
    'h:X-Mailgun-Variables': JSON.stringify({addressLine1, addressLine2, city, country, name, orderDate, orderNumber, postalCode, products, state, subtotal, total})
  };

  const customer = {
    from: 'Outsider Signal <orders@outsidersignal.com>',
    to: x.recipient,
    subject: 'Your Order is Placed',
    template: 'invoice',
    'h:X-Mailgun-Variables': JSON.stringify({addressLine1, addressLine2, city, country, name, orderDate, orderNumber, postalCode, products, state, subtotal, total})
  };

  mailgun.messages().send(admin, (error, body) => {});
  mailgun.messages().send(customer, (error, body) => {});
};

module.exports = {
  code,
  invoice
}
