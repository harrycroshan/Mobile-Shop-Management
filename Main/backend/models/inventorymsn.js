const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    product_name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date_added:{
        type: Date,
        required: true,
    },
    supplier_id:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);