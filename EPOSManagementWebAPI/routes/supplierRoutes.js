const express = require('express');
const router = express.Router();

const {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');

const { protect } = require('../middlewares/auth');

const advanceResult = require('../middlewares/advancedResult');

const Supplier = require('../models/supplier');

router.route('/').get(advanceResult(Supplier), getSuppliers).post(protect, createSupplier);

router
  .route('/:id')
  .get(protect, getSupplier)
  .put(protect, updateSupplier)
    .delete(protect, deleteSupplier);
  
module.exports = router;