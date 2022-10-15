const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String },
    contact: { type: String },
    email: { type: String },
    address: { type: String },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
); 

module.exports = mongoose.model('Supplier', SupplierSchema);