const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true 
 }, // Track total quantity
    sold: { type: Number, default: 0 }, // Track sold items
    isNew: { type: Boolean, default: false },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;