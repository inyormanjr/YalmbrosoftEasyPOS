const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Category = require('../models/category');
var ObjectId = require('mongoose').Types.ObjectId;


exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse(`Supplier not found!`, 404));
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.create = asyncHandler(async (req, res, next) => {
  req.body.company = new ObjectId(req.user.companyId);
  req.body.creator = new ObjectId(req.user._id);
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: category,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: category });
});

exports.delete = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Supplier not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
