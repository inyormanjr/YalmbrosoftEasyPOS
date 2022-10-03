const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, unique: true },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateValidity: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Company', CompanySchema);