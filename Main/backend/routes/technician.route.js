const express = require('express');
const Technician = require('../models/technician.model');
const upload = require('../middleware/multerConfig');  // Your multer config file
const router = express.Router();

// Create a new technician with image upload
router.post('/technicians', upload.single('image'), async (req, res) => {
    try {
        const technicianData = {
            technicianNo: req.body.technicianNo,
            technicianName: req.body.technicianName,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null,  // Save image path in DB
            registeredYear: req.body.registeredYear,
            rank: req.body.rank,
            repairCount: req.body.repairCount,
            status: req.body.status || 'available'  // Default to 'available' if not provided
        };

        const technician = new Technician(technicianData);
        await technician.save();
        res.status(201).send(technician);
    } catch (error) {
        res.status(400).send({ error: 'Error saving technician details' });
    }
});

// GET a technician by ID
router.get('/technicians/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const technician = await Technician.findById(id);
        if (!technician) {
            return res.status(404).send({ error: 'Technician not found' });
        }
        res.send(technician);
    } catch (error) {
        console.error('Error fetching technician:', error);
        res.status(500).send({ error: 'Server error' });
    }
});

// Get all technicians
router.get('/alltechnicians', async (req, res) => {
    try {
        const technicians = await Technician.find();  // Fetch all technicians from the DB
        res.status(200).send(technicians);  // Send all technicians back as a response
    } catch (error) {
        res.status(500).send({ error: 'Error fetching technicians' });
    }
});

// Update technician status
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;  // Extract new status from the request body
    const technicianId = req.params.id;  // Get technician ID from URL parameters

    try {
        const updatedTechnician = await Technician.findByIdAndUpdate(
            technicianId,
            { status },
            { new: true }  // Return the updated document
        );

        if (!updatedTechnician) {
            return res.status(404).send({ error: 'technician not found' });
        }

        res.status(200).send(updatedTechnician);
    } catch (error) {
        console.error('Error updating technician status:', error);
        res.status(400).send({ error: 'Error updating technician status' });
    }
});

// Request a technician
router.put('/:id/request', async (req, res) => {
    const technicianId = req.params.id;  // Get technician ID from URL parameters

    try {
        const updatedTechnician = await Technician.findByIdAndUpdate(
            technicianId,
            { status: 'requested' },
            { new: true }
        );

        if (!updatedTechnician) {
            return res.status(404).send({ error: 'Technician not found' });
        }

        res.status(200).send(updatedTechnician);
    } catch (error) {
        console.error('Error requesting technician:', error);
        res.status(400).send({ error: 'Error requesting technician' });
    }
});

// Get all technicians with status 'requested'
router.get('/requested', async (req, res) => {
    try {
        const requestedTechnicians = await Technician.find({ status: 'requested' });  // Fetch technicians with status 'requested'
        res.status(200).send(requestedTechnicians);  // Send the requested technicians back as a response
    } catch (error) {
        console.error('Error fetching requested technicians:', error);
        res.status(500).send({ error: 'Error fetching requested technicians' });
    }
});


// Accept a technician request
router.put('/:id/accept', async (req, res) => {
    const technicianId = req.params.id;

    try {
        const technician = await Technician.findById(technicianId);
        if (technician.status !== 'requested') {
            return res.status(400).send({ error: 'Technician request not in requested state' });
        }

        const updatedTechnician = await Technician.findByIdAndUpdate(
            technicianId,
            { status: 'not available' },
            { new: true }
        );

        res.status(200).send(updatedTechnician);
    } catch (error) {
        console.error('Error accepting technician request:', error);
        res.status(400).send({ error: 'Error accepting technician request' });
    }
});

// Reject a technician request
router.put('/:id/reject', async (req, res) => {
    const technicianId = req.params.id;

    try {
        const technician = await Technician.findById(technicianId);
        if (technician.status !== 'requested') {
            return res.status(400).send({ error: 'Technician request not in requested state' });
        }

        const updatedTechnician = await Technician.findByIdAndUpdate(
            technicianId,
            { status: 'available' },
            { new: true }
        );

        res.status(200).send(updatedTechnician);
    } catch (error) {
        console.error('Error rejecting technician request:', error);
        res.status(400).send({ error: 'Error rejecting technician request' });
    }
});


// Update technician details
router.put('/update/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { technicianNo, technicianName, registeredYear, rank, repairCount, status } = req.body;

    const updateData = {
        technicianNo,
        technicianName,
        registeredYear,
        rank,
        repairCount,
        status,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined, // Update image URL if a new file is uploaded
    };

    try {
        const updatedTechnician = await Technician.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTechnician) {
            return res.status(404).send({ error: 'Technician not found' });
        }
        res.send(updatedTechnician);
    } catch (error) {
        console.error('Error updating technician:', error);
        res.status(400).send({ error: 'Error updating technician' });
    }
});

// Delete a technician by ID
router.delete('/technicians/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTechnician = await Technician.findByIdAndDelete(id);
        if (!deletedTechnician) {
            return res.status(404).send({ error: 'Technician not found' });
        }
        res.status(200).send({ message: 'Technician deleted successfully' });
    } catch (error) {
        console.error('Error deleting technician:', error);
        res.status(500).send({ error: 'Server error while deleting technician' });
    }
});

module.exports = router;
