const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');


// Appointment Scheduling
// add details
router.post('/', async (req, res, next) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
});

// get all appointments
router.get('/', async (req, res, next) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
});

// get specific appointments
router.get('/:id', async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.json(appointment);
    } catch (error) {
        next(error);
    }
});

// update specific appointments
router.put('/:id', async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).send('Appointment not found');
        res.json(appointment);
    } catch (error) {
        next(error);
    }
});

// delete specific appointments
router.delete('/:id', async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;