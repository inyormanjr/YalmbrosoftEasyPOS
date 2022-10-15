const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Supplier = require('../models/supplier');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getSuppliers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    return next(new ErrorResponse(`Supplier not found!`, 404));
  }
  res.status(200).json({
    success: true,
    data: supplier,
  });
});

exports.createSupplier = asyncHandler(async (req, res, next) => {
  
  req.body.company = new ObjectId(req.user.companyId);
  req.body.creator = new ObjectId(req.user._id);
  const supplier = await Supplier.create(req.body);
  res.status(201).json({
    success: true,
    data: supplier,
  });
});

exports.updateSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!supplier) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: supplier });
});

exports.deleteSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findByIdAndDelete(req.params.id);
  if (!supplier) {
    return next(
      new ErrorResponse(`Supplier not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});