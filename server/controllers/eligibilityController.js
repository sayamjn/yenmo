const EligibilityCheck = require('../models/EligibilityCheck');

exports.calculateEligibility = async (req, res, next) => {
  try {
    const { pan, holdings, total_value } = req.body;

    if (!pan || !holdings || !total_value) {
      return res.status(400).json({
        success: false,
        message: 'Please provide PAN, holdings, and total value'
      });
    }

    const eligibleAmount = total_value * 0.5;

    const eligibilityCheck = await EligibilityCheck.create({
      user: req.user.id,
      pan,
      totalMfValue: total_value,
      eligibleAmount,
      holdings
    });

    res.status(201).json({
      success: true,
      data: {
        pan,
        totalMfValue: total_value,
        eligibleAmount,
        checkDate: eligibilityCheck.checkDate
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getEligibilityHistory = async (req, res, next) => {
  try {
    const history = await EligibilityCheck.find({ user: req.user.id })
      .sort({ checkDate: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (err) {
    next(err);
  }
};