const mongoose = require('mongoose');
const PosConfig = require('./pos.config');

const CashInOutSchema = new mongoose.Schema(
    {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    creator:  {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: { type: Number },
        categoryName: { type: String },
        remarks: {type: String},
    type: { type: String, enum: ['In', 'Out'], default: 'Out' },
    isFromDrawer: {type: Boolean, default: true}
    },
  { timestamps: true }
);

CashInOutSchema.post('save', async function (done) {
    const posConfig = await PosConfig.findOne({ companyId: this.company });
    if (this.type == 'In') {
    posConfig.cashOnDrawer += this.amount;
    }
    else {
         posConfig.cashOnDrawer -= this.amount;
    }
    posConfig.save();
});

module.exports = mongoose.model('CashInOut', CashInOutSchema);