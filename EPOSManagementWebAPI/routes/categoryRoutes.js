const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoryController');

const { protect } = require('../middlewares/auth');

const advanceResult = require('../middlewares/advancedResult');

const Category = require('../models/category');

router
  .route('/')
  .get(protect, advanceResult(Category), controller.getMany)
  .post(protect, controller.create);

router
  .route('/:id')
  .get(protect, controller.getById)
  .put(protect, controller.update)
  .delete(protect, controller.delete);

module.exports = router;
