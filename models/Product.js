// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['Implant', 'Brace', 'Prosthesis', 'Surgical Tool', 'Rehab Equipment']
  },
  manufacturer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Manufacturer', 
    required: true 
  },
  uaeAvailability: { type: Boolean, default: false },
  specs: {
    material: String,
    sizeOptions: [String],
    approvedUses: [String]
  }
});

module.exports = mongoose.model('Product', ProductSchema);
