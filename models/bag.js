class Bag {
  constructor(prevBag) {
    this.items = prevBag.items || {};
    this.promoCode = prevBag.promoCode || null;
    this.shipping = 5;
    this.subtotal = prevBag.subtotal || 0;
    this.totalQty = prevBag.totalQty || 0;
  };

   add(item, id) {
     if (this.totalQty === 9) {
       return;
     }

    var savedItem = this.items[id];

    if (!savedItem) {
      savedItem = this.items[id] = {item: item, qty: 0, total: 0, subtotal: 0};
    }

    this.totalQty++;
    savedItem.qty++;

    savedItem.total += savedItem.item.price; // FIXME:
    this.subtotal += savedItem.item.price;

    this.items[id].subtotal = this.items[id].price;
  };

  build() {
    var list = [];

    for (var id in this.items) {
      list.push(this.items[id]);
    }

    return list;
  };

  drop(id) {
    this.subtotal -= this.items[id].item.price * this.items[id].qty;
    this.totalQty -= this.items[id].qty;

    delete this.items[id];
  };

  map() {
    var list = [];

    for (var prop in this.items) {
      list.push(this.items[prop]);
    }
    
    return list.map(a => ({name: a.item.name, price: a.item.price.toFixed(2), qty: a.qty, size: a.item.size, total: a.total.toFixed(2)}));
  };

  minusOne(id) {
    if (this.items[id].qty === 1) {
      this.drop(id);
      return;
    }

    this.items[id].qty--;
    this.items[id].total -= this.items[id].item.price;
    this.totalQty--;
    this.subtotal -= this.items[id].item.price;
  };

  plusOne(id) {
    if (this.items[id].qty === 9) {
      return;
    }

    this.items[id].qty++;
    this.items[id].total += this.items[id].item.price;
    this.totalQty++;
    this.subtotal += this.items[id].item.price;
  };

  promo(code) {
    const validCodes = ['os10'];
    let discount = undefined;

    for (var i = 0; i < validCodes.length; i++) {
      if (code === validCodes[i]) {
        this.promoCode = code;
        discount = this.subtotal * 0.10;
        discount = Math.round(discount);
        return discount;
      }
    }
  };
};

module.exports = Bag;
