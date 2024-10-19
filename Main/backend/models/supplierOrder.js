const mongoose = require('mongoose');

const supplierOrderSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier_id: { type: String, required: true },
    date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SupplierOrder', supplierOrderSchema);
