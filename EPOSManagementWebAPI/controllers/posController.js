const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const PosTransaction = require('../models/pos.transaction');
const PosConfig = require('../models/pos.config');
const moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getMany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTransactionsByDate = asyncHandler(async (req, res, next) => {
    const today = moment().startOf('day');
    console.log(today);
    const transactions = await PosTransaction.find({
      companyId: req.user.companyId,
      createdAt: { $gte: today.toDate() },
    });
    res.status(200).json({
        success: true,
        data: transactions
    });
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
   
    try {
        req.body.companyId = new ObjectId(req.user.companyId);
        req.body.creator = req.user.username;
        delete req.body._id;
     const posTrans = await PosTransaction.create(req.body);
     res.status(201).json({
       success: true,
       data: posTrans,
     });
   } catch (error) {
       console.log(error);
   }
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
     res.status(200).json({
       success: true,
       data: posTrans,
     });
});

exports.getPosConfigByCompany = asyncHandler(async (req, res, next) => { 
    const companyId = req.user.companyId;
    const config = await PosConfig.findOne({ companyId: ObjectId(companyId) });
    
    res.status(200).json({
        success: true,
        data: config
    });
});

exports.updatePosConfig = asyncHandler(async (req, res, next) => {
  const posConfig = await PosConfig.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: posConfig,
  });
});
