
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    type: { type: [String], enum: ['Sale', 'StockIn', 'StockOut', 'Create', 'Update'] },
    description: {type: String},
  dateCreated: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});


module.exports = mongoose.model('Transaction', TransactionSchema);