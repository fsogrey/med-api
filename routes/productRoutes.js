// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const Manufacturer = require('../models/Manufacturer');

const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const { type, material, manufacturer } = req.query;
    const filters = {};

    if (type) filters.type = type;
    if (material) filters['specs.material'] = material;
    if (manufacturer) filters.manufacturer = manufacturer;

    const products = await Product.find(filters).populate('manufacturer');
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /products
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Error creating product:', err.message);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

module.exports = { router };
