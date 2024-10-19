const express = require('express');
const router = express.Router();
const Order = require('../models/ordermsn');
const Inventory = require('../models/inventorymsn');
const SupplierOrder = require('../models/supplierOrder');

// POST: Check Technician Order and handle inventory
router.post('/check', async (req, res) => {
    const { product_name, model, quantity, technician_id } = req.body;

    try {
        // Check if the requested item is available in the inventory
        const inventoryItem = await Inventory.findOne({ product_name, model });

        if (!inventoryItem) {
            // Item not found in inventory, create an order for the supplier
            const supplierOrder = new SupplierOrder({
                product_name,
                category: 'General', // You can customize this as needed
                brand: 'Generic',    // You can customize this as needed
                model,
                quantity,
                supplier_id: 'default_supplier' // Adjust supplier_id as needed
            });
            await supplierOrder.save();

            return res.status(201).json({ message: 'Item not found in inventory. Supplier order created.' });
        } else if (inventoryItem.quantity < quantity) {
            // Insufficient inventory, create a supplier order
            const supplierOrder = new SupplierOrder({
                product_name,
                category: inventoryItem.category,
                brand: inventoryItem.brand,
                model,
                quantity: quantity - inventoryItem.quantity,
                supplier_id: 'default_supplier'
            });
            await supplierOrder.save();

            return res.status(201).json({ message: 'Insufficient inventory. Supplier order created.' });
        }

        // If inventory is sufficient, decrease the inventory quantity
        inventoryItem.quantity -= quantity;
        await inventoryItem.save();

        // Create the technician order
        const newOrder = new Order({
            product_name,
            category: inventoryItem.category,
            brand: inventoryItem.brand,
            model,
            quantity,
            technician_id
        });

        await newOrder.save();

        return res.status(201).json({ message: 'Order created successfully for technician.', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch all orders for a specific technician
router.get('/technician/:technician_id', async (req, res) => {
    const { technician_id } = req.params;

    try {
        const orders = await Order.find({ technician_id });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this technician.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
