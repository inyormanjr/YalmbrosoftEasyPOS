const mongoose = require('mongoose');
const Item = require('../models/item');
const moment = require('moment');
 const today = moment().startOf('day');
const PosTransDetail = new mongoose.Schema({
  inventory: { type: mongoose.Schema.Types.Mixed },
  orderQty: { type: Number },
  unitDiscount: { type: Number },
  unitPrice: { type: Number },
  totalPrice: { type: String },
});

const PosTransaction = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    creator: {
      type: String,
    },
    subTotal: { type: Number },
    discount: { type: Number },
    voucher: { type: mongoose.Schema.Types.Mixed },
    salesTax: { type: Number },
    total: { type: Number },
        totalBalance: { type: Number },
    payment: {type: Number},
    posTransDetails: [PosTransDetail],
    status: {
      type: String,
      enum: ['pending', 'complete', 'cancelled'],
      default: 'complete',
    },
  },
  { timestamps: true }
);

PosTransaction.pre('save', async function (done) {
    for (const posTransDetails of this.posTransDetails) {
        console.log(posTransDetails.inventory.variant.quantity);
       if (posTransDetails.inventory.variant.quantity != undefined) {
         const previousQuantity = posTransDetails.inventory.variant.quantity;
         posTransDetails.inventory.variant.quantity =
           posTransDetails.inventory.variant.quantity -
           posTransDetails.orderQty;
           inventoryTransactionType = 'StockOut';
           console.log(posTransDetails.inventory.variant);
         const item = await Item.findOneAndUpdate(
           {
             'variants._id': posTransDetails.inventory.variant._id,
           },
           {
             $set: {
               'variants.$': posTransDetails.inventory.variant,
             },
           }
         );
           await item.createSingleInventoryTrans(
               inventoryTransactionType,
               posTransDetails.inventory.item.name,
               posTransDetails.inventory.variant,
               posTransDetails.orderQty,
               previousQuantity,
               posTransDetails.inventory.variant.quantity,
               this.companyId,
               this.creator,
           'Pos Transaction'
         );
       }
    }
        done();
})




module.exports = mongoose.model('PosTransaction', PosTransaction);