const mongoose = require('mongoose');

const customerPurchaseSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  product_name: { type: String, required: true },
  brand: { type: String },
  model: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  purchase_date: { type: Date, default: Date.now },
});

const CustomerPurchase = mongoose.model('CustomerPurchase', customerPurchaseSchema);
module.exports = CustomerPurchase;
