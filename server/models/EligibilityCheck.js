const mongoose = require('mongoose');

const EligibilityCheckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pan: {
    type: String,
    required: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please add a valid PAN number']
  },
  totalMfValue: {
    type: Number,
    required: true
  },
  eligibleAmount: {
    type: Number,
    required: true
  },
  holdings: [{
    fund_name: String,
    category: String,
    current_value: Number,
    units: Number,
    nav: Number
  }],
  checkDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EligibilityCheck', EligibilityCheckSchema);