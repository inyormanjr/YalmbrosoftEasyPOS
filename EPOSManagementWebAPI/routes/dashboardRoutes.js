const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');
const { protect } = require('../middlewares/auth');

router.route('/info')
    .get(protect, controller.getDashboardData);

router.route('/itemCount')
    .get(controller.getItemCount);

router.route('/userCount')
    .get(controller.getUserCount);

router.route('/currentSales')
    .get(controller.getCurrentSales);

router.route('/posTransactions').get(controller.getPosTransactions);
    
router.route('/inventoryTransactions').get(controller.getInventoryTransactions);

module.exports = router;