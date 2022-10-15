const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  confirmation
} = require('../controllers/authController');


const router = express.Router();

const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/getMe', protect, getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/confirmation/:confirmationToken', confirmation);

module.exports = router;