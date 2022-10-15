const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Item = require('../models/item');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  const item = await Item.create(req.body);
  res.status(201).json({
    success: true,
    data: item,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: item });
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
