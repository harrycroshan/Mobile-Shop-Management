const express = require('express');
const router = express.Router();
const SupplierOrder = require('../models/supplierOrder');

// POST: Create a new supplier order
router.post('/add', async (req, res) => {
    const { product_name, category, brand, model, quantity, supplier_id } = req.body;

    // Validate input
    if (!product_name || !category || !brand || !model || !quantity || !supplier_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Convert quantity to a number if it’s not already
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
        return res.status(400).json({ message: 'Quantity must be a number.' });
    }

    try {
        const newSupplierOrder = new SupplierOrder({
            product_name,
            category,
            brand,
            model,
            quantity: parsedQuantity, // Ensure quantity is a number
            supplier_id
        });

        const savedOrder = await newSupplierOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch all supplier orders
router.get('/', async (req, res) => {
    try {
        const orders = await SupplierOrder.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch a specific supplier order by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await SupplierOrder.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Supplier order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update a supplier order by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product_name, category, brand, model, quantity, supplier_id } = req.body;

    // Validate input
    if (!product_name || !category || !brand || !model || !quantity || !supplier_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
        return res.status(400).json({ message: 'Quantity must be a number.' });
    }

    try {
        const updatedOrder = await SupplierOrder.findByIdAndUpdate(
            id,
            { product_name, category, brand, model, quantity: parsedQuantity, supplier_id },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Supplier order not found.' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete a supplier order by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await SupplierOrder.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Supplier order not found.' });
        }
        res.status(200).json({ message: 'Supplier order deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
