const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('Patient', patientSchema);