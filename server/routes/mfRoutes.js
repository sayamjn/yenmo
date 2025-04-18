const express = require('express');
const { getMfHoldings } = require('../controllers/mfController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/holdings', protect, getMfHoldings);

module.exports = router;