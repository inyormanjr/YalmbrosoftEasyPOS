const mongoose = require('mongoose');
const crypto = require('crypto');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    unique: false,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  middleName: {
    type: String,
    unique: false,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'first name is required'],
    unique: false,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  mailingAddress: String,
  mobileNumber: String,
  landLineNumber: String,
  address: String,
  slug: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  username: {
    type: String,
    required: [true, 'Please add an email'],
    unique: [true, 'Email already registered.']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  confirmationToken: String,
  confirmationTokenExpiry: Date,
  contact: String,
  userType: {
    type: String,
    enum: [
      'Admin',
      'Owner',
      'Cashier',
      ],
        default: 'Owner'
    },
    photoUrl: {
        type: String,
        default: 'no-photo.jpg'
    },
  loggedIn: Date,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
 
UserSchema.pre('save', async function (next) {

 if(!this.isModified('password'))
  {
   next();
  }
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignJwtToken = function () {
  return jwt.sign({ id: this._id, company: this.companyId }, process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE });
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  result = await bcrypt.compare(enteredPassword, this.password);
  return result;
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

UserSchema.methods.getConfirmationToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.confirmationToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.confirmationTokenExpiry = Date.now() + 10 * 60 * 1000;
  return resetToken;
};



module.exports = mongoose.model('User', UserSchema);