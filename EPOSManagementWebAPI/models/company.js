const { plugin } = require('mongoose');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
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

CompanySchema.plugin(findOrCreate);
module.exports = mongoose.model('Company', CompanySchema);