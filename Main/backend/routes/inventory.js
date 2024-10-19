const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventorymsn');
const Order = require('../models/ordermsn');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Utility function to send email notifications
const sendEmailNotification = (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Error fetching inventory.' });
  }
});

// Get a single inventory item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the item.' });
  }
});

// GET: Fetch all inventory items
router.get('/', async (req, res) => {
  try {
      const items = await Inventory.find();
      res.status(200).json(items);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Add a new inventory item
router.post('/add', async (req, res) => {
  const { product_name, category, brand, model, price, quantity, description, date_added, supplier_id } = req.body;

  try {
    const newInventoryItem = new Inventory({
      product_name,
      category,
      brand,
      model,
      price,
      quantity,
      description,
      date_added,
      supplier_id,
    });

    const savedItem = await newInventoryItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ error: 'Error adding inventory item.' });
  }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product_name, category, brand, model, price, quantity, description, date_added, supplier_id } = req.body;

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { product_name, category, brand, model, price, quantity, description, date_added, supplier_id },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Error updating inventory item.' });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item.' });
  }
});

module.exports = router;
