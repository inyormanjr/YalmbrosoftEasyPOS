const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const PosTransaction = require('../models/inventory.transaction');

exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getById = asyncHandler(async (req, res, next) => { 
    const posTrans = await PosTransaction.findById(req.params.id);
    if (!posTrans) {
      return next(new ErrorResponse(`Item not found!`, 404));
    }
    res.status(200).json({
      success: true,
      data: posTrans,
    });
});

exports.create = asyncHandler(async (req, res, next) => { 
    req.body.company = new ObjectId(req.user.companyId);
    req.body.creator = new ObjectId(req.user._id);
    
    const posTrans = await PosTransaction.create(req.body);
     res.status(201).json({
       success: true,
       data: posTrans,
     });
});

exports.update = asyncHandler(async (req, res, next) => { 
    const posTrans = await PosTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
});
