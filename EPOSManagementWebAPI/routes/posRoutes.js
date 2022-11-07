const express = require('express');
const router = express.Router();

const controller = require('../controllers/posController');
const { protect } = require('../middlewares/auth');
const advanceResult = require('../middlewares/advancedResult');

const PosTransaction = require('../models/pos.transaction');

router.route('/')
    .get(protect, advanceResult(PosTransaction), controller.getMany)
    .post(protect, controller.create)

router.route('/transactions').get(protect, controller.getTransactionsByDate);

router
  .route('/config')
  .get(protect, controller.getPosConfigByCompany)
  
router.route('/config/:id').put(protect, controller.updatePosConfig);

router.route('/config/cashoutcategory')
  .get(protect, controller.getCashOutCategories)
  .post(protect, controller.createCashOutCategory);

router.route('/config/cashoutcategory/:id').put(protect, controller.updateCashOutCategory);

router.route('/config/cashinout')
  .get(protect, controller.getCashInOut)
  .post(protect, controller.createCashInOut)

module.exports = router;