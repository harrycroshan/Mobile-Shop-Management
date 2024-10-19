const express = require('express');
const router = express.Router();
const Supplier = require('../models/order');
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


router.post('/order', async (req, res) => {
    const { supplierId, itemCategory, quantity, deliveryDays } = req.body;
    try {
       

        const newOrder = new Order({ supplierId, itemCategory, quantity, deliveryDays });
        await newOrder.save();

        // Sending order summary via email
        const mailOptions = {
            from: 'croshanharry@gmail.com',
            to: supplier.email,
            subject: 'New Order from Cellular World Pvt Ltd',
            text: `Dear ${supplier.name},\n\nYou have a new order:\nItem Category: ${itemCategory}\nQuantity: ${quantity}\nDelivery Days: ${deliveryDays}\n\nBest regards,\nCellular World Pvt Ltd.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('supplierId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/order/:id', async (req, res) => {
    const { itemCategory, quantity, deliveryDays } = req.body;
    const id = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { itemCategory, quantity, deliveryDays },
            { new: true }
        ).populate('supplierId');
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send email notification to the supplier
        const mailOptions = {
            from: 'croshanharry@gmail.com',
            to: updatedOrder.supplierId.email,
            subject: 'Order Updated by Cellular World Pvt Ltd',
            text: `Dear ${updatedOrder.supplierId.name},\n\nYour order has been updated:\n\nItem Category: ${itemCategory}\nQuantity: ${quantity}\nDelivery Days: ${deliveryDays}\n\nBest regards,\nCellular World Pvt Ltd.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/order/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id).populate('supplierId');
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send email notification to the supplier
        const mailOptions = {
            from: 'croshanharry@gmail.com',
            to: deletedOrder.supplierId.email,
            subject: 'Order Canceled by Cellular World Pvt Ltd',
            text: `Dear ${deletedOrder.supplierId.name},\n\nYour order for item category "${deletedOrder.itemCategory}" with quantity ${deletedOrder.quantity} has been canceled.\n\nBest regards,\nCellular World Pvt Ltd.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;