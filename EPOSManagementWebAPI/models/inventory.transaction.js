const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  unitType: { type: String },
  unitValue: { type: String },
  unitCost: { type: Number },
  unitPrice: { type: Number },
  quantity: { type: Number },
});


const InventoryTransactionSchema = new mongoose.Schema({
  type: { type: [String], enum: ['StockIn', 'StockOut'] },
  variantId: { type: mongoose.ObjectId },
  quantity: { type: Number },
  newQuantity: { type: Number },
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
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InventoryTransaction', InventoryTransactionSchema);