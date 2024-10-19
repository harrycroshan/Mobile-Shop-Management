const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'croshanharry@gmail.com',
        pass: 'qqhlsaczsvolrjxp'
    }
});


router.post('/supplier', async (req, res) => {
    const { name, email, contactno, item, contractdate, address } = req.body;
    try {
        const newSupplier = new Supplier({ name, email, contactno, item, contractdate, address });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/supplier', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a supplier item
router.put("/supplier/:id", async (req, res) => {
    try {
        const {name, email, contactno, item, contractdate, address} = req.body;
        const id = req.params.id
        const updatedSupplier = await Supplier.findByIdAndUpdate(
        id,
        {name, email, contactno, item, contractdate, address},
        { new: true }
    )

    if(!updatedSupplier) {
        return res.status(404).json({message: "Supplier not found"})
    }
    res.json(updatedSupplier)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
    
})

//Delete a supplier
router.delete('/supplier/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;