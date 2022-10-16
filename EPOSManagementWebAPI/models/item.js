const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.ObjectId, ref: 'Company', required: true },
  category: { type: String },
  supplier: { type: String },
  name: {
    type: String,
    require: [true, 'Item name is required'],
  },
  barcode: { type: String },
  itemCode: { type: String },
  itemType: { type: String},
  description: { type: String },
  variants:  [
      {
        unitType: { type: String },
        unitValue: { type: String },
        unitCost: { type: Number },
        unitPrice: { type: Number },
        quantity: {type: Number}
      },
    ],
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

ItemSchema.pre(/^find/, function (next) {
  console.log(this);
  next();
});

module.exports = mongoose.model('Item', ItemSchema);