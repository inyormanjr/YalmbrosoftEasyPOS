const mongoose = require('mongoose');
const InventoryTransaction = require('./inventory.transaction');
const VariantSchema = new mongoose.Schema({
  barcode: { type: String },
  name: {type: String},
  unitType: { type: String },
  unitValue: { type: String },
  unitCost: { type: Number },
  unitPrice: { type: Number },
  quantity: { type: Number },
});


const ItemSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.ObjectId, ref: 'Company', required: true },
  category: { type: String },
  supplier: { type: String },
  name: {
    type: String,
    require: [true, 'Item name is required'],
  },
  itemCode: { type: String },
  itemType: { type: String },
  description: { type: String },
  variants: [VariantSchema],
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
  next();
});

ItemSchema.methods.createSingleInventoryTrans = async function (
  inventoryTransactionType,
  itemName,
  variant,
  quantity,
  previousQuantity,
  newQuantity,
  company,
  creator,
  remarks
) {
  const newInventoryTrans = new InventoryTransaction({
    type: inventoryTransactionType,
    itemName,
    variant,
    quantity,
    previousQuantity,
    newQuantity,
    company: company,
    creator: creator,
    remarks: remarks ?? 'n/a',
  });
  await InventoryTransaction.create(newInventoryTrans);
  return;
};

ItemSchema.methods.createManyInventoryTrans = async function (transList) {
  await InventoryTransaction.insertMany(transList);
  return;
}

ItemSchema.methods.updateVariantQtyById = async function (id, variant){
  return await this.findOneAndUpdate(
    {
      'variants._id': id,
    },
    {
      $set: {
        'variants.$': variant,
      },
    }
  );
}

ItemSchema.methods.newInventoryTransModel =  function (
  inventoryTransactionType,
  itemName,
  variant,
  quantity,
  previousQuantity,
  newQuantity,
  company,
  creator,
  remarks
) {
  return new InventoryTransaction({
    type: inventoryTransactionType,
    itemName,
    variant,
    quantity,
    previousQuantity,
    newQuantity,
    company: company,
    creator: creator,
    remarks: remarks ?? 'n/a',
  });;
};


module.exports = mongoose.model('Item', ItemSchema);