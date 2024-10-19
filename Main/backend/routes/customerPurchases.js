const express = require('express');
const router = express.Router();
const CustomerPurchase = require('../models/CustomerPurchase');

// GET all customer purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await CustomerPurchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer purchases', error });
  }
});

// POST a new customer purchase
router.post('/', async (req, res) => {
  const { customer_name, customer_email, product_name, brand, model, quantity, price } = req.body;
  
  const newPurchase = new CustomerPurchase({
    customer_name,
    customer_email,
    product_name,
    brand,
    model,
    quantity,
    price,
  });

  try {
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Error saving purchase', error });
  }
});

// DELETE a customer purchase by ID
router.delete('/:id', async (req, res) => {
  try {
    await CustomerPurchase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting purchase', error });
  }
});

module.exports = router;
