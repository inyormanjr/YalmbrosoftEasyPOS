
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const asyncHandler = require('../middlewares/async');
const sendEmail = require('../utils/sendEmail');
const Company = require('../models/company');
const User = require('../models/user');
const PosConfig = require('../models/pos.config');
var ObjectId = require('mongoose').Types.ObjectId;

//@desc     Register User
//@route    GET /api/v1/auth/register
//@access   public
exports.register = asyncHandler(async (req, res, next) => {

  const companyName = req.body.companyName;
    const  result = await  Company.findOrCreate(
       {
         companyName: req.body.companyName.toUpperCase(),
       },
      async (err, result) => {
         
         req.body.companyId = new ObjectId(result._id);
         const user = await User.create(req.body);
         const confirmationToken = user.getConfirmationToken();
         await user.save({ validateBeforeSave: false });
         await PosConfig.create({
           companyId: req.body.companyId,
           cashOnDrawer: 0,
           salesTaxPercentage: 12,
         });
         const confirmationURL = `${req.protocol}://${req.get(
           'host'
         )}/confirmation/${confirmationToken}`;
         const message = `  Welcome to EPOS Management System, you are receiving this email to confirm your registration. Please click the link below to proceed confirmation. \n
         ${confirmationURL} `;
         await sendEmail({
           email: `${user.username}`,
           subject: 'Email Confirmation',
           message,
         });
         sendTokenResponse(user, 200, res);
       }
    );
});

exports.checkCompanyExist = asyncHandler(async (req, res, next) => {
  const companyName = req.params.companyName.toUpperCase();
  const company = await Company.findOne({ companyName });
  var isAvailable = false;
  if (!company)
    {
    isAvailable = true;
    }
  
     res.status(200).json({
       success: true,
       data: isAvailable,
     });
})

exports.changePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const username = req.user.username;
    const user = await User.findOne({ username }).select('+password');
      if (!user) {
        return next(new ErrorResponse('Invalid credentials', 501));
      }
    
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 501));
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

     res.status(200).json({
       success: true,
       data: user,
     });


})

//@desc     Login User
//@route    GET /api/v1/auth/login
//@access   public
exports.login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorResponse('Please provide username/password', 400));
    }

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        return next(
            new ErrorResponse('Invalid credentials', 401)
         );
    }

    if (user.confirmationToken) {
         return next(new ErrorResponse('Email confirmation is pending', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
         return next(new ErrorResponse('Invalid credentials', 401));
    }

    
    const returnUser = await User.findOne({ username }).populate('companyId');
    
    const _posConfig = await PosConfig.findOne({
       companyId: returnUser.companyId._id
    });
    if (_posConfig == null) {
        await PosConfig.create({
          companyId: returnUser.companyId._id,
          cashOnDrawer: 0,
          salesTaxPercentage: 12,
        });
    } 
    sendTokenResponse(returnUser, 200, res)
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token, data: user});
}

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })
})

exports.resetPassword = asyncHandler(async (req, res, next) => {

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});
    sendTokenResponse(user, 200, res);
});

exports.confirmation = asyncHandler(async (req, res, next) => {
    console.log(req.params.confirmationToken);
     const confirmationToken = await crypto
       .createHash('sha256')
       .update(req.params.confirmationToken)
       .digest('hex');
      const user = await User.findOne({
        confirmationToken
      });
    console.log(user);
      if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
      }
     
     user.confirmationToken = undefined;
     user.confirmationTokenExpiry = undefined;
     await user.save({ validateBeforeSave: false });
     sendTokenResponse(user, 200, res);
});


exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
 
    if (!user) {
        return next(new ErrorResponse('There is no user with that username', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
    const message = `You are recieving this email because you has requested the reset of a password. Please
                        make a put request to: \n\n ${resetUrl}`;
    
    try {
        await sendEmail({
            email: 'jryap20@gmail.com',
            subject: 'Password reset token',
            message
            
        });
        res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
        console.log(error);
        user.userPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse('Email could not be sent.',500))
    }
    res.status(200).json({
        success: true,
        data: user
    })
})