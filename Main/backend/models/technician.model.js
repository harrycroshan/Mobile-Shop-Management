const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
    technicianNo: {
        type: String,
        required: true,
        unique: true
    },
    technicianName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    registeredYear: {
        type: Number,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    repairCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'requested'], // Added 'requested' status
        default: 'available'
    },
    requested: {
        type: Boolean,
        default: false // Flag to track if the technician is requested
    }
}, { timestamps: true });

const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;