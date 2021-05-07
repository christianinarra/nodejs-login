const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/list', bookingController.list);
router.post('/store', bookingController.store);
router.post('/search', bookingController.findByName);
router.get('/generate', bookingController.generate);

module.exports = router;