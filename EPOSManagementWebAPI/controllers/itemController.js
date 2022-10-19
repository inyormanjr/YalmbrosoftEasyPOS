const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Item = require('../models/item');
const InventoryTransaction = require('../models/inventory.transaction');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getManyInventory = asyncHandler(async (req, res, next) => {
  const itemsWithQuantity = await Item.find({
    company: ObjectId(req.user.companyId),
    'variants.quantity': { $ne: null },
  });
  variants = [];
  itemsWithQuantity.forEach((item) => {
    item.variants.forEach((variant) => {
      variants.push({item ,  variant });
    });
  });

  res.status(200).json({ success: true, data: variants });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new ErrorResponse(`Item not found!`, 404));
  }
  res.status(200).json({
    success: true,
    data: item,
  });
});

exports.create = asyncHandler(async (req, res, next) => {
  
  req.body.company = new ObjectId(req.user.companyId);
  req.body.creator = new ObjectId(req.user._id);

  req.body.variants.forEach(variant => {
    delete variant._id;
  });
  const item = await Item.create(req.body);
  res.status(201).json({
    success: true,
    data: item,
  });
});

exports.update = asyncHandler(async (req, res, next) => {

  req.body.variants.forEach((variant) => {
    console.log(variant);
    if(variant._id == null)
        delete variant._id;
  });
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: item });
});

exports.updateSingleQuantity = asyncHandler(async (req, res, next) => { 

  const { quantity, stockMovementType, inventory, remarks } = req.body;

  inventoryTransactionType = 'StockIn';
  previousQuantity = inventory.variant.quantity;
  
  if (stockMovementType == 0) 
    inventory.variant.quantity = inventory.variant.quantity + quantity;
  else {
    inventory.variant.quantity = inventory.variant.quantity - quantity;
    inventoryTransactionType = 'StockOut';
  }
  
      await Item.findOneAndUpdate(
         {
           'variants._id': req.params.id,
         },
         {
           $set: {
             'variants.$': inventory.variant
           },
         }
      );
  const newInventoryTrans = new InventoryTransaction({
    type: inventoryTransactionType,
    itemName: inventory.item.name,
    variant: inventory.variant,
    previousQuantity,
    quantity,
    newQuantity: inventory.variant.quantity,
    company: req.user.companyId,
    creator: req.user._id,
    remarks: remarks ?? 'n/a',
  });
   await InventoryTransaction.create(newInventoryTrans);

   res.status(200).json({ success: true, data: {} });

});

exports.getStockMovement = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.delete = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return next(
      new ErrorResponse(`Item not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
