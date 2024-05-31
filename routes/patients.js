const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// patient Registration and Management
// add patient details
router.post('/', async (req, res, next) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
});

// fetch all details of patients
router.get('/', async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        next(error);
    }
});

// fetch specific patients data
router.get('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send('Patient not found');
        res.json(patient);
    } catch (error) {
        next(error);
    }
});

// update patients data
router.put('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) return res.status(404).send('Patient not found');
        res.json(patient);
    } catch (error) {
        next(error);
    }
});

// delete specific data
router.delete('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).send('Patient not found');
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});


module.exports = router;