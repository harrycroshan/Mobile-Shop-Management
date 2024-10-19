const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    technician_id: { type: String, required: true }, // Changed to technician_id
    status: { type: String, default: 'pending' },  // e.g., pending, completed, etc.
    date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', orderSchema);