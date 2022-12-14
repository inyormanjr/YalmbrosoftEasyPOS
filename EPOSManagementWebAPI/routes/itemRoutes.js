const express = require('express');
const router = express.Router();

const controller = require('../controllers/itemController');

const { protect } = require('../middlewares/auth');

const advanceResult = require('../middlewares/advancedResult');

const Item = require('../models/item');
const InventoryTransaction = require('../models/inventory.transaction');

router
  .route('/')
  .get(protect, advanceResult(Item), controller.getMany)

  .post(protect, controller.create);
router
  .route('/inventory/stockmovement')
  .get(
    protect,
    advanceResult(InventoryTransaction),
    controller.getStockMovement
  );
router.route('/inventory').get(protect, controller.getManyInventory);
router.route('/inventory/products').get(protect, controller.getProducts);
router.route('/inventory/:id').put(protect, controller.updateSingleQuantity);

router
  .route('/:id')
  .get(protect, controller.getById)
  .put(protect, controller.update)
  .delete(protect, controller.delete);

module.exports = router;
