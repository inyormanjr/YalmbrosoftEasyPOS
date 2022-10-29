const express = require('express');
const router = express.Router();

const controller = require('../controllers/posController');
const { protect } = require('../middlewares/auth');
const advanceResult = require('../middlewares/advancedResult');

const PosTransaction = require('../models/pos.transaction');

router.route('/')
    .get(protect, advanceResult(PosTransaction), controller.getMany)
    .post(protect, controller.create)
    .put(protect, controller.update);