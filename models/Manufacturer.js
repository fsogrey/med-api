// models/Manufacturer.js
const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  sellsInUAE: { type: Boolean, default: false },
  certifications: [String],
  contactInfo: {
    website: String,
    representative: String,
    email: String
  }
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
