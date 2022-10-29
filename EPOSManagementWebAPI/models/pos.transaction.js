const mongoose = require('mongoose');

const PosTransDetail = new mongoose.Schema({
    inventory: { type: any },
    orderQty: { type: Number },
    unitDiscount: { type: Number },
    unitPrice: { type: Number },
    totalPrice: {type: String}

});

const PosTransaction = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  subTotal: { type: Number },
  discount: { type: Number },
  voucher: { type: any },
  salesTax: { type: Number },
  total: { type: Number },
  totalBalance: { type: Number },
  posTransDetails: [PosTransDetail],
  status: {
        type: String,
        enum: ['pending', 'complete', 'cancelled'],
        default: 'complete'
  },
  dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PosTransaction', PosTransaction);