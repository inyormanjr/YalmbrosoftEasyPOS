const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  confirmation,
  changePassword,
  checkCompanyExist
} = require('../controllers/authController');


const router = express.Router();

const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.put('/changePassword', protect, changePassword);
router.post('/login', login);
router.get('/getMe', protect, getMe);
router.get('/companyCheck/:companyName', checkCompanyExist);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/confirmation/:confirmationToken', confirmation);

module.exports = router;