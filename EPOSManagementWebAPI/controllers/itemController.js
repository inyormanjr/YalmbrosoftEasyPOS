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
  for (const variant of item.variants) {
    if(variant.quantity && variant.quantity > 0)
     await createInventoryTrans(
       'StockIn',
       item.name,
       variant,
       0,
       variant.quantity,
       variant.quantity,
       req,
       'Initial'
     );
  }
  res.status(201).json({
    success: true,
    data: item,
  });
});

exports.update = asyncHandler(async (req, res, next) => {

  req.body.variants.forEach((variant) => {
    if(variant._id == null)
        delete variant._id;
  });

  for (const variant of req.body.variants) {
      console.log(variant._id);
    if (variant._id === undefined && (variant.quantity && variant.quantity > 0))
      await createInventoryTrans(
        'StockIn',
        req.body.name,
        variant,
        0,
        variant.quantity,
        variant.quantity,
        req,
        'Initial'
      );
  }
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
  await createInventoryTrans(
    inventoryTransactionType,
    inventory.item.name,
    inventory.variant,
    previousQuantity,
    inventory.variant.quantity,
    quantity,
    req,
    remarks
  );

   res.status(200).json({ success: true, data: {} });

});

createInventoryTrans = async function (inventoryTransactionType, itemName, variant, previousQuantity,quantity,newQuantity,  req, remarks) {
  const newInventoryTrans = new InventoryTransaction({
    type: inventoryTransactionType,
    itemName,
    variant,
    previousQuantity,
    quantity,
    newQuantity,
    company: req.user.companyId,
    creator: req.user.username,
    remarks: remarks ?? 'n/a',
  });

  await InventoryTransaction.create(newInventoryTrans);
};

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
