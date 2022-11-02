const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Item = require('../models/item');
const User = require('../models/user');
const PosTransaction = require('../models/pos.transaction');
const inventoryTransaction = require('../models/inventory.transaction');
const PosConfig = require('../models/pos.config');
const moment = require('moment');
exports.getDashboardData = asyncHandler(async (req, res, next) => {
     const today = moment().startOf('day');
  const companyId = req.user.companyId;
    const itemCountResult = await Item.find({
      company: companyId,
    });

    const posConfig = await PosConfig.findOne({ companyId: companyId });

    const itemCount = itemCountResult.reduce((accumulator, object) => {
        return accumulator + object.variants.length;
    }, 0);

    const userCountResult = await User.countDocuments({
      companyId: companyId,
    });
    const posTransactions = await PosTransaction.find({ companyId: companyId }).sort('-createdAt').limit(10);
    const inventoryTransactions = await inventoryTransaction.find({ company: companyId }).sort('-dateCreated')
         .limit(10);
    
    const result = await PosTransaction.find({
      companyId: companyId,
      createdAt: { $gte: today.toDate()},
    });

    const sum = result.reduce((accumulator, object) => {
      return accumulator + object.totalBalance;
    }, 0);
    
     res.json({
       success: true,
       data: {
         itemCount: itemCount,
         userCount: userCountResult,
         posTransactions: posTransactions,
         currentSales: sum,
         cashOnDrawer: posConfig.cashOnDrawer,
         inventoryTransactions: inventoryTransactions,
       },
     });
});

exports.getItemCount = asyncHandler(async (req, res, next) => {
    const companyId = req.user.companyId;
    const result = await Item.find({ company: companyId }).count();
    res.json({
        success: true,
        data: result
    })
});

exports.getUserCount = asyncHandler(async (req, res, next) => {
      const companyId = req.user.companyId;
      const result = await User.find({ companyId: companyId }).count();
      res.json({
        success: true,
        data: result,
      });
});

exports.getCurrentSales = asyncHandler(async (req, res, next) => { 
    const companyId = req.user.companyId;
    const result = await PosTransaction.find({ companyId: companyId });
      res.json({
        success: true,
        data: result,
      });
});

exports.getPosTransactions = asyncHandler(async (req, res, next) => {
     const companyId = req.user.companyId;
     const result = await PosTransaction.find({ companyId: companyId }).limit(10);
     res.json({
       success: true,
       data: result,
     });
 });

exports.getInventoryTransactions = asyncHandler(async (req, res, next) => {
     const companyId = req.user.companyId;
     const result = await inventoryTransaction
       .find({ company: companyId })
       .limit(10);
     res.json({
       success: true,
       data: result,
     });
});