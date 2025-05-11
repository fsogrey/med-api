// routes/manufacturerRoutes.js
const express = require('express');
const Manufacturer = require('../models/Manufacturer');

const router = express.Router();

// GET /manufacturers
router.get('/', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /manufacturers
router.post('/', async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).json(manufacturer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid manufacturer data' });
  }
});

module.exports = { router };
