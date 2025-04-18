const express = require('express');
const { 
  calculateEligibility,
  getEligibilityHistory
} = require('../controllers/eligibilityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/calculate', protect, calculateEligibility);
router.get('/history', protect, getEligibilityHistory);

module.exports = router;