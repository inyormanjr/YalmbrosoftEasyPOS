const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Item = require('../models/item');
const InventoryTransaction = require('../models/inventory.transaction');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  let itemsWithQuantity;
  if (req.query.category) {
    itemsWithQuantity = await Item.find({
      company: ObjectId(req.user.companyId),
      category: { $regex: `^${req.query.category}.*`, $options: 'si' },
      'variants.unitPrice': { $ne: null },
    });
  } else {
    itemsWithQuantity = await Item.find({
      company: ObjectId(req.user.companyId),
      'variants.unitPrice': { $ne: null },
    });
  }
  variants = [];
  itemsWithQuantity.forEach((item) => {
    item.variants.forEach((variant) => {
      variants.push({ item, variant });
    });
  });

  res.status(200).json({ success: true, data: variants });
});

exports.getManyInventory = asyncHandler(async (req, res, next) => {
  let itemsWithQuantity;
  var value = Object.values(req.query)[0];
  var re = new RegExp(value, 'i');
     itemsWithQuantity = await Item.find({
       company: ObjectId(req.user.companyId),
       name: re,
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
  const inventoryTransList = [];
  for (const variant of item.variants) {
    if (variant.quantity && variant.quantity > 0)
      inventoryTransList.push(createInventoryTrans(
        'StockIn',
        item.name,
        variant,
        variant.quantity,
        0,
        variant.quantity,
        req,
        'Initial'
      ));
  }
  await item.createManyInventoryTrans(inventoryTransList);
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

 
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

   let transList = [];
   for (const variant of req.body.variants) {
     if (variant._id === undefined && variant.quantity && variant.quantity > 0)
       transList.push(
         createInventoryTrans(
           'StockIn',
           req.body.name,
           variant,
           variant.quantity,
           0,
           variant.quantity,
           req,
           'Initial'
         )
       );
   }
  await item.createManyInventoryTrans(transList);
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
  
     const item = await Item.findOneAndUpdate(
         {
           'variants._id': req.params.id,
         },
         {
           $set: {
             'variants.$': inventory.variant
           },
         }
      );
  await item.createSingleInventoryTrans(
    inventoryTransactionType,
    inventory.item.name,
    inventory.variant,
    quantity,
    previousQuantity,
    inventory.variant.quantity,
    req.user.companyId,
    req.user.username,
    remarks
  );

   res.status(200).json({ success: true, data: {} });

});

createInventoryTrans =  function (
  inventoryTransactionType,
  itemName,
  variant,
  quantity,
  previousQuantity,
  newQuantity,
  req,
  remarks
) {
  const newInventoryTrans = new InventoryTransaction({
    type: inventoryTransactionType,
    itemName,
    variant,
    quantity,
    previousQuantity,
    newQuantity,
    company: req.user.companyId,
    creator: req.user.username,
    remarks: remarks ?? 'n/a',
  });
  return newInventoryTrans;
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
