
const mongoose = require('mongoose');
const PosConfigTransaction = new mongoose.Schema({
  previousCashOnDrawer: { type: Number },
  newCashOnDrawer: { type: Number },
  creator: {type: String},
  date: {type: Date, default: Date.now}
});

const PosConfigSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  cashOnDrawer: { type: Number },
  salesTaxPercentage: { type: Number },
  posConfigTransactions: [PosConfigTransaction],
});

module.exports = mongoose.model('PosConfig', PosConfigSchema);