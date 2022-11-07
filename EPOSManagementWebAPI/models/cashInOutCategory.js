const mongoose = require('mongoose');

const CashInOutCategorySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    name: { type: String },
    isEnabled: { type: Boolean },
    type: {type: String, enum: ['In','Out'], default: 'Out'}
  },
  { timestamps: true }
);

module.exports = mongoose.model('CashInOutCategory', CashInOutCategorySchema);