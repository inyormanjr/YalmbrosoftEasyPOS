const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const PosTransaction = require('../models/pos.transaction');
const PosConfig = require('../models/pos.config');
const CashOutCategory = require('../models/cashInOutCategory');
const CashInOut = require('../models/cashout');
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

exports.createCashOutCategory = asyncHandler(async (req, res, next) => {
  try {
    req.body.company = new ObjectId(req.user.companyId);
    delete req.body._id;
    const cashOutCategory = await CashOutCategory.create(req.body);
    res.status(201).json({
      success: true,
      data: cashOutCategory,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.updateCashOutCategory = asyncHandler(async (req, res, next) => {
  const cashOutCategory = await CashOutCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: cashOutCategory,
  });
});

exports.getCashOutCategories = asyncHandler(async (req, res, next) => {
   const companyId = req.user.companyId;
  const cashOutCategories = await CashOutCategory.find({company: companyId});
  res.status(200).json({
    success: true,
    data: cashOutCategories,
  });
});

exports.createCashInOut = asyncHandler(async (req, res, next) => {
   req.body.creator = new ObjectId(req.user._id);
   req.body.company = new ObjectId(req.user.companyId);
  const newCashInOut = await CashInOut.create(req.body);
  
   res.status(200).json({
     success: true,
     data: newCashInOut,
   });
})

exports.getCashInOut = asyncHandler(async (req, res, next) => {
  const companyId = req.user.companyId;
  const cashInOutList = await CashInOut.find({ company: companyId }).sort({createdAt: -1});
  res.status(200).json({
    success: true,
    data: cashInOutList,
  });
});
