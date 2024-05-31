const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');

// Medical Record Management
// add medical records
router.post('/', async (req, res, next) => {
    try {
        const record = new MedicalRecord(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
});

// get all data of medical records
router.get('/', async (req, res, next) => {
    try {
        const records = await MedicalRecord.find();
        res.json(records);
    } catch (error) {
        next(error);
    }
});

// select specific records from the medical records
router.get('/:id', async (req, res, next) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);
        if (!record) return res.status(404).send('Medical record not found');
        res.json(record);
    } catch (error) {
        next(error);
    }
});

// update specific data of medical records
router.put('/:id', async (req, res, next) => {
    try {
        const record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) return res.status(404).send('Medical record not found');
        res.json(record);
    } catch (error) {
        next(error);
    }
});

// delete specific record of medical records
router.delete('/:id', async (req, res, next) => {
    try {
        const record = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).send('Medical record not found');
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
