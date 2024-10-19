
const mongoose = require('mongoose');


const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactno: { type: Number, required: true },
    item: { type: String, required: true },
    contractdate: { type: Date, required: true },
    address: { type: String, required: true },
});

module.exports = mongoose.model('Supplier', supplierSchema);