const keys = require('../../config/keys.js');
const mongoose = require('mongoose');

const Order = require('../../models/order.js');

const insertOrder = (x) => {
  mongoose.connect(keys.mongo, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    var order = new Order({
      addressLine1: x.addressLine1,
      addressLine2: x.addressLine2 || '',
      city: x.city,
      country: x.country,
      date: x.orderDate,
      name: x.name,
      number: x.orderNumber,
      phone: x.phone,
      products: x.products,
      postalCode: x.postalCode,
      recipient: x.email,
      shipping: x.shipping,
      state: x.state,
      subtotal: x.subtotal,
      total: x.total
    });

    const db = mongoose.connection;
    const collection = db.collection('orders');

    collection.insert([order], (err, res) => {
      // Handle errors
    });
  });
};

module.exports = {
  insertOrder
}
